import { defaultMercadoPagoPayment } from "types/default";
import { MercadoPagoConfig, Payment,PaymentRefund } from 'mercadopago';


export class MercadoPagoPayment {
   private readonly paymentId:string;
   private readonly paymentDescription:string;
   private paymentValue:number;
   private paymentAccessToken:string;
   private readonly paymentInstallments:number;
   private readonly paymentMethodId:string;
   private readonly paymentToken:string;
   private readonly paymentIssuerId:string;
   private readonly paymentPayerEmail:string;
   private readonly paymentPayerIdentificationType:string;
   private readonly paymentPayerIdentificationNumber:string;

   private mercadoPagoPaymentId:string
   constructor(
        {
        defaultPaymentId,
        defaultPaymentDescription,
        defaultPaymentValue,
        defaultPaymentAccessToken,
        defaultPaymentInstallments,
        defaultPaymentMethodId,
        defaultPaymentToken,
        defaultPaymentIssuerId,
        defaultPaymentPayer:{
            defaultPayerEmail,
            defaultPayerIdentification:{
                defaultPayerIdentificationType,
                defaultPayerIdentificationNumber
            }
        }
    }:defaultMercadoPagoPayment){
        this.paymentId = defaultPaymentId;
        this.paymentDescription= defaultPaymentDescription;
        this.paymentValue= defaultPaymentValue;
        this.paymentAccessToken= defaultPaymentAccessToken;
        this.paymentInstallments= defaultPaymentInstallments;
        this.paymentMethodId= defaultPaymentMethodId;
        this.paymentToken= defaultPaymentToken;
        this.paymentIssuerId=defaultPaymentIssuerId;
        this.paymentPayerEmail=defaultPayerEmail;
        this.paymentPayerIdentificationType=defaultPayerIdentificationType;
        this.paymentPayerIdentificationNumber=defaultPayerIdentificationNumber;
        this.mercadoPagoPaymentId = "";
   }
    public async creditCard(){
        const client = new MercadoPagoConfig({ accessToken: this.paymentAccessToken});
        const mpPayment = new Payment(client);
        const requestOptions = {
	       idempotencyKey: this.paymentId,
        };
        const paymentCreditBody = {
        	transaction_amount: this.paymentValue,
        	description: this.paymentDescription,
        	payment_method_id: this.paymentMethodId,
            token:this.paymentToken,
            installments:Number(this.paymentInstallments),
            issuer_id:Number(this.paymentIssuerId),
        	payer: {
                email: this.paymentPayerEmail,
                identification:{
                    type:this.paymentPayerIdentificationType,
                    number:this.paymentPayerIdentificationNumber
                }
        	},
        };
        try{
            const requestPayment = await mpPayment.create({ body:paymentCreditBody, requestOptions });
            return JSON.stringify(requestPayment) as string;
        }catch(error){
            console.log(error);
            throw error;
        }
    };
    public async pix(){
        const pixClient = new MercadoPagoConfig({ accessToken: this.paymentAccessToken});
        const pixMpPayment = new Payment(pixClient);
        const pixRequestOptions = {
	       idempotencyKey: this.paymentId,
        };
        const pixPaymentPixBody = {
        	transaction_amount: this.paymentValue,
        	description: this.paymentDescription,
        	payment_method_id: this.paymentMethodId,
        	payer: {
                email: this.paymentPayerEmail,
        	},
        };
        try{
            const requestPayment = await pixMpPayment.create({ body:pixPaymentPixBody, requestOptions:pixRequestOptions });
            let responsePayment:Object | null = {}
            
            if(requestPayment && requestPayment.point_of_interaction && requestPayment.point_of_interaction.transaction_data){
                 responsePayment = {
                    id:requestPayment.id,
                    status:requestPayment.status,
                    qrcode:requestPayment.point_of_interaction.transaction_data.qr_code,
                    qrcodeBase64:requestPayment.point_of_interaction.transaction_data.qr_code_base64,
                    url:requestPayment.point_of_interaction.transaction_data.ticket_url
                }
            }else{
                 responsePayment = null
            }
            return JSON.stringify(responsePayment) as string;
        }catch(error){
            console.log(error);
            throw error;
        }
    };
    public async status(requestStatusPaymentId:string,requestStatusPaymentAccessToken:string){
        this.mercadoPagoPaymentId = requestStatusPaymentId
        this.paymentAccessToken = requestStatusPaymentAccessToken

        const paymentStatusClient = new MercadoPagoConfig({ accessToken: this.paymentAccessToken});

        const paymentStatus = new Payment(paymentStatusClient);
        try{
           const getPaymentStatus = await paymentStatus.get({
                id: this.mercadoPagoPaymentId
           })
           let paymentStatusData = {
               paymentStatus:getPaymentStatus.status,
               paymentStatusDetail:getPaymentStatus.status_detail,
               paymentStatusType: getPaymentStatus.payment_type_id,
               paymentStatusMethod:getPaymentStatus.payment_method_id,
               paymentStatusApprovedDate:getPaymentStatus.date_approved
           }
            return JSON.stringify(paymentStatusData) as string;
        }catch (error){
            console.log(error);
            throw error;
        }
    };
    public async cancel(requestCancelPaymentId:string,requestCancelPaymentAccessToken:string){
        this.mercadoPagoPaymentId = requestCancelPaymentId;
        this.paymentAccessToken = requestCancelPaymentAccessToken;
        const paymentCancelClient = new MercadoPagoConfig({ accessToken: this.paymentAccessToken});
        const paymentStatus = new Payment(paymentCancelClient);
        try{
            const cancelPayment = await paymentStatus.cancel({
                id: this.mercadoPagoPaymentId,
                requestOptions: {
                    idempotencyKey: this.mercadoPagoPaymentId
                },
            })
            let paymentCancelData = {
                paymentStatus:cancelPayment.status,
                paymentStatusDetail:cancelPayment.status_detail,
                paymentStatusType: cancelPayment.payment_type_id,
                paymentStatusMethod:cancelPayment.payment_method_id,
                paymentStatusApprovedDate:cancelPayment.date_approved
            }
            return JSON.stringify(paymentCancelData) as string;
        }catch (error){
            console.log(error);
            throw error;
        }
    };
    public async refund(requestRefundPaymentId:string,requestRefundPaymentAccessToken:string,requestRefundPaymentValue:number){
        this.mercadoPagoPaymentId = requestRefundPaymentId;
        this.paymentAccessToken = requestRefundPaymentAccessToken;
        this.paymentValue = requestRefundPaymentValue;
        const paymentCancelClient = new MercadoPagoConfig({ accessToken: this.paymentAccessToken});
        const paymentRefund = new PaymentRefund(paymentCancelClient);
        try{
            const refundPayment = await paymentRefund.create({
                payment_id: this.mercadoPagoPaymentId,
                body: {
                    amount: Number(this.paymentValue)
                }
            })
            let paymentRefundData = {
                paymentStatusDetail:refundPayment.id,
                paymentStatus:refundPayment.status
            }
            return JSON.stringify(paymentRefundData) as string;
        }catch (error){
            console.log(error);
            throw error;
        }
    };
}