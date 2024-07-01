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
    paymentPayerType:string,
    paymentPayerEmail:string,
    paymentPayerIndentificationType:string,
    paymentPayerIndentificationNumber:string
}
export interface mercadoPagoPaymentItem{
        paymentProductId:string
        paymentProductName: string,
        paymentProductDescription: string,
        paymentProductQuantity: number,
        paymentProductPrice: number
}