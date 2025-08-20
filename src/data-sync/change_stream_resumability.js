[cite_start]// A simple example of resuming a change stream after a specific event. [cite: 162]
[cite_start]const collection = db.collection('inventory'); [cite: 164]
[cite_start]const changeStream = collection.watch(); [cite: 166]
[cite_start]let newChangeStream; [cite: 167]

[cite_start]// Listen for the first change event to get a resume token [cite: 168]
changeStream.once('change', next => {
  [cite_start]const resumeToken = changeStream.resumeToken; [cite: 169, 170]
  [cite_start]// Close the current stream (simulating a disconnection) [cite: 171]
  [cite_start]changeStream.close(); [cite: 171]

  [cite_start]// Reopen a new change stream, using the resumeAfter option [cite: 172]
  [cite_start]newChangeStream = collection.watch([], { resumeAfter: resumeToken }); [cite: 174]
  [cite_start]// Now, the new stream will process all subsequent changes [cite: 175]
  newChangeStream.on('change', next => {
    [cite_start]processChange(next); [cite: 177]
  });
});