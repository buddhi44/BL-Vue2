<script setup lang="ts">
import { inject,ref } from 'vue';
import UIBuilder from '../UIBuilder.vue';
const props = defineProps(["Parent","ComponentList"])
//console.log(props.ComponentList)
var res = props.ComponentList.find((itm:any)=>{
    return itm.elementKey == props.Parent;
})

var IElement = ref<any>(res);

var con : any = inject("controls")

console.log(res)
</script>

<template>
    <v-dialog v-model="con[IElement._internalElementName]" width="500">
        <v-card>
            <v-card-title>{{ IElement.elementCaption }}</v-card-title>
            <v-card-text>
                <UIBuilder :Parent="Parent" :ContentList="ComponentList" />
            </v-card-text>
        </v-card>
    </v-dialog>
</template>

<style></style>