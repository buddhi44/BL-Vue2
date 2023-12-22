import { ErrorMessage } from "../../interfaces/IBLUIOperationHelper";
import { BLOrder } from "../BLOrder";

export interface IHeaderCalculation {


}

export interface IOrderItemCalculation {

}


export interface ITaxableLine {
    ItemTaxType1: number;
    ItemTaxType2: number;
    ItemTaxType3: number;
    ItemTaxType4: number;
    ItemTaxType5: number;
    ItemTaxType1Per: number;
    ItemTaxType2Per: number;
    ItemTaxType3Per: number;
    ItemTaxType4Per: number;
    ItemTaxType5Per: number;
    IsRateInclusiveTT1: boolean;
    IsRateInclusiveTT2: boolean;
    IsRateInclusiveTT3: boolean;
    IsRateInclusiveTT4: boolean;
    IsRateInclusiveTT5: boolean;
    DiscountPercentage: number;
    DiscountAmount: number;
    Discount2Percentage: number;
    Discount2Amount: number;
    NetTotal: number;
    SubTotal: number;
    GrossTotal:number;
    HeaderDiscountAmount: number;
    calclulatePreDiscountLineTotal(): number;
    calclulatePostDiscountLineTotal(): number;
    calculateDiscount(): number;
    calclulateItemTaxType1Total(): number;
    calclulateItemTaxType2Total(): number;
    calclulateItemTaxType3Total(): number;
    calclulateItemTaxType4Total(): number;
    calclulateItemTaxType5Total(): number;
    calculateTotalTax(): number;
    calculatePostTaxLineTotal(): number;



}

export interface IOrderValidation {
    canAddNewItemToGrid(): boolean;
    canSaveTransaction(): boolean;   
    ValidationRules: Array<ValidationRule>;
    errorMessages: ErrorMessage;

}

export class ValidationRule {
    internalElementName!: string;
    IsValueMust!: boolean;
    validationMessage!: string;

}

export class OrderValidation implements IOrderValidation {
    canAddNewItemToGrid(): boolean {

        this.errorMessages.errorMessages.splice(0, this.errorMessages.errorMessages.length);
        if (this.getValidationRuleByName("OrderAddress")) {

            let val = this.getValidationRuleByName("OrderAddress");
            if (val?.IsValueMust && this.orderToValidate.OrderCustomer.addressKey < 10) {
                this.errorMessages.errorMessages.push("Please select a valid customer.");
            }
        }


        if (this.getValidationRuleByName("OrderLocation")) {

            let val = this.getValidationRuleByName("OrderLocation");
            if (val?.IsValueMust && this.orderToValidate.OrderLocation.codeKey < 10) {
                this.errorMessages.errorMessages.push("Please select a valid location.");
            }
        }

        if (this.getValidationRuleByName("PayementMethod")) {

            let val = this.getValidationRuleByName("PayementMethod");
            if (val?.IsValueMust && this.orderToValidate.OrderLocation.codeKey < 10) {
                this.errorMessages.errorMessages.push("Please select a valid payement method.");
            }
        }






        if (this.errorMessages.errorMessages.length > 0) {
            this.errorMessages.isShown = true;

            this.errorMessages.headerTitle = "Cannot add item to the order";
        }
        else {
            this.errorMessages.isShown = false;
        }


        return this.errorMessages.errorMessages.length===0;
    }
    canSaveTransaction(): boolean {
        return true;
    }




    constructor(public ValidationRules: Array<ValidationRule>, private orderToValidate: BLOrder, public errorMessages: ErrorMessage) {

    }


    getValidationRuleByName(name: string): ValidationRule | undefined {

        return this.ValidationRules.find(x => x.internalElementName === name);
    }

}