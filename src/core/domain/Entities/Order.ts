import type { IOrderItem } from "./IOrder";
import type {IOrder} from "./IOrder";
import type {KeyValuePairs} from './KeyValuePairs'

export class kvp implements KeyValuePairs {
    name: string = " - ";
    value: number = 1;
}

export class Order implements IOrder {
    OrderKey: number = 1;
    OrderNumber: string = "";
    OrderDocumentNumber: string = "";
    OrderDate: Date = new Date();
    OrderLocation: KeyValuePairs = new kvp();
    AddressCategory3: KeyValuePairs = new kvp();
    OrderCustomer: KeyValuePairs = new kvp();
    OrderAccount: KeyValuePairs = new kvp();
    OrderRepAddress: KeyValuePairs = new kvp();
    OrderPaymentTerm: KeyValuePairs = new kvp();
    TransactionItem: KeyValuePairs = new kvp();
    OrderLineLocation: KeyValuePairs = new kvp();
    SelectedOrderItem: IOrderItem = new OrderItem();
}

export class OrderItem implements IOrderItem{
    TransactionUnit: KeyValuePairs = new kvp();
}