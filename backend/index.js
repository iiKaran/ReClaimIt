const express = require('express');
const entryRoutes = require("./routes/entryRoutes");
const otherRoutes = require("./routes/OtherRoutes");
const app = express(); 
const cors = require("cors");
const dbConnect = require("./config/database")
require("dotenv").config(); 

app.use(cors({
    origin:"http://localhost:3000", 
   }))
   app.use(express.json()); 
dbConnect();

app.use("/routes",entryRoutes); 
app.use("/routes",otherRoutes); 
app.listen(4000,()=>{
    console.log("Server started succesfully"); 
})