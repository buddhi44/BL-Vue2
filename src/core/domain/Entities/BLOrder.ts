import { AccountResponse } from "./Base/accountResponse";
import { AddressResponse } from "./Base/addressResponse";
import { CodeBaseResponse } from "./Base/codeBaseReponse";
import { ProjectResponse } from "./Base/projectResponse";
import { OrderItem } from "./OrderItem";


export class BLOrder {
    OrderKey: number = 1;
    OrderNumber: string | null = '';
    isHold: boolean = false;
    OrderDocumentNumber: string | null = '';

    OrderDate: Date = new Date();
    orderFinishDate: Date = new Date();
    DeliveryDate: Date = new Date();
    OrderLocation: CodeBaseResponse = new CodeBaseResponse();
    OrderLocation2: CodeBaseResponse = new CodeBaseResponse();
    OrderPaymentTerm: CodeBaseResponse = new CodeBaseResponse();
    OrderCustomer: AddressResponse = new AddressResponse();
    OrderRepAddress: AddressResponse = new AddressResponse();
    OrderAccount: AccountResponse = new AccountResponse();
    OrderType: CodeBaseResponse = new CodeBaseResponse();
    OrderItems: OrderItem[] = [];
    FormObjectKey: number = 1;
    ObjectKey: number = 1;
    HeaderLevelDisountPrecentage: number = 0;
    BussinessUnit: CodeBaseResponse = new CodeBaseResponse();
    FromOrderKey: number = 1;
    isFromQuotation: boolean = false;
    Description: string | null = '';
    OrderApproveState: CodeBaseResponse = new CodeBaseResponse();
    orderPrefix: CodeBaseResponse = new CodeBaseResponse();
    OrderCategory1: CodeBaseResponse = new CodeBaseResponse();
    OrderCategory2: CodeBaseResponse = new CodeBaseResponse();
    OrderCategory3: CodeBaseResponse = new CodeBaseResponse();
    OrderStatus: CodeBaseResponse = new CodeBaseResponse();
    OrderControlCondition: CodeBaseResponse = new CodeBaseResponse();
    OrderProject: ProjectResponse = new ProjectResponse();
    Code1Key: number = 1;
    meterReading: number = 0;
    insurance: AccountResponse = new AccountResponse();
    isIRNEstimateOrder: boolean = false;
    isSupplimentaryEstimateOrder: boolean = false;
    baringHeaderPrincipleAccount: AccountResponse = new AccountResponse();
    principalPercentage: number = 0;
    principalAmount: number = 0;
    baringHeaderCompanyAccount: AccountResponse = new AccountResponse();;
    companyPercentage: number = 0;
    companyAmount: number = 0;
    customerPrecentage: number = 0;
    customerAmount: number = 0;
    orderAccountKey1: number = 1;
    orderAccountKey2: number = 1;
    orderAccountKey3: number = 1; 
    remarks: string | null = '';
    insurencePrecentage: number = 0;
    insurenceAmount: number = 0;
    ownerPrecentage: number = 0;
    ownerAmount: number = 0;
    AddressCategory1: CodeBaseResponse = new CodeBaseResponse();
    AddressCategory2: CodeBaseResponse = new CodeBaseResponse()
    AddressCategory3: CodeBaseResponse = new CodeBaseResponse();
    OrderYourReference: string | null = '';
    PrefixedOrderNumber: string = '';
    Address2: AddressResponse = new AddressResponse();
    IsActive: number = 1;
    IsApprove: number = 1;

    HeaderDiscountAmount: number = 0;
    DiscountPercentage: number = 0;
    DiscountAmount: number = 0;
    shift: CodeBaseResponse = new CodeBaseResponse();
    shiftDate: Date = new Date();;
    workStationKy: number = 1;
    Amount: number = 0;
    NextLineNumber: number = 1;
    SelectedOrderItem: OrderItem = new OrderItem();
    EditingLineItem: OrderItem = new OrderItem();
    TransactionDiscountAmount: number = 0;
    TransactionAmount: number = 0;

    createNewOrderItem(): OrderItem {

        let newOrderItem = new OrderItem();
        newOrderItem.OrderLineLocation = this.OrderLocation;
        newOrderItem.OrderLineProject = this.OrderProject;
        newOrderItem.AddressKey = this.OrderCustomer.addressKey;        
        newOrderItem.lineNumber = this.NextLineNumber++;
        this.SelectedOrderItem = newOrderItem;
        return newOrderItem;

    }

    calculateBalances() {

        this.OrderItems.forEach((item) => {
            item.calculateBalances();
            this.TransactionDiscountAmount += item.TransactionDiscountAmount;
            this.Amount += item.calclulatePostDiscountLineTotal();
            this.TransactionAmount = item.calclulatePreDiscountLineTotal();
        });
    }

    copyFrom(source:any){
        
        this.OrderKey=source.orderKey
        this.OrderNumber=source.orderNumber
        this.OrderDate=source.orderDate
        this.OrderLocation=source.orderLocation
        this.OrderCustomer=source.orderCustomer
        this.OrderAccount=source.orderAccount
        this.OrderRepAddress=source.orderRepAddress
        this.OrderPaymentTerm=source.orderPaymentTerm
        this.HeaderDiscountAmount=source.headerDiscountAmount
        source.orderItems.forEach((itm:any) => {
           var ordr_obj= {
                LineNumber:itm.lineNumber,
                TransactionItem:itm.transactionItem,
                TransactionRate:itm.transactionRate,
                TransactionQuantity:itm.transactionQuantity,
                DiscountPercentage:itm.discountPercentage,
                DiscountAmount:itm.discountAmount,
                TransactionDiscountAmount:itm.transactionDiscountAmount,
                ItemTaxType1Per:itm.itemTaxType1Per,
                ItemTaxType1:itm.itemTaxType1,
            }
            this.OrderItems.push(ordr_obj as OrderItem)
        });

    }
    constructor() {

    }
}

