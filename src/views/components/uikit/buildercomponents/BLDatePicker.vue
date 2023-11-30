<script setup lang="ts">
import {inject} from 'vue'
import BLContainer from '../BLContainer.vue'
var props = defineProps(["UiElement","isGrid"])

var basecontent : any = inject("baseObject");
var action = inject("changeBaseObject")

console.log(props.UiElement)
console.log(basecontent[props.UiElement.defaultAccessPath])

</script>

<template>
    <BLContainer :is-grid="isGrid" :width="UiElement.width" v-if="UiElement.isVisible">
        <v-text-field v-model="basecontent[UiElement.defaultAccessPath]" :label="UiElement.elementCaption" type="date" ></v-text-field>
    </BLContainer>
</template>