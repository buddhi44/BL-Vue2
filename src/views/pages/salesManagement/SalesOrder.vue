<script setup lang="ts">
import {useRoute} from 'vue-router'
import {onMounted,watch,ref,provide} from 'vue'
//import type BLUIElement from '../../core/domain/BLUIElement'
import { fetchWrapper } from '@/managers/helper/fetch_wrapper'
import {TokenEndPoint} from '@/router/token_endpoint'
import type ObjectFormRequest from '@/core/domain/ObjectFormRequest'
import UIBuilder from '@/views/components/uikit/UIBuilder.vue'
import type {IOrder} from '@/core/domain/Entities/IOrder'
import {Order, OrderItem} from '@/core/domain/Entities/Order'
import { date } from 'yup'

const route = useRoute();

const controller = route.params.UrlController;
const action = route.params.UrlAction
const objectKey = route.query.ElementKey

const uiContent = ref<any>(undefined)
const formElement = ref<any>(undefined)
const contentme = ref<IOrder>(new Order())
const controlVariables = ref<any>({
    ShiftPopUp:false
})
const formRef = ref<any>(null);

onMounted(async ()=>{
    await LoadFormDefinition()
})

const LoadFormDefinition = async () => {
    var request : ObjectFormRequest = {
        MenuKey:Number(objectKey)
    }
    var content = await fetchWrapper.post(TokenEndPoint.FormDefinitionUrl,request)
    var contList = content.children;
    var element = null;
    contList.forEach((item:any,index:number)=>{
        if(item.elementKey == Number(objectKey)){
            element = item;
            contList.splice(index,1)
        }
    })
    uiContent.value = contList
    formElement.value = element
}
provide("controls",controlVariables.value)
provide("baseObject",contentme.value)
provide("GRID_DATA",contentme.value.OrderLineItems)
provide("changeBaseObject",(mObject:IOrder) => {
    contentme.value = mObject;
})
provide("actionTriggers",[
    {
        name:"OnInvoiceEditClick",
        action:()=>{
            controlVariables.value.ShiftPopUp = true;
            console.log("acted")
        }
    },
    {
        name:"OnOrderNewClick",
        action:()=>{
            //alert("new click")
            contentme.value =new Order()
            reset();
        }
    },
    {
        name:"OnOrderLocationChanged",
        action:(data:any)=>{
            //alert("hhikis")
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
            //alert("hooo")
        }
    },
    {
        name:"OnOrderRepChanged",
        action:(data:any)=>{
            //alert("New Order Clicked!")
        }
    },
    {
        name:"OnPayementTermChanged",
        action:(data:any)=>{
            //alert("yahooo")
        }
    },
    {
        name:"OnTransactionItemChange",
        action:(data:any)=>{
            //
        }
    },{
        name:"OnAddItemButtonClick",
        action:() => {
            contentme.value.OrderLineItems = contentme.value.OrderLineItems.concat(new OrderItem())
            console.log(contentme.value.OrderLineItems)
        }
    }
])

const reset= ()=> {
    formRef.value.resetForm()
}

const save=()=>{

}
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