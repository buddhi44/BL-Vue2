<script setup lang="ts">
import {ref,inject,watchEffect,onMounted} from 'vue'
import BLContainer from '../BLContainer.vue';
import { fetchWrapper } from '@/managers/helper/fetch_wrapper'
import base_end_point from '@/router/base_end_point';
import type {KeyValuePairs} from '@/core/domain/Entities/KeyValuePairs'
import Vuetify from 'vuetify';

const props = defineProps(["UiElement","isGrid"])

const kvPairs = ref<KeyValuePairs[]>([])
const selectedPair = ref<KeyValuePairs>()
var basecontent : any = inject("baseObject");
var css_class=ref<any>();
var isEditable=ref<boolean>(true)

onMounted(()=>{
    selectedPair== ref<KeyValuePairs>()
    css_class.value=props.UiElement.isVisible?props.UiElement?.cssClass:"d-none"
    css_class.value=css_class.value+ (props.UiElement.isMust?" required":"")
    console.log("css",css_class.value)

    getData()
})

watchEffect(()=>{
    
})

watchEffect(()=>{
    var dts : string[] = []
    if(props.UiElement.defaultAccessPath != null){
        dts = props.UiElement.defaultAccessPath.split(".");
        if(dts.length == 1){
            basecontent[dts[0]] = kvPairs.value.find((item:any)=>{
                return item.value == selectedPair.value
            })
        }else if(dts.length == 2){
            basecontent[dts[0]][dts[1]] = selectedPair.value
        }else if(dts.length == 3){
            basecontent[dts[0]][dts[1]][dts[2]] = selectedPair.value
        }
    }
    //console.log(basecontent)
})


//console.log(kvPairs)
const OnValueChanged=(e:any)=>{
    var xx = kvPairs.value.find((item)=>{
        return item.value == e
    })
    LaunchOnClickAction(xx)
}

const actionTriggers2 : any[] | undefined = inject("actionTriggers");

const LaunchOnClickAction=(data : any)=>{
   if(actionTriggers2 != undefined){
        var functions = actionTriggers2.filter((item:any)=>{
            return item.name == props.UiElement.onClickAction
        })
        functions[0].action(data);
   }
}

const getData=async (searchText="")=>{
    var content = await fetchWrapper.post(`${base_end_point()}${props.UiElement.urlController}/${props.UiElement.urlAction}`,{
        RequestingElementKey : props.UiElement.elementKey,
        SearchQuery:searchText,

    })

    var lp:KeyValuePairs[] = [];
    switch(props.UiElement.elementID){
        case "CodeBase":
            for(var c of content){
                lp = lp.concat({
                    value:c.codeKey,
                    name:c.codeName
                })
            }
            kvPairs.value = lp
            break;
        case "Address":
            //var lp:any[] = [];
            for(var c of content){
                lp = lp.concat({
                    value:c.addressKey,
                    name:c.addressName
                })
            }
            kvPairs.value = lp
            break;
        case "Account":
            //var lp:any[] = [];
            for(var c of content){
                lp = lp.concat({
                    value:c.accountKey,
                    name:c.accountName
                })
            }
            kvPairs.value = lp
            break;
        case "Unit":
            //var lp:any[] = [];
            for(var c of content){
                lp = lp.concat({
                    value:c.unitKey,
                    name:c.unitName
                })
            }
            kvPairs.value = lp
            break;
        case "Item":
            //var lp:any[] = [];
            for(var c of content){
                lp = lp.concat({
                    value:c.itemKey,
                    name:c.itemName
                })
            }
            kvPairs.value = lp
            break;
    }
    var selection = lp.filter((content)=>{
        return props.UiElement.defaultValue == content.value
        
    })[0]
    selectedPair.value = selection
    // var dts : string[] = []
    // if(props.UiElement.defaultAccessPath != null){
    //     dts = props.UiElement.defaultAccessPath.split(".");
    //     if(dts.length == 1){
    //         basecontent[dts[0]] = selectedPair.value
    //     }else if(dts.length == 2){
    //         basecontent[dts[0]][dts[1]] = sele
    //     }else if(dts.length == 3){
    //         basecontent[dts[0]][dts[1]][dts[2]]
    //     }
    // }
    //console.log(basecontent[props.UiElement.defaultAccessPath])
}

const customFilter= (itemTitle:string, queryText:string, item:any) =>{

        let combo_item_list:KeyValuePairs[]=[]
        let combo_item_name:string = item.raw.name.toLowerCase()

        if (queryText === null || queryText === undefined || queryText.trim() === '') 
        {
            getData();
            combo_item_list= kvPairs.value;
        } 
        else {

        let searchText = queryText.toLowerCase()
        if (props.UiElement?.isServerFiltering) {
            getData(searchText);
        }
        combo_item_list= kvPairs.value.filter((x:any) => x.name !== null && x.name.includes(queryText.toLowerCase()));

        return combo_item_name.indexOf(searchText) > -1 
    }
}

</script>

<template>
    <b-l-container :is-grid="isGrid" :width="UiElement.width" v-if="UiElement.isVisible" >
        <v-autocomplete v-model="selectedPair" 
                        @update:model-value="OnValueChanged" 
                        :items="kvPairs" 
                        item-title="name" 
                        :label="UiElement.elementCaption" 
                        variant="outlined"
                        :disabled="!isEditable"
                        :class="css_class"></v-autocomplete>
    </b-l-container>
</template>