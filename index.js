const db = require('mongodb');
const MongoClient = require('mongodb').MongoClient;

// MONGOD DATABASE API
// For additional information regarding this assembly visit:
// https://www.w3schools.com/nodejs/nodejs_mongodb.asp

// CURRENT METHODS INCLUDE
// CREATE | UPDATE | DELETE | QUERY

//Database Name 
dbN = "content"

//Collection Name
let cName = "contentplayers";

//Database URL
const url = `mongodb://localhost:27017/${dbN}`;

//short url
const short = `mongodb://localhost:27017/`;


//Object being inserted
let objs = { name: "Broken-Arrow", ver: "x.xx", updated: "10.11.19", }

//Query Object
let search = { name: "Broken-Arrow" }

//Query Object for Updating Collection
let newVal = {}



//Creating Collections
async function createCollection(cName, dbN) {
    await MongoClient.connect(short, function(err, db) {
        if (err) throw err;
        let dbo = db.db(dbN)
        dbo.createCollection(cName, function(err, res) {
            if (err) throw err;
            console.log(`stats: 
            ${cName}
            ${dbN}
            ${short}
            ${dbo}`)
            console.log(`New Collection Created: ${cName}`);
            db.close()
        })

    });
}

//Database Object insertion
async function dataObject(cName, dbN, objs) {

    console.log('HERE')
    await MongoClient.connect(short, function(err, db) {
        if (err) throw err;
        //dbN references the Database being used
        let dbo = db.db(dbN);
        let myobj = objs; // ref not needed, obj is already referenced.

        //cName specifies the collection
        //obj specifies the object being inserted - referenced as a 'document'
        //
        dbo.collection(`${cName}`).insertOne(objs, function(err, res) {
            if (err) err;
            console.log("1 document inserted");
            console.log(res);
            db.close();
        });
    });
}

//Database Object Update
async function dataObjectUpdate(cName, dbN, objs, search, newVal) {
    await MongoClient.connect(short, function(err, db) {
        if (err) throw err;
        var dbo = db.db(dbN);

        // myquery is the existing collection being updated
        var myquery = search;

        //Example call below - new values for the myquery object
        //var newvalues = { $set: {name: "Mickey", address: "Canyon 123" } };

        //Note: only updates the first item matching the query, if multiple items match use: updateMany()
        var newvalues = newVal;
        dbo.collection("customers").updateOne(myquery, newvalues, function(err, res) {
            if (err) throw err;
            console.log("1 document updated");
            db.close();
        });
    });
}

//Database Object Deletion [FOR Objects within Collections]

async function dataDelete(cName, dbN, objs) {
    await MongoClient.connect(short, function(err, db) {
        if (err) throw err
        var dbo = db.db(dbN);
        var myquery = objs;
        dbo.collection(`${cName}`).deleteOne(myquery, function(err, obj) {
            if (err) throw err;
            console.log("1 document deleted");
            console.log(obj)
            db.close();
        })
    })
}

//Database Collection Deletion [For Collections & objects within]

async function collectionDelete(cName, dbN) {
    await MongoClient.connect(short, function(err, db) {
        if (err) throw err;
        var dbo = db.db(dbN);
        dbo.collection(`${cName}`).drop(function(err, delOK) {
            if (err) throw err;
            if (delOK) console.log("Collection deleted");
            db.close();
        });
    })
}


//Database Queries
async function queries(cName, dbN, search) {
    await MongoClient.connect(short, function(err, db) {
        if (err) throw err;
        var dbo = db.db(dbN);
        dbo.collection(`${cName}`).find(search).toArray(function(err, result) {
            if (err) throw err;
            console.log(result);
            db.close();
        });
    });
}



// TESTED WORKING COMMANDS FOR DATABASE STRUCTURE

//createCollection(cName, dbN)

//dataObject(cName, dbN, objs)

//queries(cName, dbN, search);

//Deletes Objects within collections
//dataDelete(cName, dbN, objs)

collectionDelete(cName, dbN)