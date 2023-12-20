<script  lang="ts">
import {ref,inject,watchEffect,onMounted} from 'vue'
import { fetchWrapper } from '@/managers/helper/fetch_wrapper'
import base_end_point from '@/router/base_end_point';
import { UnitResponse } from '@/core/domain/Entities/Base/unitResponse';
import { UnitComboRequest } from '@/core/domain/Entities/Base/comboRequest';
import { Component, Vue, toNative,Prop,Inject,Watch } from 'vue-facing-decorator'
import type { BLUIBuilder,IUIDefinition } from '@/core/domain/interfaces/IBLUIOperationHelper';
import type { BLUIElement } from '@/core/domain/BLUIElement';
import { PropHelper } from '@/helper/propertyHelper';

@Component
class unitCombo extends Vue implements IUIDefinition
{
    uiObject!: BLUIElement 
    @Prop()
    public UiElement!:any
    @Prop()
    public isGrid!:any
    @Prop()
    public Def!:BLUIBuilder

    unitResponses=ref<UnitResponse[]>([]) 
    selectedDataItem = ref<UnitResponse>(new UnitResponse())
    css_class=ref<string>('')
    isEditable=ref<boolean>(true)
    comboRequest=ref<UnitComboRequest>(new UnitComboRequest())
    css !:string

    async mounted(){
            this.uiObject=this.UiElement;
            this.selectedDataItem.value=new UnitResponse()
            this.unitResponses.value=[]
            this.css = this.UiElement.isVisible?this.UiElement.cssClass:"d-none"
            this.css=this.css+ (this.UiElement.isMust?" required":"")
            this.css_class=this.css
            
            if (!this.Def.hasComponent(this)) {
                
                this.Def.ObjectRefs.push(this);
                
            }

            this.comboRequest.requestingElementKey=this.UiElement.elementKey
            if (this.UiElement && this.UiElement.isServerFiltering) {
                this.fetchComboData();
            }
            let MappedItem = this.getUnitResponseByIAccessPath();
            if (this.UiElement && !this.UiElement.isServerFiltering) 
            {
               
                await this.LoadNonServerDataCombo();

                this.SelectDefaultValue(MappedItem);
            }
        
        
    }

    OnValueChanged=(e:UnitResponse)=>{
        PropHelper.updatePropertyPath(this.selectedDataItem, this.UiElement.defaultAccessPath, this.Def.DataObject);
        
    }

    SelectDefaultValue(MappedItem: UnitResponse) {
        for(var i of this.unitResponses.value)
        {
            
                if (MappedItem && MappedItem.unitKey === i.unitKey && MappedItem.unitKey!=1) {
                    this.selectedDataItem = i;
                }

                if (i.isDefault) {
                    
                    this.selectedDataItem = i;
                    this.OnValueChanged(i);
                }
        }
        //console.log("unit-select", this.selectedDataItem)
    }
 
    async LoadNonServerDataCombo() {
        this.OnBeforeUnitRead();
        if(this.comboRequest)
        {
            var content  = await fetchWrapper.post(`${base_end_point()}unit/readUnits`,this.comboRequest);       
            this.unitResponses.value=content as UnitResponse[]
        }
    }

    getUnitResponseByIAccessPath(): UnitResponse {

        let obj= PropHelper.getUnitResponseByAccessPath(this.Def.DataObject, this.UiElement.defaultAccessPath);
        
        return obj
    }
    onSelectionChange(ev: any) {

        PropHelper.updatePropertyPath(this.selectedDataItem, this.UiElement.defaultAccessPath, this.Def.DataObject);
    }

    

OnBeforeUnitRead() 
{
   
    if (this.comboRequest && this.UiElement.onBeforeComboLoad) 
    {
        PropHelper.fireOnBeforeChangeComboEvent(this.Def, this.UiElement, this.comboRequest);
        
    }
}

fetchComboData=async(searchText='')=> {
   
    if(this.comboRequest.value){
        this.comboRequest.value.searchQuery=searchText
        //var content  = await fetchWrapper.post(`${base_end_point()}${this.UiElement.urlController}/${this.UiElement.urlAction}`,this.comboRequest.value);
        var content  = await fetchWrapper.post(`${base_end_point()}unit/readUnits`,this.comboRequest.value);
        this.unitResponses.value=content as UnitResponse[]
    }
    
    
}

Disable(): void {
    throw new Error('Method not implemented.');
}
Enable(): void {
    throw new Error('Method not implemented.');
}
async Reload(): Promise<void> {
    
        this.selectedDataItem = new UnitResponse();
        await this.LoadNonServerDataCombo();

        let MappedItem = this.getUnitResponseByIAccessPath();
        this.SelectDefaultValue(MappedItem);
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
        <v-autocomplete v-model="selectedDataItem" 
                        @update:model-value="OnValueChanged" 
                        :items="unitResponses" 
                        item-key="unitKey"
                        item-title="unitName" 
                        :label="UiElement.elementCaption" 
                        variant="outlined"
                        :disabled="!isEditable"
                        :class="css_class" return-object></v-autocomplete>
</template>