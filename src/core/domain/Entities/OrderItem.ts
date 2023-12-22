
import { AccountResponse } from "./Base/accountResponse";
import { AddressResponse } from "./Base/addressResponse";
import { CodeBaseResponse } from "./Base/codeBaseReponse";
import { ItemResponse } from "./Base/ItemResponse";
import { ProjectResponse } from "./Base/projectResponse";
import { UnitResponse } from "./Base/unitResponse";
import type { ITaxableLine } from "./contracts/IHeaderCalculation";


export class OrderItem implements ITaxableLine {
   
    AddressKey: number = 1;
    AnalysisType1: CodeBaseResponse = new CodeBaseResponse();
    AnalysisType2: CodeBaseResponse = new CodeBaseResponse();
    AnalysisType3: CodeBaseResponse = new CodeBaseResponse();
    AnalysisType4: CodeBaseResponse = new CodeBaseResponse();
    AvailableQuantity: number = 0;
    AvailableStock: number = 0;
    baringCompany: AccountResponse = new AccountResponse();
    baringCustomer: AccountResponse = new AccountResponse();
    baringPrinciple: AccountResponse = new AccountResponse();
    BussinessUnit: CodeBaseResponse = new CodeBaseResponse();
    companyAmount: number = 0;
    companyPrecentage: number = 0;
    customerAmount: number = 0;
    customerPrecentage: number = 0;
    Description: string | null = '';
    Discount2Amount: number = 0;
    Discount2Percentage: number = 0;
    DiscountAmount: number = 0;
    DiscountPercentage: number = 0;
    FromOrderDetailKey: number = 1;
    FromOrderDetKy: number = 1;
    HeaderDiscountAmount: number = 0;
    insurenceAmount: number = 0;
    insurencePrecentage: number = 0;
    IsActive: number = 1;
    IsApproved: number = 1;
    IsDirty: boolean = false;
    IsItemReturned: boolean = false;
    IsPendingForIssue: boolean = false;
    IsRateInclusiveTT1: boolean = false;
    IsRateInclusiveTT2: boolean = false;
    IsRateInclusiveTT3: boolean = false;
    IsRateInclusiveTT4: boolean = false;
    IsRateInclusiveTT5: boolean = false;
    IsSupplimentary: number = 0;
    IsTransfer: number = 0;
    IsTransferConfirmed: number = 0;
    ItemTaxType1: number = 0;
    ItemTaxType1Per: number = 0;
    ItemTaxType2: number = 0;
    ItemTaxType2Per: number = 0;
    ItemTaxType3: number = 0;
    ItemTaxType3Per: number = 0;
    ItemTaxType4: number = 0;
    ItemTaxType4Per: number = 0;
    ItemTaxType5: number = 0;
    ItemTaxType5Per: number = 0;
    ItemTaxType5Per2: number = 0;
    NetTotal: number = 0;
    LineNumber: number = 0;
    SubTotal: number = 0;
    GrossTotal: number = 0;
    LineTotalWithoutDiscount: number = 0;
    ObjectKey: number = 1;
    OrderDetailKey: number = 1;
    OverridrderDetailsAccountKey1: number = 1;
    OrderDetailsAccountKey2: number = 1;
    OrderDetailsAccountKey3: number = 1;
    TransactionItem: ItemResponse = new ItemResponse();
    OrderKey: number = 1;
    OrderLineLocation: CodeBaseResponse = new CodeBaseResponse();
    OrderLineLocation2: CodeBaseResponse = new CodeBaseResponse();
    OrderLineProject: ProjectResponse = new ProjectResponse();
    OrderType: CodeBaseResponse = new CodeBaseResponse();
    OwnerAmount: number = 0;
    ownerPrecentage: number = 0;
    principleAmount: number = 0;
    principlePrecentage: number = 0;
    processDetailsKey: number = 1;
    Rate: number = 0;
    ReferanceOrderDetKey: number = 1;
    Remark: string = '';
    RequestedQuantity: number = 0;
    RequiredDate: Date = new Date();
    ResourceAddress: AddressResponse = new AddressResponse();
    Supplier: AccountResponse = new AccountResponse();
    SupplimentaryNumber: string = '';
    SupplimentaryOrderKey: number = 1;
    TransactionDiscountAmount: number = 0;
    TransactionQuantity: number = 0;
    TransactionRate: number = 0;
    TransactionUnit: UnitResponse = new UnitResponse();
    TransferQuantity: number = 1;
    Unit: UnitResponse = new UnitResponse();
    LineDiscount:number=0;

    calclulatePreDiscountLineTotal(): number {
        this.SubTotal = this.TransactionQuantity * this.TransactionRate;
        return this.SubTotal;
    }
    calclulatePostDiscountLineTotal(): number {
        this.NetTotal = this.calclulatePreDiscountLineTotal() - this.calculateDiscount();
        return this.NetTotal;
    }
    calclulateItemTaxType1Total(): number {
        this.ItemTaxType1 = this.calclulatePostDiscountLineTotal() * this.ItemTaxType1Per;
        return this.ItemTaxType1;
    }
    calclulateItemTaxType2Total(): number {
        this.ItemTaxType2 = this.calclulatePostDiscountLineTotal() * this.ItemTaxType2Per;
        return this.ItemTaxType2;
    }
    calclulateItemTaxType3Total(): number {
        this.ItemTaxType3 = this.calclulatePostDiscountLineTotal() * this.ItemTaxType3Per;
        return this.ItemTaxType3;
    }
    calclulateItemTaxType4Total(): number {
        this.ItemTaxType4 = this.calclulatePostDiscountLineTotal() * this.ItemTaxType4Per;
        return this.ItemTaxType4;
    }
    calclulateItemTaxType5Total(): number {
        this.ItemTaxType5 = this.calclulatePostDiscountLineTotal() * this.ItemTaxType5Per;
        return this.ItemTaxType5;
    }
    calculateTotalTax(): number {
        return 0;
    }
    calculatePostTaxLineTotal(): number {
        this.GrossTotal = this.calclulatePostDiscountLineTotal() + this.calclulateItemTaxType1Total();
        return this.GrossTotal;

    }
    calculateDiscount(): number {
        this.TransactionDiscountAmount = this.calclulatePreDiscountLineTotal() * this.DiscountPercentage / 100;
    
        return this.TransactionDiscountAmount;
    }

    calculateBalances() {

        this.calclulatePreDiscountLineTotal();
        this.calclulatePostDiscountLineTotal();
        this.calclulateItemTaxType1Total();
        this.calclulateItemTaxType2Total();
        this.calclulateItemTaxType3Total();
        this.calclulateItemTaxType4Total();
        this.calclulateItemTaxType5Total();
        this.calculatePostTaxLineTotal();
    }

}