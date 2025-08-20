// User Collection (Embedding and Reference)
// This model embeds skills and projects for fast reads, while using references for complex relationships.
const userSchema = {
    "_id": "ObjectId('655a6d5774a810168b941570')",
    "first_name": "Jane",
    "last_name": "Doe",
    "email": "jane.doe@example.com",
    "company_id": "ObjectId('655a6d5774a810168b941571')",
    "skills": [
      {
        "skill_id": "ObjectId('655a6d5774a810168b941572')",
        "proficiency": 5,
        "certificates": ["MongoDB Certified Developer"]
      }
    ],
    "projects": [
      {
        "project_id": "ObjectId('655a6d5774a810168b941573')",
        "role": "Team Lead"
      }
    ]
  };
  
  // Message Collection (Time Series)
  // Designed for high-frequency writes and efficient storage of chat history.
  const messageSchema = {
    "from": "ObjectId('655a6d5774a810168b941570')",
    "to": "ObjectId('655a6d5774a810168b941574')",
    "content": "What are the requirements for a senior data scientist role?",
    "timestamp": ISODate("2025-08-19T10:00:00.000Z")
  };
  
  // Query Example 1: Find users by a specific skill.
  const query1 = db.users.find({
    "skills.skill_id": "ObjectId('655a6d5774a810168b941572')"
  });
  
  // Query Example 2: Find all users in a project.
  const query2 = db.users.find({
    "projects.project_id": "ObjectId('655a6d5774a810168b941573')"
  });
  
  // Query Example 3: Get chat messages within a time range.
  const query3 = db.messages.find({
    "timestamp": {
      "$gte": ISODate("2025-08-19T09:00:00.000Z"),
      "$lt": ISODate("2025-08-19T10:00:00.000Z")
    }
  });