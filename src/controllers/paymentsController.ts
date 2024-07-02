import { defaultMercadoPagoPayment } from "types/default";
import { MercadoPagoConfig, Payment } from 'mercadopago';


export class MercadoPagoPayment {
   private readonly paymentId:string;
   private readonly paymentDescription:string;
   private readonly paymentValue:number;
   private paymentAccessToken:string;
   private readonly paymentInstallments:number;
   private readonly paymentMethodId:string;
   private readonly paymentToken:string;
   private readonly paymentIssuerId:string;
   private readonly paymentPayerEmail:string;
   private readonly paymentPayerIdentificationType:string;
   private readonly paymentPayerIdentificationNumber:string;

   private checkPaymentStatusId:string

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
        this.checkPaymentStatusId = "";
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
        const pixPaymentCreditBody = {
        	transaction_amount: this.paymentValue,
        	description: this.paymentDescription,
        	payment_method_id: this.paymentMethodId,
        	payer: {
                email: this.paymentPayerEmail,
        	},
        };
        try{
            const requestPayment = await pixMpPayment.create({ body:pixPaymentCreditBody, requestOptions:pixRequestOptions });
            return JSON.stringify(requestPayment) as string;
        }catch(error){
            console.log(error);
            throw error;
        }
    };
    public async status(requestStatusPaymentId:string,requestStatusPaymentAccessToken:string){
        this.checkPaymentStatusId = requestStatusPaymentId
        this.paymentAccessToken = requestStatusPaymentAccessToken

        const paymentStatusClient = new MercadoPagoConfig({ accessToken: this.paymentAccessToken});

        const paymentStatus = new Payment(paymentStatusClient);
        try{
           const getPaymentStatus = await paymentStatus.get({
                id: this.checkPaymentStatusId
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
    }
}