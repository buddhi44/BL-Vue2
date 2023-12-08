<script setup lang="ts">
import {ref} from 'vue'
import UIBuilder from '../../UIBuilder.vue'
import { inject,watchEffect } from 'vue';
const props = defineProps(["Parent","ComponentList"])


const headerList = ref<any[]>([])

var gridData : any[] = ref<any[]>([])

watchEffect(()=>{
    gridData.values = inject("GRID_DATA")
})

if(props.Parent != undefined && props.ComponentList != undefined){
    var headerList2 : any[] = []
    var childListm = props.ComponentList.filter((item : any)=>{
        if(item.parentKey == props.Parent){
            return true
        }else{
            return false;
        }
    })
    for(var ch of childListm){
        headerList2 = headerList2.concat({
            title:ch.elementCaption,
            //align:"",
            sortable:true,
            key:ch.defaultAccessPath
        })
        console.log(ch.defaultAccessPath)
    }
    headerList.value = headerList2;
}else{
    console.log("Nothing")
}

</script>

<template>
    <v-data-table
    v-if="headerList.length > 0"
    :headers="headerList"
    :items="gridData"
    ></v-data-table>
    <!-- <UIBuilder :Parent="Parent" :ContentList="ComponentList" /> -->
</template>