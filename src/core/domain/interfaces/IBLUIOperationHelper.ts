//import { ValidationRule } from "../../entity/contracts/IHeaderCalculation";
import type { Ref } from 'vue';
import type { BLUIElement }  from '../BLUIElement'
import { Vue } from 'vue-facing-decorator'
export class BLUIBuilder {

    OwnerComponent!: Ref<any>;
    DataObject!: Ref<any>;
    UIObjectKey!: Ref<number>;
    ObjectRefs: Array<IUIDefinition> = new Array<IUIDefinition>();
    //ValidationRules: Array<ValidationRule> = [];
    errorMessage!: ErrorMessage 

    hasComponent(uiDef: IUIDefinition): boolean {

        if (this.ObjectRefs === undefined || this.ObjectRefs.length === 0) {
            return false;

        }
        if (uiDef) {
            return this.ObjectRefs.includes(uiDef);
        }


        return false;
    }


    getComponentByInternalName(name: string): IUIDefinition | undefined {
        if (name) {
            let component = this.ObjectRefs.find((item) => item.uiObject._internalElementName === name);
            return component;
        }
        return undefined;
    }




}

export interface componentHelper {

}

export interface IUIDefinition {

    Disable(): void;
    Enable(): void;
    Reload(): void;
    uiObject: BLUIElement;


}

export class BaseComponent extends Vue {
    mainFormDefinitions!: BLUIBuilder;
    UIObjectKey: number = 1;
    errorMessage: ErrorMessage = new ErrorMessage();
  
    // constructor() {
    //     super();
    //     this.mainFormDefinitions = new BLUIBuilder();
    //     this.mainFormDefinitions.errorMessage=this.errorMessage;
       
    // }
}

export class ErrorMessage {

    errorMessages: Array<string> = [];
    headerTitle: string='';
    isShown: boolean = false;
    successMessage: string = '';
}