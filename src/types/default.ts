export interface defaultMercadoPagoPayment{
    defaultPaymentId:string,
    defaultPaymentDescription:string,
    defaultPaymentValue:number,
    defaultPaymentAccessToken:string,
    defaultPaymentInstallments:number,
    defaultPaymentMethodId:string,
    defaultPaymentToken:string
    defaultPaymentIssuerId:string,
    defaultPaymentPayer:defaultMercadoPagoPaymentPayer
}
export interface defaultMercadoPagoPaymentPayer{
    defaultPayerEmail:string,
    defaultPayerIdentification:defaultMercadoPagoPaymentPayerIdentification
}

export interface defaultMercadoPagoPaymentPayerIdentification{
    defaultPayerIdentificationType:string,
    defaultPayerIdentificationNumber:string
}

export  interface  defaultMercadoPagoRefund{
    defaultPaymentId:string,
    defaultPaymentAccessToken:string
}