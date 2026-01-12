import express from "express";

const app = express();

app.get("/", (req, res) => {
    res.send("Hallo Word!");
});

app.listen(5000, ()=>{
    console.log("server is running on 5000");
});