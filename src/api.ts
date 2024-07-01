import express from 'express';
import cors from 'cors'
import bodyParser from "body-parser";
import {paymentRoutes} from "./routes/importRoutes";

const paymentsApi = express()

paymentsApi.use(bodyParser.json())
paymentsApi.use(cors())
paymentsApi.use(paymentRoutes)
paymentsApi.listen(4700,()=>{
    console.log("api de pagamentos iniciada!")
})



