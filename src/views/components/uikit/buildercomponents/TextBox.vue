<script setup>
import { watch } from 'vue';

const props = defineProps(['UiElement'])

</script>

<template>
    <v-text-field :label="UiElement.elementCaption" ></v-text-field>
</template>

<style></style>