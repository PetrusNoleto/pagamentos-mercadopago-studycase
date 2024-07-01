export interface mercadoPagoPayment{
    paymentId:string,
    paymentDescription:string,
    paymentValue:number,
    paymentAccessToken:string,
    paymentInstallments:number,
    paymentMethodId:string,
    paymentToken:string
    paymentIssuerId:string,
}
export interface mercadoPagoPaymentPayer{
    paymentPayerEmail:string,
    paymentPayerIndentificationType:string,
    paymentPayerIndentificationNumber:string
}
