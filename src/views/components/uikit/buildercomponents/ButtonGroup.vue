<script setup lang="ts">
import UIBuilder from '../UIBuilder.vue'
const props = defineProps(["Parent","ComponentList","actionTriggers"])
</script>

<template>
    <div class="d-flex d-flex-inline flex-wrap ga-2 ma-2 px-3" >
        <UIBuilder :actionTriggers="actionTriggers" :ContentList="ComponentList" :Parent="Parent"/>
    </div>
</template>

<style></style>