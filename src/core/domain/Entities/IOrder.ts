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
    SelectedOrderItem:IOrderItem
}

export type IOrderItem = {
    TransactionUnit:KeyValuePairs
}