<script setup lang="ts">
import {ref} from 'vue'
import BLContainer from '../BLContainer.vue';
import { fetchWrapper } from '@/managers/helper/fetch_wrapper'
import base_end_point from '@/router/base_end_point';

const props = defineProps(["UiElement","isGrid"])

const kvPairs = ref<any[]>([])

getData()

async function getData(){
    var content = await fetchWrapper.post(`${base_end_point()}${props.UiElement.urlController}/${props.UiElement.urlAction}`,{
        RequestingElementKey : props.UiElement.elementKey
    })
    switch(props.UiElement.elementID){
        case "CodeBase":
            var lp:any[] = [];
            for(var c of content){
                lp = lp.concat({
                    val:c.codeKey,
                    name:c.codeName
                })
            }
            kvPairs.value = lp
            break;
        case "Address":
            var lp:any[] = [];
            for(var c of content){
                lp = lp.concat({
                    val:c.addressKey,
                    name:c.addressName
                })
            }
            kvPairs.value = lp
            break;
        case "Account":
            var lp:any[] = [];
            for(var c of content){
                lp = lp.concat({
                    val:c.accountKey,
                    name:c.accountName
                })
            }
            kvPairs.value = lp
            break;
        case "Unit":
            var lp:any[] = [];
            for(var c of content){
                lp = lp.concat({
                    val:c.unitKey,
                    name:c.unitName
                })
            }
            kvPairs.value = lp
            break;
        case "Item":
            var lp:any[] = [];
            for(var c of content){
                lp = lp.concat({
                    val:c.itemKey,
                    name:c.itemName
                })
            }
            kvPairs.value = lp
            break;
    }
}

</script>

<template>
    <b-l-container :is-grid="isGrid" :width="UiElement.width" v-if="UiElement.isVisible" >
        <v-autocomplete :items="kvPairs" item-value="val" item-title="name" :label="UiElement.elementCaption" variant="outlined"></v-autocomplete>
    </b-l-container>
</template>