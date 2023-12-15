<script setup lang="ts">
import {ref,onMounted,inject} from 'vue'
const props = defineProps(["UiElement"])

const myicon = ref<string | undefined>(undefined)
const myCaption = ref<string>("")

//console.log(props.UiElement)
//console.log(props.actionTriggers)
const actionTriggers2 : any[] | undefined = inject("actionTriggers");

function LaunchOnClickAction(){
    console.log(props.UiElement.onClickAction)
   if(actionTriggers2 != undefined){
        var functions = actionTriggers2.filter((item:any)=>{
            return item.name == props.UiElement.onClickAction
        })
        functions[0].action();
   }
}

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
        case "fa-brands fa-get-pocket":
            myicon.value = "mdi-pocket"
            break;
        case "TwoTone.QrCodeScanner":
            myicon.value = "mdi-qrcode-scan"
            break;
        default:
            //console.log(props.UiElement.iconCss)
            break;
    }
    myCaption.value = props.UiElement.elementCaption;
    props.UiElement.elementCaption = undefined
}else{
    //console.log(props.UiElement)
}
onMounted(()=>{
})

</script>

<template>
    <v-tooltip :text="myCaption" >
        <template v-slot:activator="{props}">
            <v-btn :onclick="() => LaunchOnClickAction()" v-bind="props" color="primary" size="large" flat :class="`${props.UiElement?.cssClass} mx-2`">{{ myCaption }}</v-btn>
        </template>
    </v-tooltip>
</template>

<style></style>