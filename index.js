const db = require('mongodb');
const MongoClient = require('mongodb').MongoClient;


//Database URL
const url = `mongodb://localhost:27017/${dbN}`;

//Database Name 
dbN = "content"

//Collection Name
let cName = "contentplayers";


//Object being inserted
let obj = { name: "Broken-Arrow", ver: "x.xx", updated: "10.11.19", }



//Create a Collection
async function createCollection(cName, dbN) {
    await MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        let dbo = db.db(dbN)
        dbo.createCollection(cName, function(err, res) {
            if (err) throw err;
            console.log(`New Collection Created: ${cName}`);
            db.close()
        })

    });
}

//Database Object

async function dataObject(cName, dbN, obj) {
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;

        //dbN references the Database being used
        let dbo = db.db(dbN);
        let myobj = obj; // ref not needed, obj is already referenced.

        //cName specifies the collection
        //obj specifies the object being inserted - referenced as a 'document'
        //
        dbo.collection(cName).insertOne(obj, function(err, res) {
            if (err) throw err;
            console.log("1 document inserted");
            db.close();
        });
    });
}