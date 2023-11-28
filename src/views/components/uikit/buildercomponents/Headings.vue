<script setup lang="ts">
const props = defineProps(["UiElement"])
</script>

<template>
    <h1 v-if="UiElement.elementType == 'Heading1'">{{ UiElement.elementCaption }}</h1>
    <h2 v-if="UiElement.elementType == 'Heading2'">{{ UiElement.elementCaption }}</h2>
    <h3 v-if="UiElement.elementType == 'Heading3'">{{ UiElement.elementCaption }}</h3>
    <h4 v-if="UiElement.elementType == 'Heading4'">{{ UiElement.elementCaption }}</h4>
    <h5 v-if="UiElement.elementType == 'Heading5'">{{ UiElement.elementCaption }}</h5>
    <h6 v-if="UiElement.elementType == 'Heading6'">{{ UiElement.elementCaption }}</h6>
</template>