<script setup lang="ts">
import BLToolButton from './BLToolButton.vue'
import BLButton from './Button.vue'
const props = defineProps(["Parent","UiElement"])

//console.log("button",props.UiElement)
</script>

<template>
    <div class="d-flex gap-3 align-center flex-column flex-wrap flex-xl-nowrap flex-sm-row fill-height">
        <div v-for="com in props.UiElement.children">
            <div v-if="com.elementType == 'Button'">
                <BLToolButton v-if="com.iconCss !=null && com.iconCss !=''" :UiElement="com"/>
                <BLButton v-else :UiElement="com"/>
            </div>
            
        </div>
        
    </div>
</template>

<style></style>