const mongoose = require('mongoose');
require("dotenv").config();

mongoose.set("strictQuery", true);

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.z6xtaxk.mongodb.net/?retryWrites=true&w=majority&appName=AtlasApp`;

async function main() {
    try {
        await mongoose.connect(uri);

            console.log("Connected to MongoDB server");
            
    } catch (error) {
        console.log(`Erro: ${error}`);
    };
};

module.exports = main;