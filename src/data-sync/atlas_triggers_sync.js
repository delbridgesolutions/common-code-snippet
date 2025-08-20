exports = async function(changeEvent) {
    // A Database Trigger will always call a function with a changeEvent.
    // Documentation on ChangeEvents: https://docs.mongodb.com/manual/reference/change-events/
    const docId = changeEvent.documentKey._id;
    const serviceName = "mongodb-atlas";
    const database = "other_db";
    const collection = context.services.get(serviceName).db(database).collection(changeEvent.ns.coll);
  
    try {
      // If this is a "delete" event, delete the document in the other collection
      if (changeEvent.operationType === "delete") {
        await collection.deleteOne({"_id": docId});
      }
      // If this is an "insert" event, insert the document into the other collection
      else if (changeEvent.operationType === "insert") {
        await collection.insertOne(changeEvent.fullDocument);
      }
      // If this is an "update" or "replace" event, then replace the document
      else if (changeEvent.operationType === "update" || changeEvent.operationType === "replace") {
        await collection.replaceOne({"_id": docId}, changeEvent.fullDocument);
      }
    } catch(err) {
      console.log("error performing mongodb write: ", err.message);
    }
  };