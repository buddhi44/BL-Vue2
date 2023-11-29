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
const objectKey = route.query.ObjectKey

const uiContent = ref<any>(undefined)
const formElement = ref<any>(undefined)

onMounted(async ()=>{
    //await LoadFormDefinition()
})

// watch([route.params,route.query],async ()=>{
//     await LoadFormDefinition()
// })

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

</script>

<template>
    <h4 v-if="formElement != undefined">{{ formElement.elementCaption }}</h4>
    <UIBuilder :Parent="objectKey" v-if="uiContent != undefined" :ContentList="uiContent" />
</template>