import {Router,Request,Response} from 'express';
import {mercadoPagoPayment, mercadoPagoPaymentItem, mercadoPagoPaymentPayer} from "../../types/requestPayments";

export  const routePayments = Router();

routePayments.post("/payment/create/",(req:Request,res:Response)=>{
    let returnData = undefined;
    const {requestPaymentData,requestPayerData,requestPaymentProducts} = req.body;
    if(requestPaymentData && requestPayerData && requestPaymentProducts){
        const paymentData = requestPaymentData as mercadoPagoPayment;
        const payerData = requestPayerData as mercadoPagoPaymentPayer;
        const paymentItems =requestPaymentProducts as mercadoPagoPaymentItem[];
        switch (paymentData.paymentMethodId){
            case "pix":
                returnData = {code:203,message:"metodo de pagmento pix",payment:{}};
            break;
            case "visa":
            case "master":
                returnData = {code:203,message:"metodo de pagamento cartão de credito",payment:{}};
            break;
        }
        return res.json(returnData);
        
    }else{
        return res.status(404).json("dados da requisição iconrretas");
    }
});



