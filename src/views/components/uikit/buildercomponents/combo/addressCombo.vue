<script setup lang="ts">
import {ref,inject,watchEffect,onMounted} from 'vue'
import BLContainer from '../../BLContainer.vue';
import { fetchWrapper } from '@/managers/helper/fetch_wrapper'
import base_end_point from '@/router/base_end_point';
import Vuetify from 'vuetify';
import { AddressResponse } from '@/core/domain/Entities/Base/addressResponse';


const props = defineProps(["UiElement","isGrid"])

var addressResponses = ref<AddressResponse[]>([])
var selectedDataItem = ref<AddressResponse>()
var basecontent : any = inject("baseObject");
var css_class=ref<any>();
var isEditable=ref<boolean>(true)
var searchInput = ref<string>();
var minLengthTerm =ref<number>(3) ;
var moviesLoading =ref<boolean>(false) ;

const actionTriggers2 : any[] | undefined = inject("actionTriggers");
onMounted(async()=>{
    selectedDataItem== ref<AddressResponse>()
    css_class.value=props.UiElement.isVisible?props.UiElement?.cssClass:"d-none"
    css_class.value=css_class.value+ (props.UiElement.isMust?" required":"")
    console.log("css",css_class.value)

    await fetchComboData();

})

watchEffect(()=>{
    
})

watchEffect(()=>{
    var dts : string[] = []
    if(props.UiElement.defaultAccessPath != null){
        dts = props.UiElement.defaultAccessPath.split(".");
        if(dts.length == 1){
            basecontent[dts[0]] = addressResponses.value.find((item:AddressResponse)=>{
                return item == selectedDataItem.value
            })
        }else if(dts.length == 2){
            basecontent[dts[0]][dts[1]] = selectedDataItem.value
        }else if(dts.length == 3){
            basecontent[dts[0]][dts[1]][dts[2]] = selectedDataItem.value
        }
    }
    console.log(basecontent)
})


const OnValueChanged=(e:AddressResponse)=>{
    var xx = addressResponses.value.find((item)=>{
        return item == e
    })
    LaunchOnClickAction(xx as AddressResponse)
}
const LaunchOnClickAction=(data : AddressResponse)=>{
   if(actionTriggers2 != undefined){
        var functions = actionTriggers2.filter((item:any)=>{
            return item.name == props.UiElement.onClickAction
        })
        functions[0].action(data);
   }
}


const fetchComboData=async(searchText='')=> {
     var content = await fetchWrapper.post(`${base_end_point()}${props.UiElement.urlController}/${props.UiElement.urlAction}`,{
        RequestingElementKey : props.UiElement.elementKey,
        SearchQuery:searchText,

    });
    addressResponses.value=content

}



</script>

<template>
    <b-l-container :is-grid="isGrid" :width="UiElement.width" v-if="UiElement.isVisible" >
        <v-autocomplete v-model="selectedDataItem" 
                        @update:model-value="OnValueChanged" 
                        :items="addressResponses" 
                        item-key="addressKey"
                        item-title="addressName" 
                        :label="UiElement.elementCaption" 
                        variant="outlined"
                        :disabled="!isEditable"
                        :class="css_class" return-object></v-autocomplete>
    </b-l-container>
</template>