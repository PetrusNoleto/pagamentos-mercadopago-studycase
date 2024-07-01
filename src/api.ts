import express from 'express';
import cors from 'cors'
import bodyParser from "body-parser";

const paymentsApi = express()

paymentsApi.use(bodyParser.json())
paymentsApi.use(cors())

paymentsApi.listen(4700,()=>{
    console.log("api de pagamentos iniciada!")
})



