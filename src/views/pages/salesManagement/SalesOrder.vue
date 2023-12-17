<script lang="ts">
import {useRoute} from 'vue-router'
import {onMounted,watch,ref,provide} from 'vue'
import { fetchWrapper } from '@/managers/helper/fetch_wrapper'
import {TokenEndPoint} from '@/router/token_endpoint'
import type ObjectFormRequest from '@/core/domain/ObjectFormRequest'
import UIBuilder from '@/views/components/uikit/UIBuilder.vue'
//import type {IOrder} from '@/core/domain/Entities/IOrder'
import {BLOrder} from '@/core/domain/Entities/BLOrder'
import {OrderItem} from '@/core/domain/Entities/OrderItem'
import {BLUIBuilder, BaseComponent} from '@/core/domain/interfaces/IBLUIOperationHelper'
import type { AddressResponse } from '@/core/domain/Entities/Base/addressResponse'
import type { CodeBaseResponse } from '@/core/domain/Entities/Base/codeBaseReponse'
import type { ItemResponse } from '@/core/domain/Entities/Base/ItemResponse'
import type { UnitResponse } from '@/core/domain/Entities/Base/unitResponse'
import type {UnitComboRequest} from '@/core/domain/Entities/Base/comboRequest'
import { Component, Vue, toNative,Prop,Inject,Watch,Provide } from 'vue-facing-decorator'
import type { BLUIElement } from '@/core/domain/BLUIElement'

@Component({
    components:{UIBuilder}
})
class SalesOrder extends BaseComponent {
    route = useRoute();
    controller = this.route.params.UrlController;
    action = this.route.params.UrlAction
    objectKey =this.route.query.ElementKey 
    uiContent =ref<any>()
    formElement =ref<any>()
    order =ref<BLOrder>(new BLOrder())
    controlVariables = ref<any>({
        ShiftPopUp:false
    })
    formRef =ref<any>();
    baseComponent=ref<BaseComponent>()

    async mounted(){
        this.order.value = new BLOrder();
        console.log("mounted")
        this.mainFormDefinitions = new BLUIBuilder();
        this.order.value.ObjectKey = Number(this.objectKey);
        this.mainFormDefinitions.UIObjectKey = Number(this.objectKey);
        this.mainFormDefinitions.OwnerComponent = this;
        this.mainFormDefinitions.DataObject = this.order;

    }


   
reset= ()=> {
    
}

save=()=>{

}

orderclick=()=>{

    console.log("ord",this.order.value)

}


}


export default toNative(SalesOrder)
</script>

<template>
    <v-card elevation="10" class="pa-3" style="width:100%;height:calc(100vh - 140px);background-color: #dbeded;overflow-y:scroll">
        <div class="ma-2">
            

                <!-- <v-form> -->
                    <UIBuilder v-if="mainFormDefinitions!=undefined"  :Def="mainFormDefinitions" />
                <!-- </v-form> -->
                <button v-on:click="orderclick">button</button>
        </div>
    </v-card>
</template>

<!--
@Provide controls=this.controlVariables

@Provide('baseObject') 
baseObject= new BLOrder();

@Provide('GRID_DATA') 
GRID_DATA = this.order.value.OrderItems

@Provide('changeBaseObject') 
changeBaseObject = (mObject:BLOrder) => {
    this.order.value = mObject;
}
 @Provide('actionTriggers') 

actionTriggers =[
    {
        name:"OnInvoiceEditClick",
        action:()=>{
            this.controlVariables.ShiftPopUp = true;
         
        }
    },
    {
        name:"OnOrderNewClick",
        action:()=>{
            alert("new click")
            this.order.value =new BLOrder()
           
        }
    },
    {
        name:"OnOrderSaveClick",
        action:() => {

            this.save();
        }
    },
    {
        name:"ShowAddNewCustomer",
        action:() => {

           
            
        }
    },
    {
        name:"OnOrderPrintClick",
        action:() => {

         
            
        }
    },
    {
        name:"OnOrderFindClick",
        action:() => {
            
        }
    },
    {
        name:"OnOrderLocationChanged",
        action:(data:CodeBaseResponse)=>{
         this.order.value.OrderLocation=data
         console.log(this.order.value.OrderLocation)
        }
    },
    {
        name:"OnRouteComboChange",
        action:(data:any)=>{
        }
    },
    {
        name:"OnOrderCustomerChanged",
        action:(data:any)=>{
            this.order.value.OrderCustomer=data
        }
    },
    {
        name:"OnOrderRepChanged",
        action:(data:AddressResponse)=>{
            this.order.value.OrderRepAddress=data
            
        }
    },
    {
        name:"OnPayementTermChanged",
        action:(data:any)=>{
            this.order.value.OrderPaymentTerm=data
        }
    },
    {
        name:"OnPayementTermChanged",
        action:(data:CodeBaseResponse)=>{
            this.order.value.OrderPaymentTerm=data
        }
    },
    {
        name:"OnAdr2ComboChange",
        action:(data:AddressResponse)=>{
            this.order.value.Address2=data
        }
    },
    {
        name:"OnHeaderLevelDiscountClick",
        action:(data:number)=>{
            this.order.value.HeaderDiscountAmount=data
        }
    },
    {
        name:"OnTransactionItemChange",
        action:(data:ItemResponse)=>{
            this.order.value.SelectedOrderItem.TransactionItem=data
        }
    },
    {
        name:"OnLineTransactionUnitChange",
        action:(data:UnitResponse)=>{
            this.order.value.SelectedOrderItem.TransactionUnit=data
        }
    },
    {
        name:"TransactionUnit_OnBeforeDataFetch",
        action:(data:UnitComboRequest)=>{
            data.itemKey=this.order.value.SelectedOrderItem.TransactionItem.itemKey;
        }
    },
    {
        name:"OnLineTransactionQuantityChanged",
        action:(data:number)=>{
           
        }
    },
    {
        name:"OnLineDisPerChange",
        action:(data:number)=>{
           
        }
    },
    {
        name:"OnRateChange",
        action:(data:number)=>{
           
        }
    },
    {
        name:"OnIsTransferClick",
        action:(data:boolean)=>{
           
        }
    },
    {
        name:"OnIsConfirmedClick",
        action:(data:boolean)=>{
           
        }
    },
    {
        name:"TotalRateChange",
        action:(data:number)=>{
           
        }
    },
    {
        name:"OnItemDescription",
        action:(data:string)=>{
           
        }
    },
    {
        name:"RequiredQuantityChanged",
        action:(data:number)=>{
           
        }
    },
    {
        name:"OnAddItemButtonClick",
        action:() => {
            this.order.value.OrderItems = this.order.value.OrderItems.concat(new OrderItem())
        }
    },

    
] -->