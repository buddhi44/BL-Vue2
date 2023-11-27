<script setup lang="ts">
import {ref,onMounted} from 'vue'
const props = defineProps(["UiElement"])

const myicon = ref<string>(undefined)

if(props.UiElement.iconCss != null || props.UiElement.iconCss != undefined || props.UiElement.iconCss != ""){
    switch (props.UiElement.iconCss) {
        case "fa-solid fa-user-plus":
            myicon.value = "mdi-account-plus"
            break;
        case "fa-solid fa-file-export":
            myicon.value = "mdi-file-replace"
            break;
        case "fa-solid fa-retweet":
            myicon.value = "mdi-keyboard-return"
            break;
        case "fa-solid fa-hand":
            myicon.value = "mdi-hand-back-left"
            break;
        case "fa-solid fa-refresh":
            myicon.value = "mdi-refresh-circle"
            break;
        case "fa-solid fa-scroll":
            myicon.value = "mdi-script"
            break;
        case "fa-solid fa-power-off":
            myicon.value = "mdi-close-octagon-outline"
            break;
        case "fa-solid fa-share-from-square":
            myicon.value = "mdi-share-circle"
            break;
        default:
            console.log(props.UiElement.iconCss)
            break;
    }
    props.UiElement.elementCaption = undefined
}
onMounted(()=>{
    
})

</script>

<template>
    <v-btn v-if="myicon != undefined" :icon="myicon"></v-btn>
    <v-btn v-if="myicon == undefined">{{ UiElement.elementCaption }}</v-btn>
</template>

<style></style>