<script setup lang="ts">
import { watch,inject,ref,onMounted,computed } from 'vue';
import BLContainer from '../BLContainer.vue'

const props = defineProps(['UiElement','isGrid'])
var basecontent : any = inject("baseObject");
var css_class=ref<any>();
const isEditable=ref<boolean>(true)

onMounted(()=>{
    css_class.value=props.UiElement.isVisible?props.UiElement?.cssClass:"d-none"
    css_class.value=css_class.value+ (props.UiElement.isMust?" required":"")
    console.log("css",css_class.value)
    console.log("text box hit")
})

basecontent[props.UiElement.defaultAccessPath] = props.UiElement.defaultValue;

computed(() => {
    isEditable.value=props.UiElement.isEnable
    console.log("qty disabled")
})

//console.log(props.UiElement)
</script>

<template>
    <BLContainer :isGrid="isGrid" :width="UiElement.width" v-if="UiElement.isVisible">
        <v-text-field v-model="basecontent[UiElement.defaultAccessPath]" 
                      :label="UiElement.elementCaption" 
                      :class="css_class"
                      :disabled="!isEditable"></v-text-field>
    </BLContainer>
</template>

<style></style>