import {Router,Request,Response} from 'express';
import {mercadoPagoPayment, mercadoPagoPaymentPayer} from "../../types/requestPayments";
import {MercadoPagoPayment} from "../../controllers/paymentsController";
export  const routePayments = Router();

const paymentDefault = new MercadoPagoPayment({
        defaultPaymentId:"",
        defaultPaymentDescription:"",
        defaultPaymentValue:0,
        defaultPaymentAccessToken:"",
        defaultPaymentInstallments:0,
        defaultPaymentMethodId:"",
        defaultPaymentToken:"",
        defaultPaymentIssuerId:"",
        defaultPaymentPayer:{
        defaultPayerEmail:"",
            defaultPayerIdentification:{
            defaultPayerIdentificationType:"",
                defaultPayerIdentificationNumber:""
        }
    }
})


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
                    returnData = {code:201,message:"pagamento pix criado com sucesso",payment:JSON.parse(paymentPix)};
                }catch(error){
                    returnData = {code:400,message:"não foi possivel criar seu pagamento",payment:null};
                }
            break;
            case "visa":
            case "master":
                try {
                    const paymentCC = await payment.creditCard()
                    returnData = {code:201,message:"pagamento com cartão de credito criado com sucesso",payment:JSON.parse(paymentCC)};
                }catch(error){
                    returnData = {code:400,message:"não foi possivel criar seu pagamento",payment:null};
                }
            break;
        }
        res.status(Number(returnData?.code)).json(returnData);
        
    }else{
        res.status(404).json("dados da requisição iconrretas");
    }
});

routePayments.post('/payment/check/status/',async (req:Request,res:Response)=>{
    const {requestPaymentId,requestPaymentAccessToken} = req.body;
    if(requestPaymentId && requestPaymentAccessToken){
        try {
            const getPaymentStatus = await paymentDefault.status(requestPaymentId,requestPaymentAccessToken);
            res.status(200).json({code:200,message:"pagamento checado com sucesso",payment:JSON.parse(getPaymentStatus)});
        }catch (error){
            res.status(404).json({code:404,message:"não foi possivel checar seu pagamento",payment:null});
        }
    }else{
        res.status(403).json({code:403,message:"dados da requisição iconrretas",payment:null})
    }
});
routePayments.post('/payment/cancel/',async (req:Request,res:Response)=>{
    const {requestPaymentId,requestPaymentAccessToken} = req.body;
    if(requestPaymentId && requestPaymentAccessToken){
        try {
            const getPaymentStatus = await paymentDefault.cancel(requestPaymentId,requestPaymentAccessToken);
             res.status(200).json({code:200,message:"pagamento cancelado com sucesso",payment:JSON.parse(getPaymentStatus)});
        }catch (error){
             res.status(404).json({code:404,message:"não foi possivel cancelar seu pagamento",payment:null});
        }
    }else{
        res.status(403).json({code:403,message:"dados da requisição iconrretas",payment:null})
    }
});
routePayments.post('/payment/refund/',async (req:Request,res:Response)=>{
    const {requestPaymentId,requestPaymentAccessToken,requestPaymentValue} = req.body;
    if(requestPaymentId && requestPaymentAccessToken && requestPaymentValue){
        try {
            const paymentRefund = await paymentDefault.refund(requestPaymentId,requestPaymentAccessToken,Number(requestPaymentValue));
             res.status(200).json({code:200,message:"pagamento reembolsado com sucesso!",payment:paymentRefund});
        }catch (error){
             res.status(404).json({code:404,message:"não foi possivel reembolsar seu pagamento",payment:null});
        }
    }else{
        res.status(404).json({code:403,message:"dados da requisição iconrretas",payment:null})
    }
});