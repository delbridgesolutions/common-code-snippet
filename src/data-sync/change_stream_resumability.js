// A simple example of resuming a change stream after a specific event.
const collection = db.collection('inventory');
const changeStream = collection.watch();
let newChangeStream;

// Listen for the first change event to get a resume token
changeStream.once('change', next => {
  const resumeToken = changeStream.resumeToken;
  // Close the current stream (simulating a disconnection)
  changeStream.close();

  // Reopen a new change stream, using the resumeAfter option
  newChangeStream = collection.watch([], { resumeAfter: resumeToken });
  // Now, the new stream will process all subsequent changes
  newChangeStream.on('change', next => {
    processChange(next);
  });
});