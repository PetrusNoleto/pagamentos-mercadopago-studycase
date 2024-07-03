import {Router,Request,Response} from 'express';
import {MercadoPagoRefund} from "../../controllers/refundPaymentController";

export const routeRefunds = Router();


routeRefunds.post('/refund/create',async (req:Request,res:Response)=>{
    const {requestPaymentId,requestPaymentAccessToken,requestPaymentValue} = req.body;
    if(requestPaymentId && requestPaymentAccessToken && requestPaymentValue){
        try {
            const refund = new MercadoPagoRefund({
                defaultPaymentId: requestPaymentId,
                defaultPaymentAccessToken:requestPaymentAccessToken
            })
            const createRefund = await refund.create(Number(requestPaymentValue));
            return res.status(200).json({code:200,message:"pagamento reembolsado com sucesso!",payment:null});
        }catch (error){
            return res.status(203).json({code:404,message:"não foi possivel reembolsar seu pagamento",payment:null});
        }
    }else{
        res.status(400).json({code:403,message:"dados da requisição iconrretas",payment:null})
    }
});

routeRefunds.post('/refund/get/',async (req:Request,res:Response)=>{
    const {requestPaymentId,requestPaymentAccessToken,requestPaymentRefundedId} = req.body;
    if(requestPaymentId && requestPaymentAccessToken && requestPaymentRefundedId){
        try {
            const refund = new MercadoPagoRefund({
                defaultPaymentId: requestPaymentId,
                defaultPaymentAccessToken:requestPaymentAccessToken
            })
            const getRefund = await refund.get(requestPaymentRefundedId);
            return res.status(200).json({code:200,message:"pagamento reembolsado encontrado com sucesso!",payment:null});
        }catch (error){
            return res.status(203).json({code:404,message:"não foi possivel encontrar seu pagamento reembolsado",payment:null});
        }
    }else{
        res.status(400).json({code:403,message:"dados da requisição iconrretas",payment:null})
    }
});

routeRefunds.post('/refund/list',async (req:Request,res:Response)=>{
    const {requestPaymentId,requestPaymentAccessToken} = req.body;
    if(requestPaymentId && requestPaymentAccessToken){
        try {
            const refund = new MercadoPagoRefund({
                defaultPaymentId: requestPaymentId,
                defaultPaymentAccessToken:requestPaymentAccessToken
            })
            const listRefunds = await refund.list();
            return res.status(200).json({code:200,message:"pagamento reembolsado listado com sucesso!",payment:null});
        }catch (error){
            return res.status(203).json({code:404,message:"não foi possivel listar seu pagamento reembolsado",payment:null});
        }
    }else{
        res.status(400).json({code:403,message:"dados da requisição iconrretas",payment:null})
    }
});