<script setup lang="ts">
const props = defineProps(["UiElement"])
console.log(props.UiElement)
</script>

<template>
    <v-switch
    hide-details
    inset
    :label="UiElement.elementCaption"
  ></v-switch>
</template>