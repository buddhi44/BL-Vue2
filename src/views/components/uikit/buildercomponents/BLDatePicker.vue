<script setup lang="ts">
import BLContainer from '../BLContainer.vue'
defineProps(["UiElement","isGrid"])
</script>

<template>
    <BLContainer :is-grid="isGrid" :width="UiElement.width" v-if="UiElement.isVisible">
        <v-text-field :label="UiElement.elementCaption" type="date" ></v-text-field>
    </BLContainer>
</template>