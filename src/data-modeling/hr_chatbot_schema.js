// User Collection (Embedding and Reference)
// This model embeds skills and projects for fast reads, while using references for complex relationships.
const userSchema = {
    "_id": "ObjectId('655a6d5774a810168b941570')",
    "first_name": "Jane",
    "last_name": "Doe",
    "email": "jane.doe@example.com",
    "company_id": "ObjectId('655a6d5774a810168b941571')",
    [cite_start]"skills": [ // Embedded sub-documents for fast reads [cite: 290]
      {
        "skill_id": "ObjectId('655a6d5774a810168b941572')",
        "proficiency": 5,
        "certificates": ["MongoDB Certified Developer"]
      }
    ],
    [cite_start]"projects": [ // Reference to a different collection [cite: 293]
      {
        "project_id": "ObjectId('655a6d5774a810168b941573')",
        "role": "Team Lead"
      }
    ]
  };
  
  // Message Collection (Time Series)
  [cite_start]// Designed for high-frequency writes and efficient storage of chat history. [cite: 296]
  const messageSchema = {
    "from": "ObjectId('655a6d5774a810168b941570')",
    "to": "ObjectId('655a6d5774a810168b941574')",
    "content": "What are the requirements for a senior data scientist role?",
    "timestamp": ISODate("2025-08-19T10:00:00.000Z")
  };
  
  [cite_start]// Query Example 1: Find users by a specific skill. [cite: 336, 338]
  [cite_start]// This query is fast because the skill information is embedded. [cite: 339]
  const query1 = db.users.find({
    "skills.skill_id": "ObjectId('655a6d5774a810168b941572')"
  });
  
  [cite_start]// Query Example 2: Find all users in a project. [cite: 341, 343]
  [cite_start]// The index on 'projects.project_id' allows for efficient lookup. [cite: 344]
  const query2 = db.users.find({
    "projects.project_id": "ObjectId('655a6d5774a810168b941573')"
  });
  
  [cite_start]// Query Example 3: Get chat messages within a time range. [cite: 346, 347, 348, 349, 351]
  [cite_start]// Time-series collections are optimized for these types of queries. [cite: 352]
  const query3 = db.messages.find({
    "timestamp": {
      "$gte": ISODate("2025-08-19T09:00:00.000Z"),
      "$lt": ISODate("2025-08-19T10:00:00.000Z")
    }
  });