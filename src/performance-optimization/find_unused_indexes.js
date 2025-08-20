db.getSiblingDB("admin");
var dbInfos = db.adminCommand({listDatabases: 1, nameOnly: true});
dbNames = [];
for (var d = 0; d < dbInfos.databases.length; d++) {
    var dbName = dbInfos.databases[d];
    if (dbName.name == "local" || dbName.name == "config" || dbName.name == "admin") {
        continue;
    }
    dbNames.push(dbName.name);
}

var indexesInfo = [];
var indexesInfoNoUse = [];

for (var d = 0; d < dbNames.length; d++) {
    var collectionNames = [];
    db.getSiblingDB(dbNames[d]).getCollectionInfos({ type: "collection" }).forEach(info => {
        collectionNames.push(info.name);
    });
    for (var c = 0; c < collectionNames.length; c++) {
        if (collectionNames[c].startsWith('system.')) {
            continue;
        }
        var idx = db.getSiblingDB(dbNames[d]).getCollection(collectionNames[c]).aggregate([
            { $indexStats: {} },
            { $project: { indexName: '$name', indexKeys: '$spec.key', indexUsage: '$accesses.ops' } }
        ]).toArray().map(m => (
            {'Namespace': dbNames[d] + '.' + collectionNames[c], 'IndexName': m.indexName, 'Usage': m.indexUsage}
        ));
        for (i = 0; i < idx.length; i++) {
            if (idx[i].Usage > 0) {
                indexesInfo.push(idx[i]);
            } else {
                indexesInfoNoUse.push(idx[i]);
            }
        }
    }
}

print("\nIndexes with no usage");
console.log(indexesInfoNoUse);