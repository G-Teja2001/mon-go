import express from "express"
import { MongoClient } from "mongodb";

const app = express();
const port = 3000;


const url = 'mongodb://localhost:27017'; // MongoDB connection URL
const dbName = 'Bookstore'; // Name of your MongoDB database


app.use(async(req,res,next)=>{
    try{

        // connect to Monog DB
        const client = new MongoClient(url)
        
        await client.connect();

       console.log('connected to MongoDB');
       
       // select the data base

       const db = client.db(dbName)

        // add mongo db connection to the request object 
        req.db = db;

        next(); // call the next middle ware 

    }catch(err){
        console.error("Error connecting to MongoDB",err);
        res.status(500).json({err:"Internal server Error"})
    }
})

app.get("/books",async(req,res)=>{
   
    try{
    
        const db = req.db;
        // example Query documents from a collection 

        const collection = db.collection('books');
        const documents = await collection.find({}).toArray();
        res.json(documents);
    } catch(err){
        console.error("error in qurying the data ",err);
        res.status(500).json({err:"Internal sever error "})

    }

})


app.listen(port,(req,res)=>{
    console.log(`The port is runnning on ${port}`)
})