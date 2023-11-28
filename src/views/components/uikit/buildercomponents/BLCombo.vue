<script setup lang="ts">
defineProps(["UiElement"])
</script>

<template>
    <v-autocomplete :label="UiElement.elementCaption" variant="outlined"></v-autocomplete>
</template>