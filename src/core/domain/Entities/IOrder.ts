import type {KeyValuePairs} from './KeyValuePairs'

export type IOrder = {
    OrderKey:number,
    OrderNumber:string,
    OrderDocumentNumber:string,
    OrderDate:Date,
    OrderLocation:KeyValuePairs,
    AddressCategory3:KeyValuePairs,
    OrderCustomer:KeyValuePairs,
    OrderAccount:KeyValuePairs,
    OrderRepAddress:KeyValuePairs,
    OrderPaymentTerm:KeyValuePairs,
    TransactionItem:KeyValuePairs,
    OrderLineLocation:KeyValuePairs,
    SelectedOrderItem:IOrderItem,
    OrderLineItems:IOrderItem[]
}

export type IOrderItem = {
    LineNumber:number,
    ItemName:string,
    TransactionRate:number,
    TransactionUnit:KeyValuePairs,
    TransactionQuantity:number,
    SubTotal:number,
    LineDiscount:number,
    HeaderDiscountAmount:number,
    GrossTotal:number,
    ItemTaxType1Per:number,
}