import express from 'express';
import cors from 'cors';
import bodyParser from "body-parser";
import {routePayments} from "./routes/payments/payments";
import * as dotenv from "dotenv";
dotenv.config();


const apiPort = process.env.API_PORT;
const paymentsApi = express();

paymentsApi.use(bodyParser.json());
paymentsApi.use(cors());
paymentsApi.use(routePayments);

if(apiPort !== undefined && apiPort !== null && apiPort !== ""){
    paymentsApi.listen(apiPort,()=>{
        console.log("api de pagamentos iniciada!");
    });
}else{
    console.log("variavel de ambiente API_PORT não declarada");
}




