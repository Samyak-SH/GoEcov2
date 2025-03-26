require("dotenv").config({ path: './.env' });

const {calDistance} = require("./googleFucntions");

const express = require("express");
const PORT = process.env.PORT;

const app = express();

app.get("/test", (req,res)=>{res.status(200).send("Server running")});
app.get("/distance", calDistance);

app.listen(PORT, ()=>{
    console.log(`server started on http://localhost:${PORT}\ntest on http://localhost:${PORT}/test`);
})
