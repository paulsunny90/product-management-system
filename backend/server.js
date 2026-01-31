const express = require('express');
require('dotenv').config();
 const {connectDB}=require("./Config/db")



const app = express()
const PORT = process.env.PORT||5000

connectDB()
.then(() => {
app.listen(PORT,()=>{
 console.log(`Server running on http://localhost:${PORT}`)
})
}).catch((err) => {
      console.log("Server NOT started due to DB error");
    
});



