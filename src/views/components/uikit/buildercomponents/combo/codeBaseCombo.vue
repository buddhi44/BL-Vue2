<script lang="ts">
import {ref,inject,watchEffect,onMounted} from 'vue'
import BLContainer from '../../BLContainer.vue';
import { fetchWrapper } from '@/managers/helper/fetch_wrapper'
import base_end_point from '@/router/base_end_point';
import Vuetify from 'vuetify';
import { CodeBaseResponse } from '@/core/domain/Entities/Base/codeBaseReponse';
import { Component, Vue, toNative,Prop,Inject,Watch } from 'vue-facing-decorator'
import type { IUIDefinition } from '@/core/domain/interfaces/IBLUIOperationHelper';
import type { BLUIElement } from '@/core/domain/BLUIElement';
import { ComboRequest } from '@/core/domain/Entities/Base/comboRequest';

@Component
class codeBaseCombo extends Vue implements IUIDefinition{

    uiObject!: BLUIElement;
    @Prop()
    public UiElement?:any
    @Prop()
    public isGrid?:any
    codeBaseResponses:CodeBaseResponse[]=[]
    selectedDataItem = new CodeBaseResponse()
    css_class:string=''
    isEditable:boolean=true
    comboRequest:ComboRequest=new ComboRequest()
    @Inject
    public baseObject!: any

    @Inject
    public actionTriggers!:  any[] | undefined

    async mounted(){
        
            
            this.selectedDataItem=new CodeBaseResponse()
            this.css_class=this.UiElement.isVisible?this.UiElement?.cssClass:"d-none"
            this.css_class=this.css_class+ (this.UiElement.isMust?" required":"")
            console.log("css",this.css_class)
            this.comboRequest.requestingElementKey=this.UiElement.elementKey
            await this.fetchComboData();
            console.log("codebase responsesddddd",this.codeBaseResponses)
        
        
    }

    OnValueChanged=(e:CodeBaseResponse)=>{
    var xx = this.codeBaseResponses.find((item)=>{
        return item == e
    })
    this.LaunchOnClickAction(xx as CodeBaseResponse)
 }
    LaunchOnClickAction=(data : CodeBaseResponse)=>{
        if(this.actionTriggers != undefined)
        {
            var functions = this.actionTriggers.filter((item:any)=>{
                return item.name == this.UiElement.onClickAction
            })
            functions[0].action(data);
        }
}


fetchComboData=async(searchText='')=> {
    this.comboRequest.searchQuery=searchText
    var content  = await fetchWrapper.post(`${base_end_point()}${this.UiElement.urlController}/${this.UiElement.urlAction}`,this.comboRequest);
    this.codeBaseResponses=content as CodeBaseResponse[]
    
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

}
export default toNative(codeBaseCombo)
</script>

<template>
    <b-l-container :is-grid="isGrid" :width="UiElement.width" v-if="UiElement.isVisible" >
        <v-autocomplete v-model="selectedDataItem" 
                        @update:model-value="OnValueChanged" 
                        :items="codeBaseResponses" 
                        item-title="codeName"
                        :label="UiElement.elementCaption" 
                        variant="outlined"
                        :disabled="!isEditable"
                        :class="css_class"
                        return-object>

                        
                    </v-autocomplete>

                    
    </b-l-container>
</template>