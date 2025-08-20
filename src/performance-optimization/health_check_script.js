// This script automates the collection of detailed statistics for databases and collections.

var collections = db.getCollectionNames();
var totalDataSize = 0;
var totalStorageSize = 0;
var totalIndexSize = 0;
var totalDocumentCount = 0;

collections.forEach(function(collectionName) {
    var stats = db.getCollection(collectionName).stats();
    totalDataSize += stats.size;
    totalStorageSize += stats.storageSize;
    totalIndexSize += stats.totalIndexSize;
    totalDocumentCount += stats.count;
    
    print("Collection: " + collectionName +
          ", Storage: " + (stats.storageSize / (1024 * 1024)).toFixed(2) + " MB" +
          ", Index: " + (stats.totalIndexSize / (1024 * 1024)).toFixed(2) + " MB");
});

print("---");
print("Overall Database Statistics:");
print("Total Documents: " + totalDocumentCount);
print("Total Data Size: " + (totalDataSize / (1024 * 1024)).toFixed(2) + " MB");
print("Total Storage Size: " + (totalStorageSize / (1024 * 1024)).toFixed(2) + " MB");
print("Total Index Size: " + (totalIndexSize / (1024 * 1024)).toFixed(2) + " MB");
print("Average Document Size: " + (totalDataSize / totalDocumentCount).toFixed(2) + " bytes");