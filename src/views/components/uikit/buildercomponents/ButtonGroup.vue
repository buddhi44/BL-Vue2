<script setup>
import UIBuilder from '../UIBuilder.vue'
const props = defineProps(["Parent","ComponentList"])
</script>

<template>
    <div>
        <h5>Button Group</h5>
        <UIBuilder :ContentList="ComponentList" :Parent="Parent"/>
    </div>
</template>

<style></style>