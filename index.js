import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
    
import Connection from './database/db.js';
import router from './routes/route.js';
dotenv.config();

const app=express();

app.use(cors());
app.use(bodyParser.json({extended: true}));
app.use(bodyParser.urlencoded({extended: true}));
app.use('/',router);


app.listen(process.env.PORT || 8000,()=> console.log(`Server is running successfully on PORT ${process.env.PORT}`));

Connection();