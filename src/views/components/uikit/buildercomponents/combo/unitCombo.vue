<script  lang="ts">
import {ref,inject,watchEffect,onMounted} from 'vue'
import BLContainer from '../../BLContainer.vue';
import { fetchWrapper } from '@/managers/helper/fetch_wrapper'
import base_end_point from '@/router/base_end_point';
import { UnitResponse } from '@/core/domain/Entities/Base/unitResponse';
import { UnitComboRequest } from '@/core/domain/Entities/Base/comboRequest';
import { Component, Vue, toNative,Prop,Inject,Watch } from 'vue-facing-decorator'
import type { IUIDefinition } from '@/core/domain/interfaces/IBLUIOperationHelper';
import type { BLUIElement } from '@/core/domain/BLUIElement';

@Component
class unitCombo extends Vue implements IUIDefinition
{
    uiObject!: BLUIElement 
    @Prop()
    public UiElement?:any
    @Prop()
    public isGrid?:any
    unitResponses:UnitResponse[] = [] 
    selectedDataItem = new UnitResponse()
    css_class:string=''
    isEditable:boolean=true
    comboRequest:UnitComboRequest=new UnitComboRequest()
    @Inject
    public baseObject!: any

    @Inject
    public actionTriggers!:  any[] | undefined

    mounted(){
        async ()=>{
            this.selectedDataItem=new UnitResponse()
            this.css_class=this.UiElement.isVisible?this.UiElement?.cssClass:"d-none"
            this.css_class=this.css_class+ (this.UiElement.isMust?" required":"")
            console.log("css",this.css_class)
            this.comboRequest.requestingElementKey=this.UiElement.elementKey

            await this.fetchComboData();
        }
        
    }

OnValueChanged=(e:UnitResponse)=>{
    var xx = this.unitResponses.find((item)=>{
        return item == e
    })
    this.LaunchOnClickAction(xx as UnitResponse)
 }
LaunchOnClickAction=(data : UnitResponse)=>{
   if(this.actionTriggers != undefined){
        var functions = this.actionTriggers.filter((item:any)=>{
            return item.name == this.UiElement.onClickAction
        })
        functions[0].action(data);
   }
}


fetchComboData=async(searchText='')=> {
    this.comboRequest.searchQuery=searchText
    this.OnBeforeUnitRead(this.comboRequest);
     var content = await fetchWrapper.post(`${base_end_point()}${this.UiElement.urlController}/${this.UiElement.urlAction}`,this.comboRequest);
    this.unitResponses=content

}

OnBeforeUnitRead=(data : UnitComboRequest)=> 
{
    if(this.actionTriggers != undefined && (this.UiElement._internalElementName!= null||this.UiElement._internalElementName!= undefined)){
        var onBeforeFunctions =this.actionTriggers.filter((item:any)=>{
            return item.name == this.UiElement._internalElementName+"_OnBeforeDataFetch"
        })
        onBeforeFunctions[0].action(data);
   }

}

Disable(): void {
    throw new Error('Method not implemented.');
}
Enable(): void {
    throw new Error('Method not implemented.');
}
Reload(): void {
    throw new Error('Method not implemented.');
}

// @Watch("baseObject", { immediate: true })

// propertyWatcher(newValue: any, oldValue: any) {
//         var dts : string[] = []
//         if(this.UiElement.defaultAccessPath != null){
//             dts = this.UiElement.defaultAccessPath.split(".");
//             if(dts.length == 1){
//                 newValue[dts[0]] = this.unitResponses.find((item:UnitResponse)=>{
//                     return item == this.selectedDataItem
//                 })
//             }else if(dts.length == 2){
//                 newValue[dts[0]][dts[1]] = this.selectedDataItem
//             }else if(dts.length == 3){
//                 newValue[dts[0]][dts[1]][dts[2]] = this.selectedDataItem
//             }
//         }
//     }

}

export default toNative(unitCombo)


</script>



<template>
    <b-l-container :is-grid="isGrid" :width="UiElement.width" v-if="UiElement.isVisible" >
        <v-autocomplete v-model="selectedDataItem" 
                        @update:model-value="OnValueChanged" 
                        :items="unitResponses" 
                        item-key="unitKey"
                        item-title="unitName" 
                        :label="UiElement.elementCaption" 
                        variant="outlined"
                        :disabled="!isEditable"
                        :class="css_class" return-object></v-autocomplete>
    </b-l-container>
</template>