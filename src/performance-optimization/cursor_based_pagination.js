[cite_start]// 1. Using _id or ordered fields [cite: 254]
[cite_start]// This is the simplest and most efficient method. [cite: 255]

[cite_start]// First query (get the first page) [cite: 256]
[cite_start]const query1 = db.posts.find({}).sort({ _id: 1 }).limit(10); [cite: 257]

[cite_start]// Subsequent queries (get the next page) [cite: 258]
[cite_start]// `lastId` is the _id of the last document from the previous query [cite: 259]
[cite_start]const query2 = db.posts.find({ _id: { $gt: lastId } }).sort({ _id: 1 }).limit(10); [cite: 259]

[cite_start]// 2. For complex sorting scenarios [cite: 260]
[cite_start]// This method handles sorting by multiple fields. [cite: 261]

[cite_start]// First query (get the first page) [cite: 262]
[cite_start]const query3 = db.leaderboard.find({}).sort({ score: -1, _id: 1 }).limit(10); [cite: 263]

[cite_start]// Subsequent queries (get the next page) [cite: 264]
[cite_start]// `lastScore` and `lastId` are from the last document of the previous query [cite: 265]
const query4 = db.leaderboard.find({
  $or: [
    [cite_start]{ score: { $lt: lastScore } }, [cite: 267]
    [cite_start]{ score: lastScore, _id: { $gt: lastId } } [cite: 268]
  ]
[cite_start]}).sort({ score: -1, _id: 1 }).limit(10); [cite: 269]