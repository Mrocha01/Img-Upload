const express = require('express');
const main = require('./db/conn');
const app = express();

require("dotenv").config();

// DB Connection
const conn = require("./db/conn");

conn();

const port = process.env.PORT || 3000;

const picturesRouter = require("./routes/picture");

app.use("/pictures", picturesRouter);     

app.listen(port, () => {
    console.log(`O servidor está rodando na porta ${port}`);
});