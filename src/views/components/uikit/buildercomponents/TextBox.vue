<script setup lang="ts">
import { watch,inject } from 'vue';
import BLContainer from '../BLContainer.vue'

const props = defineProps(['UiElement','isGrid'])
var basecontent : any = inject("baseObject");

basecontent[props.UiElement.defaultAccessPath] = props.UiElement.defaultValue;

//console.log(props.UiElement)
</script>

<template>
    <BLContainer :isGrid="isGrid" :width="UiElement.width" v-if="UiElement.isVisible">
        <v-text-field v-model="basecontent[UiElement.defaultAccessPath]" :label="UiElement.elementCaption" ></v-text-field>
    </BLContainer>
</template>

<style></style>