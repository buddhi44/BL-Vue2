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
        case "fa-solid fa-envelope":
            myicon.value = "mdi-email"
            break;
        case "fa-solid fa-print":
            myicon.value = "mdi-printer"
            break;
        case "fa-regular fa-circle-left":
            myicon.value = "mdi-arrow-left-bold-circle"
            break;
        case "fa-solid fa-ban":
            myicon.value = "mdi-file-cancel"
            break;
        case "fa-solid fa-dollar-sign":
            myicon.value = "mdi-currency-usd"
            break;
        case "fa-solid fa-money-check":
            myicon.value = "mdi-cash-check"
            break;
        case "fa-solid fa-table-list":
            myicon.value = "mdi-format-list-bulleted-square"
            break;
        case "fa-solid fa-right-from-bracket":
            myicon.value = "mdi-arrow-right-top-bold"
            break;
        case "fa-solid fa-right-to-bracket":
            myicon.value = "mdi-arrow-u-right-top-bold"
            break;
        case "fa-solid fa-magnifying-glass":
            myicon.value = "mdi-magnify"
            break;
        case "fa-solid fa-file":
            myicon.value = "mdi-file"
            break;
        case "fa-solid fa-pen":
            myicon.value = "mdi-pen"
            break;
        case "fa-solid fa-floppy-disk":
            myicon.value = "mdi-harddisk"
            break;
        default:
            //console.log(props.UiElement)
            break;
    }
    props.UiElement.elementCaption = undefined
}
onMounted(()=>{
    
})

</script>

<template>
    <v-btn v-if="myicon != undefined" size="small" variant="outlined" color="primary" :icon="myicon"></v-btn>
    <v-btn v-if="myicon == undefined">{{ UiElement.elementCaption }}</v-btn>
</template>

<style></style>