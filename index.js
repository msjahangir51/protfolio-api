const { app } = require("./app");
const { dbConnection } = require("./config/db");
const { PORT } = require("./secret");

app.listen(PORT,()=>{
    console.log("server is running at http://localhost:"+PORT);
    dbConnection()
})