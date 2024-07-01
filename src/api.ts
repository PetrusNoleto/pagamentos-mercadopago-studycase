import express from 'express';
import cors from 'cors'
import bodyParser from "body-parser";
import {routePayments} from "./routes/payments/payments";


const paymentsApi = express()

paymentsApi.use(bodyParser.json())
paymentsApi.use(cors())
paymentsApi.use(routePayments)

paymentsApi.listen(4700,()=>{
    console.log("api de pagamentos iniciada!")
})



