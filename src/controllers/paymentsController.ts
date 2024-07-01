import { defaultMercadoPagoPayment } from "types/default"

export class MercadoPagoPayment {
   private paymentId:string
   private paymentDescription:string
   private paymentValue:number
   private paymentAccessToken:string
   private paymentInstallments:number
   private paymentMethodId:string
   private paymentToken:string
   private paymentIssuerId:string
   private paymentPayerType:string
   private paymentPayerEmail:string
   private paymentPayerIndentificationType:string
   private paymentPayerIndentificationNumber:string
   private paymentProductId:string
   private paymentProductName: string
   private paymentProductDescription: string
   private paymentProductQuantity: number
   private paymentProductPrice: number


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
            defaultPayerType,
            defaultPayerIdentification:{
                defaultPayerIndentificationType,
                defaultPayerIndentificationNumber
            }
        },
        defaultPaymentItems:[
            {
                defaultProductId,
                defaultProductName,
                defaultProductDescription,
                defaultProductPrice,
                defaultProductQuantity
            }
        ]   
    }:defaultMercadoPagoPayment){
        this.paymentId = defaultPaymentId
        this.paymentDescription= defaultPaymentDescription
        this.paymentValue= defaultPaymentValue
        this.paymentAccessToken= defaultPaymentAccessToken
        this.paymentInstallments= defaultPaymentInstallments
        this.paymentMethodId= defaultPaymentMethodId
        this.paymentToken= defaultPaymentToken
        this.paymentIssuerId=defaultPaymentIssuerId
        this.paymentPayerType=defaultPayerType
        this.paymentPayerEmail=defaultPayerEmail
        this.paymentPayerIndentificationType=defaultPayerIndentificationType
        this.paymentPayerIndentificationNumber=defaultPayerIndentificationNumber
        this.paymentProductId=defaultProductId
        this.paymentProductName=defaultProductName
        this.paymentProductDescription=defaultProductDescription
        this.paymentProductQuantity =defaultProductPrice
        this.paymentProductPrice=defaultProductQuantity

    }
   public index(){
       return(
           this.paymentProductPrice 
       )
   }


}