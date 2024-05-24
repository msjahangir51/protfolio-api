const mongoose = require("mongoose");
const { DB_URL } = require("../secret");


const dbConnection =  async ()=>{
    try{
        await mongoose.connect(DB_URL);
        console.log("db is connected");
    }catch(err){
        console.log(err.message)
    }
}


module.exports = {dbConnection}