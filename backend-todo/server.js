const express = require('express');
const cors = require('cors');
const dotenv  = require('dotenv');
const connectDB = require('./connection');
const todoRouter = require('./routes/todoRouter');

dotenv.config();

const app = express();

app.use(cors());

app.use(express.json());

app.use('/todos', todoRouter);

app.get('/', (req, res)=>{
    res.status(200).json({message: "Server is up and running"});
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, ()=>{
    connectDB();
    console.log(`Server is running on port ${PORT}`);
});

