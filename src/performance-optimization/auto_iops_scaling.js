exports = async function() {
    const axios = require('axios');
    const moment = require('moment-timezone');
    const groupId = context.values.get("GROUP_ID");
    const clusterName = context.values.get("CLUSTER_NAME");
    const apiKey = context.values.get("API_KEY");
    const apiSecret = context.values.get("API_SECRET");
    const baseUrl = `https://cloud.mongodb.com/api/atlas/v1.0/groups/${groupId}/clusters/${clusterName}`;
  
    // Step 1: Retrieve the current cluster configuration
    const currentConfig = await axios.get(baseUrl, {
      auth: { username: apiKey, password: apiSecret }
    }).then(response => response.data);
  
    // Step 2: Determine the target IOPS based on the current time and business logic
    const now = moment().tz("GMT");
    const day = now.day();
    const hour = now.hour();
    let targetIops;
    if (day >= 2 && day <= 6) { // Tuesday to Saturday
      if ((hour >= 7 && hour < 17) || (hour >= 18 && hour < 22)) {
        targetIops = 3000;
      } else {
        targetIops = 2000;
      }
    } else { // Sunday and Monday
      targetIops = 2000;
    }
  
    // Step 3: Check if IOPS needs to be updated and build the new config payload
    if (currentConfig.providerSettings.diskIOPS !== targetIops) {
      const newConfig = {
        providerSettings: {
          providerName: currentConfig.providerSettings.providerName,
          instanceSizeName: currentConfig.providerSettings.instanceSizeName,
          diskIOPS: targetIops,
          regionName: currentConfig.providerSettings.regionName,
          autoScaling: {
            diskGBEnabled: true
          }
        },
        replicationFactor: currentConfig.replicationFactor,
        clusterType: currentConfig.clusterType
      };
  
      // Step 4: Update the cluster configuration using a PATCH request
      await axios.patch(baseUrl, newConfig, {
        auth: { username: apiKey, password: apiSecret }
      });
      console.log(`Cluster IOPS updated to ${targetIops}`);
    } else {
      console.log(`IOPS is already at the target value of ${targetIops}. No update needed.`);
    }
  };