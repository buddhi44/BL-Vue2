<script setup lang="ts">
defineProps(["UiElement"])
</script>

<template>
    <v-text-field :label="UiElement.elementCaption" type="date" ></v-text-field>
</template>