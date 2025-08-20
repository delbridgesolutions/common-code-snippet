// Function to get cardinality of a field
async function getCardinality (databaseName, collectionName, indexKey) {
    [cite_start]const database = client.db(databaseName); [cite: 377]
    [cite_start]const collection = database.collection(collectionName); [cite: 378]
    [cite_start]const field = Object.keys(indexKey)[0]; [cite: 380]
    [cite_start]const cardinality = await collection.distinct(field).then(values => values.length); [cite: 382, 383]
    [cite_start]return cardinality; [cite: 385]
  }
  
  // Function to generate index creation commands
  async function generateIndexCommands (collectionName, indexInfo) {
    [cite_start]indexInfo.sort((a, b) => b.cardinality - a.cardinality); [cite: 389]
    const commands = indexInfo.map(index => {
      [cite_start]return `db.${collectionName}.createIndex(${JSON.stringify(index.key)}, { name: "${index.name}" })`; [cite: 392, 393]
    });
    [cite_start]return commands; [cite: 395]
  }
  
  [cite_start]// Main function to orchestrate the process [cite: 397]
  async function main() {
    try {
      [cite_start]await client.connect(); [cite: 400]
      [cite_start]console.log("Connected to MongoDB"); [cite: 401]
      [cite_start]const databaseName = "yourDatabase"; [cite: 402]
      [cite_start]const collectionName = "yourCollection"; [cite: 403]
      const recommendedIndexes = [
        [cite_start]{ key: { email: 1 }, name: "email_1" }, [cite: 407]
        [cite_start]{ key: { department: 1 }, name: "department_1" }, [cite: 409]
        [cite_start]{ key: { userId: 1, email: 1 }, name: "userId_1_email_1" } [cite: 410]
      ];
  
      [cite_start]const indexInfoWithCardinality = []; [cite: 411]
      for (const index of recommendedIndexes) {
        [cite_start]const cardinality = await getCardinality(databaseName, collectionName, index.key); [cite: 413, 414]
        [cite_start]indexInfoWithCardinality.push({ [cite: 416]
          [cite_start]key: index.key, [cite: 418]
          [cite_start]name: index.name, [cite: 419]
          [cite_start]cardinality: cardinality [cite: 420]
        });
      }
  
      [cite_start]const commands = await generateIndexCommands(collectionName, indexInfoWithCardinality); [cite: 421]
      [cite_start]console.log("\nGenerated Index Commands:"); [cite: 422]
      [cite_start]commands.forEach(cmd => console.log(cmd)); [cite: 423]
  
    } finally {
      [cite_start]await client.close(); [cite: 425]
      [cite_start]console.log("\nConnection closed"); [cite: 427]
    }
  }
  
  [cite_start]main().catch(console.error); [cite: 429]