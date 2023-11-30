<script setup lang="ts">
import BLContainer from '../BLContainer.vue';

defineProps(["UiElement","isGrid"])
</script>

<template>
    <b-l-container :is-grid="isGrid" :width="UiElement.width" v-if="UiElement.isVisible" >
        <v-autocomplete :label="UiElement.elementCaption" variant="outlined"></v-autocomplete>
    </b-l-container>
</template>