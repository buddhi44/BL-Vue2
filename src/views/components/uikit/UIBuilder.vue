<script setup lang="ts">
import {ref,onMounted} from 'vue'
import SectionFormatGroup from '@/views/components/uikit/buildercomponents/SectionFormatGroup.vue'
import PopupWindow from '@/views/components/uikit/buildercomponents/PopupWindow.vue'
import TextBox from '@/views/components/uikit/buildercomponents/TextBox.vue'
import ButtonGroup from '@/views/components/uikit/buildercomponents/ButtonGroup.vue'
import BLButton from '@/views/components/uikit/buildercomponents/Button.vue'
import Headings from '@/views/components/uikit/buildercomponents/Headings.vue'
import BLDatePicker from '@/views/components/uikit/buildercomponents/BLDatePicker.vue'
import BLCombo from '@/views/components/uikit/buildercomponents/BLCombo.vue'
import BLSwitch from '@/views/components/uikit/buildercomponents/BLSwitch.vue'
import GridCover from '@/views/components/uikit/buildercomponents/Grid/GridCover.vue'
const props = defineProps(["ContentList","Parent","isGrid"])


const myComponents = ref<any>(undefined);
let formObject= ref<any>({});
onMounted(()=>{
    // myComponents.value = props.ContentList.filter((item:any)=>{
    //     return item.parentKey == props.Parent
    // })

    myComponents.value =filterComponentsByParent(props.ContentList, props.Parent)
    console.log("myComponents",myComponents.value )
})

function filterComponentsByParent(components: any, parentKey: number ): any {

    return components.filter((item:any)=>{
        return item.parentKey == parentKey
    }).map((item:any) => {
        const filteredChildren = filterComponentsByParent(components, item.elementKey);
        if (filteredChildren.length > 0) 
        {
            item.children = filteredChildren;
        }
        return item;
    });
}


//http://localhost:5173/form/transaction/createtransaction?ObjectKey=176046
</script>




<template>
    <template  v-for="com in myComponents">
        
            <SectionFormatGroup  v-if="com.elementType == 'SectnFrmtGrp'" :Parent="com.elementKey" :ComponentList="ContentList" />
            <PopupWindow v-if="com.elementType == 'PopUpWindow'" :Parent="com.elementKey" :ComponentList="ContentList"/>
            <TextBox :isGrid="isGrid" :UiElement="com" v-if="com.elementType == 'TextBox' || com.elementType == 'NumericBox' || com.elementType == 'TelNumericBox'" />
            <ButtonGroup   v-if="com.elementType == 'ButtonGroup'"  :Parent="com.elementKey" :UiElement="com" />
            <BLButton  :UiElement="com" v-if="com.elementType == 'Button'" />
            <BLDatePicker :isGrid="isGrid" :UiElement="com" v-if="com.elementType == 'DatePicker'" />
            <BLCombo :is-grid="isGrid" :UiElement="com" v-if="com.elementType == 'Cmb'" />
            <BLSwitch :UiElement="com" v-if="com.elementType == 'Switch' || com.elementType == 'MultiRadio'" />
            <GridCover v-if="com.elementType == 'Grid'" :Parent="com.elementKey" :ComponentList="ContentList" />
            <Headings :UiElement="com" v-if="com.elementType == 'Heading6' || com.elementType == 'Heading5' || com.elementType == 'Heading4' || com.elementType == 'Heading3' || com.elementType == 'Heading2' || com.elementType == 'Heading1'" />
            <div v-if="com.elementType != 'Grid' && com.elementType != 'CalcTmpl' && com.elementType != 'ImageBox' && com.elementType != 'Switch' && com.elementType != 'Cmb' && com.elementType != 'DatePicker' && com.elementType != 'Button' && com.elementType != 'ButtonGroup' && com.elementType != 'TextBox' && com.elementType != 'NumericBox' && com.elementType != 'SectnFrmtGrp' && com.elementType != 'PopUpWindow' && com.elementType != 'ReportWeb' && com.elementType != 'FormGroup'">
            
            <div v-if="com.elementType != 'Heading6' && com.elementType != 'MultiRadio' && com.elementType != 'Label' && com.elementType != 'Heading5' && com.elementType != 'TelNumericBox' && com.elementType != 'Heading4' && com.elementType != 'Heading3' && com.elementType != 'Heading2' && com.elementType != 'Heading1'">
                {{ com }}
            </div>
            
            </div>
    </template>
</template>

<style></style>


<!-- Report web,Grid,Image Box,Label,CalcTmpl and Form Group Not yet Constructed! -->