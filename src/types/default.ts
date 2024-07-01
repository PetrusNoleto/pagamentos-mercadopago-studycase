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
    defaultPayerIdentification:defaultMercadoPagoPaymentPayerIndentification
}

export interface defaultMercadoPagoPaymentPayerIndentification{
    defaultPayerIndentificationType:string,
    defaultPayerIndentificationNumber:string
}

