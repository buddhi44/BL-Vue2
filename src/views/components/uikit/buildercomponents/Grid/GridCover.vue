<script setup lang="ts">
import {ref} from 'vue'
import UIBuilder from '../../UIBuilder.vue'
const props = defineProps(["Parent","ComponentList"])


const headerList = ref<any[]>([])

if(props.Parent != undefined && props.ComponentList != undefined){
    var headerList2 = []
    var childListm = props.ComponentList.filter((item)=>{
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
    ></v-data-table>
    <!-- <UIBuilder :Parent="Parent" :ContentList="ComponentList" /> -->
</template>