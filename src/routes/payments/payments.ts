import {Router,Request,Response} from 'express';
import {mercadoPagoPayment, mercadoPagoPaymentPayer} from "../../types/requestPayments";
import {MercadoPagoPayment} from "../../controllers/paymentsController";
export  const routePayments = Router();

routePayments.post("/payment/create/",async (req:Request,res:Response)=>{
    let returnData = undefined;
    const {requestPaymentData,requestPayerData} = req.body;
    if(requestPaymentData && requestPayerData){
        const paymentData = requestPaymentData as mercadoPagoPayment;
        const payerData = requestPayerData as mercadoPagoPaymentPayer;
        const payment = new MercadoPagoPayment(
            {
                defaultPaymentId:paymentData.paymentId,
                defaultPaymentDescription:paymentData.paymentDescription,
                defaultPaymentValue:paymentData.paymentValue,
                defaultPaymentAccessToken:paymentData.paymentAccessToken,
                defaultPaymentInstallments:paymentData.paymentInstallments,
                defaultPaymentMethodId:paymentData.paymentMethodId,
                defaultPaymentToken:paymentData.paymentToken,
                defaultPaymentIssuerId:paymentData.paymentIssuerId,
                defaultPaymentPayer:{
                    defaultPayerEmail:payerData.paymentPayerEmail,
                    defaultPayerIdentification:{
                        defaultPayerIdentificationType:payerData.paymentPayerIdentificationType,
                        defaultPayerIdentificationNumber:payerData.paymentPayerIdentificationNumber
                    }
                }
            }
        )
        switch (paymentData.paymentMethodId){
            case "pix":
                try {
                    const paymentPix = await payment.pix()
                    returnData = {code:203,message:"pagamento pix criado com sucesso",payment:JSON.parse(paymentPix)};
                }catch(error){
                    returnData = {code:400,message:"não foi possivel criar seu pagamento",payment:null};
                }
            break;
            case "visa":
            case "master":
                try {
                    const paymentCC = await payment.creditCard()
                    returnData = {code:203,message:"pagamento com cartão de credito criado com sucesso",payment:JSON.parse(paymentCC)};
                }catch(error){
                    returnData = {code:400,message:"não foi possivel criar seu pagamento",payment:null};
                }
            break;
        }
        return res.json(returnData);
        
    }else{
        return res.status(404).json("dados da requisição iconrretas");
    }
});



