import { defaultMercadoPagoPayment } from "types/default"
import { MercadoPagoConfig, Payment } from 'mercadopago';


export class MercadoPagoPayment {
   private readonly paymentId:string
   private readonly paymentDescription:string
   private readonly paymentValue:number
   private readonly paymentAccessToken:string
   private readonly paymentInstallments:number
   private readonly paymentMethodId:string
   private readonly paymentToken:string
   private readonly paymentIssuerId:string
   private readonly paymentPayerEmail:string
   private readonly paymentPayerIndentificationType:string
   private readonly paymentPayerIndentificationNumber:string

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
        this.paymentPayerIndentificationType=defaultPayerIdentificationType;
        this.paymentPayerIndentificationNumber=defaultPayerIdentificationNumber;
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
                    type:this.paymentPayerIndentificationType,
                    number:this.paymentPayerIndentificationNumber
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
    }
    public async pix(){
        const pixclient = new MercadoPagoConfig({ accessToken: this.paymentAccessToken});
        const pixMpPayment = new Payment(pixclient);
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
            const requestPayment = await pixMpPayment.create({ body:pixPaymentCreditBody, requestOptions:pixRequestOptions })
            return JSON.stringify(requestPayment) as string
        }catch(error){
            console.log(error)
            throw error;
        }
    }

}