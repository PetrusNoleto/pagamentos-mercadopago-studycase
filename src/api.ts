import https from "https"
import fs from "fs"
import express from 'express';
import cors from 'cors';
import bodyParser from "body-parser";
import {routePayments} from "./routes/payments/payments";
import * as dotenv from "dotenv";
dotenv.config();

const HttpsFiles = {
    key: fs.readFileSync('./https/key.pem'), 
    cert: fs.readFileSync('./https/cert.pem'),
  };
const apiPort = process.env.API_PORT;
const paymentsApi = express();

paymentsApi.use(bodyParser.json());
paymentsApi.use(cors());
paymentsApi.use(routePayments);

if(apiPort !== undefined && apiPort !== null && apiPort !== ""){
    https.createServer(HttpsFiles,paymentsApi).listen(apiPort,()=>{
        console.log("api de pagamentos iniciada!");
    });
}else{
    console.log("variavel de ambiente API_PORT não declarada");
}




