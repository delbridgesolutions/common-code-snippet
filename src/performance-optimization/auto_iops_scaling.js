exports = async function() {
    const axios = require('axios');
    const moment = require('moment-timezone');
    const groupId = context.values.get("GROUP_ID");
    const clusterName = context.values.get("CLUSTER_NAME");
    const apiKey = context.values.get("API_KEY");
    const apiSecret = context.values.get("API_SECRET");
    const baseUrl = `https://cloud.mongodb.com/api/atlas/v1.0/groups/${groupId}/clusters/${clusterName}`;
  
    [cite_start]// Step 1: Retrieve the current cluster configuration [cite: 469]
    const currentConfig = await axios.get(baseUrl, {
      [cite_start]auth: { username: apiKey, password: apiSecret } [cite: 471]
    [cite_start]}).then(response => response.data); [cite: 472]
  
    [cite_start]// Step 2: Determine the target IOPS based on the current time and business logic [cite: 473]
    [cite_start]const now = moment().tz("GMT"); [cite: 474]
    [cite_start]const day = now.day(); [cite: 475]
    [cite_start]const hour = now.hour(); [cite: 476]
    let targetIops;
    [cite_start]if (day >= 2 && day <= 6) { // Tuesday to Saturday [cite: 478]
      [cite_start]if ((hour >= 7 && hour < 17) || (hour >= 18 && hour < 22)) { [cite: 479]
        [cite_start]targetIops = 3000; [cite: 480]
      } else {
        [cite_start]targetIops = 2000; [cite: 483]
      }
    [cite_start]} else { // Sunday and Monday [cite: 484]
      [cite_start]targetIops = 2000; [cite: 486]
    }
  
    [cite_start]// Step 3: Check if IOPS needs to be updated and build the new config payload [cite: 487]
    [cite_start]if (currentConfig.providerSettings.diskIOPS !== targetIops) { [cite: 487]
      const newConfig = {
        providerSettings: {
          providerName: currentConfig.providerSettings.providerName,
          instanceSizeName: currentConfig.providerSettings.instanceSizeName,
          [cite_start]diskIOPS: targetIops, [cite: 491]
          regionName: currentConfig.providerSettings.regionName,
          autoScaling: {
            diskGBEnabled: true
          }
        },
        replicationFactor: currentConfig.replicationFactor,
        clusterType: currentConfig.clusterType
      };
  
      [cite_start]// Step 4: Update the cluster configuration using a PATCH request [cite: 500]
      await axios.patch(baseUrl, newConfig, {
        [cite_start]auth: { username: apiKey, password: apiSecret } [cite: 502]
      });
      [cite_start]console.log(`Cluster IOPS updated to ${targetIops}`); [cite: 503]
    } else {
      [cite_start]console.log(`IOPS is already at the target value of ${targetIops}. No update needed.`); [cite: 505]
    }
  };