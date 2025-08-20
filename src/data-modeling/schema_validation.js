[cite_start]// This script finds existing documents that do not conform to a JSON Schema. [cite: 522]

async function findInvalidDocuments() {
    [cite_start]// Define the JSON Schema for validation [cite: 524]
    const schema = {
      bsonType: "object",
      required: ["name", "address"],
      properties: {
        name: {
          bsonType: "string",
          description: "Must be a string"
        },
        address: {
          bsonType: "object",
          required: ["city", "zipcode"],
          properties: {
            city: {
              bsonType: "string"
            },
            zipcode: {
              bsonType: "string"
            }
          }
        }
      }
    };

    [cite_start]// Use $jsonSchema with $nor to find invalid documents [cite: 543]
    const invalidDocs = await collection.find({
      $nor: [{ $jsonSchema: schema }]
    }).toArray();
    
    [cite_start]console.log("Documents that do not conform to the schema:", invalidDocs); [cite: 546]
}