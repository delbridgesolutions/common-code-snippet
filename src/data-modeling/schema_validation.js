// This script finds existing documents that do not conform to a JSON Schema.

async function findInvalidDocuments() {
    // Define the JSON Schema for validation
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

    // Use $jsonSchema with $nor to find invalid documents
    const invalidDocs = await collection.find({
      $nor: [{ $jsonSchema: schema }]
    }).toArray();
    
    console.log("Documents that do not conform to the schema:", invalidDocs);
}