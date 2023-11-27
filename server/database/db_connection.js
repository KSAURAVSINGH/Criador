const {MongoClient} = require('mongodb');
const dotenv = require('dotenv')

dotenv.config()

const conn_string = process.env.DB_CONNECT
const client = new MongoClient(conn_string);

async function makeDBConn(){
    
    try{
        await client.connect();
        console.log("Database connected")
    }
    catch(err){
        console.log("Database connection failure: ", err);
    }
}

module.exports = {
    makeDBConn: makeDBConn,
    client: client
}


