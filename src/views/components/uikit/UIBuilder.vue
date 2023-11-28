<script setup lang="ts">
import {ref,onMounted} from 'vue'
import SectionFormatGroup from '@/views/components/uikit/buildercomponents/SectionFormatGroup.vue'
import PopupWindow from '@/views/components/uikit/buildercomponents/PopupWindow.vue'
import TextBox from '@/views/components/uikit/buildercomponents/TextBox.vue'
import ButtonGroup from '@/views/components/uikit/buildercomponents/ButtonGroup.vue'
import BButton from '@/views/components/uikit/buildercomponents/Button.vue'
import Headings from '@/views/components/uikit/buildercomponents/Headings.vue'
import BLDatePicker from '@/views/components/uikit/buildercomponents/BLDatePicker.vue'
import BLCombo from '@/views/components/uikit/buildercomponents/BLCombo.vue'
import BLSwitch from '@/views/components/uikit/buildercomponents/BLSwitch.vue'
const props = defineProps(["ContentList","Parent"])

const myComponents = ref<any>(undefined);

onMounted(()=>{
    myComponents.value = props.ContentList.filter((item:any)=>{
        return item.parentKey == props.Parent
    })
})
//http://localhost:5173/form/transaction/createtransaction?ObjectKey=176046
</script>

<template>
    <div v-for="com in myComponents">
        <SectionFormatGroup v-if="com.elementType == 'SectnFrmtGrp'" :Parent="com.elementKey" :ComponentList="ContentList" />
        <PopupWindow v-if="com.elementType == 'PopUpWindow'"/>
        <TextBox :UiElement="com" v-if="com.elementType == 'TextBox' || com.elementType == 'NumericBox'" />
        <ButtonGroup  v-if="com.elementType == 'ButtonGroup'"  :Parent="com.elementKey" :ComponentList="ContentList" />
        <BButton :UiElement="com" v-if="com.elementType == 'Button'" />
        <BLDatePicker :UiElement="com" v-if="com.elementType == 'DatePicker'" />
        <BLCombo :UiElement="com" v-if="com.elementType == 'Cmb'" />
        <BLCombo :UiElement="com" v-if="com.elementType == 'Switch'" />
        <Headings :UiElement="com" v-if="com.elementType == 'Heading6' || com.elementType == 'Heading5' || com.elementType == 'Heading4' || com.elementType == 'Heading3' || com.elementType == 'Heading2' || com.elementType == 'Heading1'" />
        <div v-if="com.elementType != 'Grid' && com.elementType != 'CalcTmpl' && com.elementType != 'ImageBox' && com.elementType != 'Switch' && com.elementType != 'Cmb' && com.elementType != 'DatePicker' && com.elementType != 'Button' && com.elementType != 'ButtonGroup' && com.elementType != 'TextBox' && com.elementType != 'NumericBox' && com.elementType != 'SectnFrmtGrp' && com.elementType != 'PopUpWindow' && com.elementType != 'ReportWeb' && com.elementType != 'FormGroup'">
        <!-- Report web,Grid,Image Box,Label,CalcTmpl and Form Group Not yet Constructed! -->
        <div v-if="com.elementType != 'Heading6' && com.elementType != 'Label' && com.elementType != 'Heading5' && com.elementType != 'Heading4' && com.elementType != 'Heading3' && com.elementType != 'Heading2' && com.elementType != 'Heading1'">
            {{ com }}
        </div>
        
        </div>
    </div>
</template>

<style></style>