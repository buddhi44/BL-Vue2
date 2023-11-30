import type IOrder from "./IOrder";

export default class Order implements IOrder {
    OrderKey: number = 0;
    OrderNumber: string = "";
    OrderDocumentNumber: string = "";
    OrderDate: Date = new Date();
}