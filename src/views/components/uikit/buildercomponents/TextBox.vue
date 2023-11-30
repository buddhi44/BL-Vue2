<script setup lang="ts">
import { watch } from 'vue';
import BLContainer from '../BLContainer.vue'

const props = defineProps(['UiElement','isGrid'])

</script>

<template>
    <BLContainer :isGrid="isGrid" :width="UiElement.width" v-if="UiElement.isVisible">
        <v-text-field :label="UiElement.elementCaption" ></v-text-field>
    </BLContainer>
</template>

<style></style>