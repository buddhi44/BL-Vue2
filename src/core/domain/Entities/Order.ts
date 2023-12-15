// import type { IOrderItem } from "./IOrder";
// import type {IOrder} from "./IOrder";
// import type {KeyValuePairs} from './KeyValuePairs'

// export class kvp implements KeyValuePairs {
//     name: string = " - ";
//     value: number = 1;
// }

// export class Order implements IOrder {
//     OrderKey: number = 1;
//     OrderNumber: string = "";
//     OrderDocumentNumber: string = "";
//     OrderDate: Date = new Date();
//     OrderLocation: KeyValuePairs = new kvp();
//     AddressCategory3: KeyValuePairs = new kvp();
//     OrderCustomer: KeyValuePairs = new kvp();
//     OrderAccount: KeyValuePairs = new kvp();
//     OrderRepAddress: KeyValuePairs = new kvp();
//     OrderPaymentTerm: KeyValuePairs = new kvp();
//     TransactionItem: KeyValuePairs = new kvp();
//     OrderLineLocation: KeyValuePairs = new kvp();
//     SelectedOrderItem: IOrderItem = new OrderItem();
//     OrderLineItems: IOrderItem[] = [];

//     constructor(){
//         this.OrderLocation = new kvp();
//     }
// }

// export class OrderItem implements IOrderItem{
//     LineNumber: number = 1;
//     ItemName: string = "";
//     TransactionRate: number = 1;
//     TransactionUnit: KeyValuePairs = new kvp();
//     TransactionQuantity: number = 1;
//     SubTotal: number = 1;
//     LineDiscount: number = 1;
//     HeaderDiscountAmount: number = 1;
//     GrossTotal: number = 1;
//     ItemTaxType1Per: number = 1;
// }