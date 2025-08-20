[cite_start]// This script automates the collection of detailed statistics for databases and collections. [cite: 565]

[cite_start]var collections = db.getCollectionNames(); [cite: 576]
[cite_start]var totalDataSize = 0; [cite: 577]
[cite_start]var totalStorageSize = 0; [cite: 578]
[cite_start]var totalIndexSize = 0; [cite: 579]
[cite_start]var totalDocumentCount = 0; [cite: 580]

collections.forEach(function(collectionName) {
    [cite_start]var stats = db.getCollection(collectionName).stats(); [cite: 582]
    [cite_start]totalDataSize += stats.size; [cite: 583]
    [cite_start]totalStorageSize += stats.storageSize; [cite: 585]
    [cite_start]totalIndexSize += stats.totalIndexSize; [cite: 585]
    [cite_start]totalDocumentCount += stats.count; [cite: 586]
    
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