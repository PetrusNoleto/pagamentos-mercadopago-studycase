export interface defaultMercadoPagoPayment{
    defaultPaymentId:string,
    defaultPaymentDescription:string,
    defaultPaymentValue:number,
    defaultPaymentAccessToken:string,
    defaultPaymentInstallments:number,
    defaultPaymentMethodId:string,
    defaultPaymentToken:string
    defaultPaymentIssuerId:string,
    defaultPaymentPayer:defaultMercadoPagoPaymentPayer,
    defaultPaymentItems:defaultMercadoPagoPaymentItem[]
}
export interface defaultMercadoPagoPaymentPayer{
    defaultPayerType:string,
    defaultPayerEmail:string,
    defaultPayerIdentification:defaultMercadoPagoPaymentPayerIndentification
}

export interface defaultMercadoPagoPaymentPayerIndentification{
    defaultPayerIndentificationType:string,
    defaultPayerIndentificationNumber:string
}

export interface defaultMercadoPagoPaymentItem{
        defaultProductId:string
        defaultProductName: string,
        defaultProductDescription: string,
        defaultProductQuantity: number,
        defaultProductPrice: number
}