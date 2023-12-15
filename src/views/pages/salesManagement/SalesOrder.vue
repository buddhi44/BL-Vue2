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
import {BaseComponent} from '@/core/domain/interfaces/IBLUIOperationHelper'
import type { AddressResponse } from '@/core/domain/Entities/Base/addressResponse'
import type { CodeBaseResponse } from '@/core/domain/Entities/Base/codeBaseReponse'
import type { ItemResponse } from '@/core/domain/Entities/Base/ItemResponse'
import type { UnitResponse } from '@/core/domain/Entities/Base/unitResponse'
import type {UnitComboRequest} from '@/core/domain/Entities/Base/comboRequest'
import { Component, Vue, toNative,Prop,Inject,Watch,Provide } from 'vue-facing-decorator'
import { collapseTextChangeRangesAcrossMultipleVersions } from 'typescript'
import { ThreedCubeSphereIcon } from 'vue-tabler-icons'

@Component
class SalesOrder extends Vue {
    route = useRoute();
    controller = this.route.params.UrlController;
    action = this.route.params.UrlAction
    objectKey =this.route.query.ElementKey 

    uiContent !:any
    formElement !:any
    order = new BLOrder()
    controlVariables = {
        ShiftPopUp:false
    }
    formRef !:any;
    baseComponent:BaseComponent=new BaseComponent()

    async mounted(){
        this.order = new BLOrder();
        this.order.objectKey = Number(this.objectKey);
        this.baseComponent.mainFormDefinitions.UIObjectKey = Number(this.objectKey);
        this.baseComponent.mainFormDefinitions.OwnerComponent = this;
        await this.LoadFormDefinition()
    }

    LoadFormDefinition = async () => {
    var request : ObjectFormRequest = {
        MenuKey:Number(this.objectKey)
    }
    var content = await fetchWrapper.post(TokenEndPoint.FormDefinitionUrl,request)
    var contList = content.children;
    var element = null;
    contList.forEach((item:any,index:number)=>{
        if(item.elementKey == Number(this.objectKey)){
            element = item;
            contList.splice(index,1)
        }
    })
    this.uiContent = contList
    this.formElement = element
}

@Provide controls=this.controlVariables

@Provide baseObject= this.order
@Provide GRID_DATA = this.order.orderItems
@Provide changeBaseObject = (mObject:BLOrder) => {
    this.order = mObject;
}

@Provide actionTriggers =[
    {
        name:"OnInvoiceEditClick",
        action:()=>{
            this.controlVariables.ShiftPopUp = true;
           // console.log("acted")
        }
    },
    {
        name:"OnOrderNewClick",
        action:()=>{
            //alert("new click")
            this.order =new BLOrder()
            this.reset();
        }
    },
    {
        name:"OnOrderSaveClick",
        action:() => {

            //console.log(order.value)
            this.save();
        }
    },
    {
        name:"ShowAddNewCustomer",
        action:() => {

            //console.log(order.value)
            
        }
    },
    {
        name:"OnOrderPrintClick",
        action:() => {

            //console.log(order.value)
            
        }
    },
    {
        name:"OnOrderFindClick",
        action:() => {

            //console.log(order.value)
            
        }
    },
    {
        name:"OnOrderLocationChanged",
        action:(data:CodeBaseResponse)=>{
         this.order.orderLocation=data
         
        }
    },
    {
        name:"OnRouteComboChange",
        action:(data:any)=>{
            //alert("New Order Clicked!")
        }
    },
    {
        name:"OnOrderCustomerChanged",
        action:(data:any)=>{
            this.order.orderCustomer=data
        }
    },
    {
        name:"OnOrderRepChanged",
        action:(data:AddressResponse)=>{
            this.order.orderRepAddress=data
            
        }
    },
    {
        name:"OnPayementTermChanged",
        action:(data:any)=>{
            this.order.orderPaymentTerm=data
        }
    },
    {
        name:"OnPayementTermChanged",
        action:(data:CodeBaseResponse)=>{
            this.order.orderPaymentTerm=data
        }
    },
    {
        name:"OnAdr2ComboChange",
        action:(data:AddressResponse)=>{
            this.order.address2=data
        }
    },
    {
        name:"OnHeaderLevelDiscountClick",
        action:(data:number)=>{
            this.order.headerDiscountAmount=data
        }
    },
    {
        name:"OnTransactionItemChange",
        action:(data:ItemResponse)=>{
            this.order.currentItem.transactionItem=data
        }
    },
    {
        name:"OnLineTransactionUnitChange",
        action:(data:UnitResponse)=>{
            this.order.currentItem.transactionUnit=data
        }
    },
    {
        name:"TransactionUnit_OnBeforeDataFetch",
        action:(data:UnitComboRequest)=>{
            data.itemKey=this.order.currentItem.transactionItem.itemKey;
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
            this.order.orderItems = this.order.orderItems.concat(new OrderItem())
            //console.log(order.value.orderItems)
        }
    },

    
]




reset= ()=> {
    
}

save=()=>{

}

}


export default toNative(SalesOrder)
</script>

<template>
    <v-card elevation="10" class="pa-3" style="width:100%;height:calc(100vh - 140px);background-color: #dbeded;overflow-y:scroll">
        <div class="ma-2">
            <h3 class="mb-5" v-if="formElement != null || formElement != undefined">{{ formElement.elementCaption }}</h3>
            <v-form ref="form">
                <UIBuilder :Parent="objectKey" v-if="uiContent != undefined" :ContentList="uiContent" />
            </v-form>
            
        </div>
    </v-card>
</template>