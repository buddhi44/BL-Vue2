<script setup lang="ts">
import {useRoute} from 'vue-router'
import {onMounted,watch,ref} from 'vue'
//import type BLUIElement from '../../core/domain/BLUIElement'
import { fetchWrapper } from '@/managers/helper/fetch_wrapper'
import {TokenEndPoint} from '@/router/token_endpoint'
import type ObjectFormRequest from '@/core/domain/ObjectFormRequest'
import UIBuilder from '@/views/components/uikit/UIBuilder.vue'

const route = useRoute();

const controller = route.params.UrlController;
const action = route.params.UrlAction
const objectKey = route.query.ElementKey

const uiContent = ref<any>(undefined)
const formElement = ref<any>(undefined)

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

const CallableFunctions = ref<any[]>([
    {
        name:"OnInvoiceEditClick",
        action:()=>{
            alert("Edit Button Clicked!")
        }
    },
    {
        name:"OnOrderNewClick",
        action:()=>{
            alert("New Order Clicked!")
        }
    }
])

</script>

<template>
    <v-card elevation="10" class="pa-3" style="width:100%;height:calc(100vh - 140px);background-color: #dbeded;overflow-y:scroll">
        <div class="ma-2">
            <h3 v-if="formElement != null || formElement != undefined">{{ formElement.elementCaption }}</h3>
            <UIBuilder :actionTriggers="CallableFunctions" :Parent="objectKey" v-if="uiContent != undefined" :ContentList="uiContent" />
        </div>
    </v-card>
</template>