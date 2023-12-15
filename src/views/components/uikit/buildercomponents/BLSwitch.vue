<script setup lang="ts">
import {inject} from 'vue'
const props = defineProps(["UiElement"])
var basecontent : any = inject("baseObject");

basecontent[props.UiElement.defaultAccessPath] = props.UiElement.defaultValue ? props.UiElement.defaultValue : false;

//console.log(props.UiElement)
</script>

<template>
    <v-switch
    hide-details
    inset
    v-model="basecontent[props.UiElement.defaultAccessPath]"
    :label="UiElement.elementCaption"
  ></v-switch>
</template>