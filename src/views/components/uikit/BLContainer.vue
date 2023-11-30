<script setup lang="ts">
const props = defineProps(["isGrid","width"])

</script>

<template>
    <v-col v-if="isGrid" :cols="width">
        <slot></slot>
    </v-col>
    <template v-if="!isGrid">
        <slot></slot>
    </template>
</template>

<style></style>