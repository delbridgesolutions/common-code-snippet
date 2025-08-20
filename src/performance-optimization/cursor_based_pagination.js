// 1. Using _id or ordered fields
// This is the simplest and most efficient method.

// First query (get the first page)
const query1 = db.posts.find({}).sort({ _id: 1 }).limit(10);

// Subsequent queries (get the next page)
// `lastId` is the _id of the last document from the previous query
const query2 = db.posts.find({ _id: { $gt: lastId } }).sort({ _id: 1 }).limit(10);

// 2. For complex sorting scenarios
// This method handles sorting by multiple fields.

// First query (get the first page)
const query3 = db.leaderboard.find({}).sort({ score: -1, _id: 1 }).limit(10);

// Subsequent queries (get the next page)
// `lastScore` and `lastId` are from the last document of the previous query
const query4 = db.leaderboard.find({
  $or: [
    { score: { $lt: lastScore } },
    { score: lastScore, _id: { $gt: lastId } }
  ]
}).sort({ score: -1, _id: 1 }).limit(10);