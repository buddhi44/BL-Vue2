<script setup lang="ts">
import {inject,ref,watch,watchEffect,onMounted} from 'vue'
import BLContainer from '../BLContainer.vue'
import { useDate } from 'vuetify';

var dateAdapter = useDate();
var props = defineProps(["UiElement","isGrid"])

var basecontent : any = inject("baseObject");
var action = inject("changeBaseObject")
const showDateSelector = ref(false)
var dateMdl = ref<string>("")
var css_class=ref<any>();

onMounted(()=>{

    css_class.value=props.UiElement.isVisible?props.UiElement?.cssClass:"d-none"
    css_class.value=css_class.value+ (props.UiElement.isMust?" required":"")
    console.log("css",css_class.value)
})

// console.log(props.UiElement)
// console.log(basecontent[props.UiElement.defaultAccessPath])

watchEffect(()=>{
    dateMdl.value = dateAdapter.format(basecontent[props.UiElement.defaultAccessPath],"keyboardDate")
})

</script>

<template>
    <BLContainer :is-grid="isGrid" :width="UiElement.width" v-if="UiElement.isVisible">
        <v-text-field v-model="dateMdl" :label="UiElement.elementCaption" @click="showDateSelector = !showDateSelector" :readonly="true"></v-text-field>
        <v-dialog v-model="showDateSelector" width="300">
            <v-date-picker v-model="basecontent[UiElement.defaultAccessPath]" :class="css_class"></v-date-picker>
        </v-dialog>
    </BLContainer>
</template>