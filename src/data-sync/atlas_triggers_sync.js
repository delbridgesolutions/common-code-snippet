exports = async function(changeEvent) {
    [cite_start]// A Database Trigger will always call a function with a changeEvent. [cite: 122]
    [cite_start]// Documentation on ChangeEvents: https://docs.mongodb.com/manual/reference/change-events/ [cite: 123]
    [cite_start]const docId = changeEvent.documentKey._id; [cite: 126]
    [cite_start]const serviceName = "mongodb-atlas"; [cite: 128]
    [cite_start]const database = "other_db"; [cite: 129]
    [cite_start]const collection = context.services.get(serviceName).db(database).collection(changeEvent.ns.coll); [cite: 131]
  
    try {
      [cite_start]// If this is a "delete" event, delete the document in the other collection [cite: 133]
      if (changeEvent.operationType === "delete") {
        [cite_start]await collection.deleteOne({"_id": docId}); [cite: 135]
      }
      [cite_start]// If this is an "insert" event, insert the document into the other collection [cite: 136]
      else if (changeEvent.operationType === "insert") {
        [cite_start]await collection.insertOne(changeEvent.fullDocument); [cite: 137]
      }
      [cite_start]// If this is an "update" or "replace" event, then replace the document [cite: 139]
      else if (changeEvent.operationType === "update" || changeEvent.operationType === "replace") {
        [cite_start]await collection.replaceOne({"_id": docId}, changeEvent.fullDocument); [cite: 142]
      }
    } catch(err) {
      [cite_start]console.log("error performing mongodb write: ", err.message); [cite: 144]
    }
  };