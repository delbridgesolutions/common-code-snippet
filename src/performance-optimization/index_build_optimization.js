// Function to get cardinality of a field
async function getCardinality (databaseName, collectionName, indexKey) {
    const database = client.db(databaseName);
    const collection = database.collection(collectionName);
    const field = Object.keys(indexKey)[0];
    const cardinality = await collection.distinct(field).then(values => values.length);
    return cardinality;
  }
  
  // Function to generate index creation commands
  async function generateIndexCommands (collectionName, indexInfo) {
    indexInfo.sort((a, b) => b.cardinality - a.cardinality);
    const commands = indexInfo.map(index => {
      return `db.${collectionName}.createIndex(${JSON.stringify(index.key)}, { name: "${index.name}" })`;
    });
    return commands;
  }
  
  // Main function to orchestrate the process
  async function main() {
    try {
      await client.connect();
      console.log("Connected to MongoDB");
      const databaseName = "yourDatabase";
      const collectionName = "yourCollection";
      const recommendedIndexes = [
        { key: { email: 1 }, name: "email_1" },
        { key: { department: 1 }, name: "department_1" },
        { key: { userId: 1, email: 1 }, name: "userId_1_email_1" }
      ];
  
      const indexInfoWithCardinality = [];
      for (const index of recommendedIndexes) {
        const cardinality = await getCardinality(databaseName, collectionName, index.key);
        indexInfoWithCardinality.push({
          key: index.key,
          name: index.name,
          cardinality: cardinality
        });
      }
  
      const commands = await generateIndexCommands(collectionName, indexInfoWithCardinality);
      console.log("\nGenerated Index Commands:");
      commands.forEach(cmd => console.log(cmd));
  
    } finally {
      await client.close();
      console.log("\nConnection closed");
    }
  }
  
  main().catch(console.error);