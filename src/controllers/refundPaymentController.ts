import {defaultMercadoPagoRefund} from "../types/default";
import {MercadoPagoConfig, PaymentRefund} from "mercadopago";

export class MercadoPagoRefund{
    private readonly paymentId:string;
    private paymentRefundId:string;
    private paymentRefundValue:number;
    private readonly paymentAccessToken:string;
    constructor({defaultPaymentId,defaultPaymentAccessToken}:defaultMercadoPagoRefund) {
        this.paymentId=defaultPaymentId;
        this.paymentRefundId="";
        this.paymentRefundValue= Number(0);
        this.paymentAccessToken=defaultPaymentAccessToken;
    };
    public async create(paymentAmount:number){
        const paymentRefundClient = new MercadoPagoConfig({ accessToken: this.paymentAccessToken});
        const paymentRefund = new PaymentRefund(paymentRefundClient);
        this.paymentRefundValue = paymentAmount
        try{
            const refundPayment = await paymentRefund.create({
                payment_id: this.paymentId,
                body: {
                    amount: Number(this.paymentRefundValue)
                }
            })
            return JSON.stringify(refundPayment) as string;
        }catch (error){
            console.log(error);
            throw error;
        }
    };
    public async get(refundedPaymentId:string){
        const paymentGetRefund = new MercadoPagoConfig({ accessToken: this.paymentAccessToken});
        const paymentRefund = new PaymentRefund(paymentGetRefund);
        this.paymentRefundId = refundedPaymentId
        try{
            const getRefundPayment = await paymentRefund.get({
                payment_id: this.paymentId,
                refund_id: this.paymentRefundId
            })
            return JSON.stringify(getRefundPayment) as string;
        }catch (error){
            console.log(error);
            throw error;
        }
    }
    public async list(){
        const paymentRefundList = new MercadoPagoConfig({ accessToken: this.paymentAccessToken});
        const paymentRefund = new PaymentRefund(paymentRefundList);
        try{
            const refundList = await paymentRefund.list({
                payment_id: this.paymentId,
            })
            return JSON.stringify(refundList) as string;
        }catch (error){
            console.log(error);
            throw error;
        }
    }
}