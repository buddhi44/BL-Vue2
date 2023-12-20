<script lang="ts">
import {ref,inject,watchEffect,onMounted,type Ref} from 'vue'
import BLContainer from '../../BLContainer.vue';
import { fetchWrapper } from '@/managers/helper/fetch_wrapper'
import base_end_point from '@/router/base_end_point';
import Vuetify from 'vuetify';
import { ItemResponse } from '@/core/domain/Entities/Base/ItemResponse';
import { Component, Vue, toNative,Prop,Inject,Watch } from 'vue-facing-decorator'
import type { BLUIBuilder, IUIDefinition } from '@/core/domain/interfaces/IBLUIOperationHelper';
import type { BLUIElement } from '@/core/domain/BLUIElement';
import { ComboRequest } from '@/core/domain/Entities/Base/comboRequest';
import SalesOrder from '@/views/pages/salesManagement/SalesOrder.vue';
import type { BLOrder } from '@/core/domain/Entities/BLOrder';
import { PropHelper } from '@/helper/propertyHelper';

@Component
class itemCombo extends Vue implements IUIDefinition{

    uiObject!: BLUIElement;
    @Prop()
    public UiElement!:any
    @Prop()
    public isGrid!:any
    @Prop()
    public Def!:BLUIBuilder

    itemResponses=ref<ItemResponse[]>([])
    selectedDataItem = ref<ItemResponse>(new ItemResponse())
    css_class=ref<string>('')
    isEditable= ref<boolean>(true)
    comboRequest=ref<ComboRequest>(new ComboRequest())
    css !:string


    @Inject({from:'actionTriggers'}) 
    readonly actionTriggers:  any[] | undefined

    async mounted(){
            this.uiObject=this.UiElement;
            this.selectedDataItem.value=new ItemResponse()
            this.itemResponses.value=[]
            this.css = this.UiElement.isVisible?this.UiElement.cssClass:"d-none"
            this.css=this.css+ (this.UiElement.isMust?" required":"")
            this.css_class=this.css
            
            this.comboRequest.requestingElementKey=this.UiElement.elementKey

            if(this.itemResponses!=undefined || this.itemResponses!=null){
                if(this.UiElement.isServerFiltering){
                    this.fetchComboData()
                }
                else{
                    let MappedItem = this.getItemReponseByAccessPath();
                    
                        this.itemResponses.forEach((items:any) => {
                        
                            for (let i of items) {

                                if (MappedItem && MappedItem.itemKey === i.itemKey) {
                                    this.selectedDataItem = i;
                                    break;
                                    //   this.onSelectionChange(i);
                                }
                                if (i.isDefault) {
                                    this.selectedDataItem = i;
                                    this.OnValueChanged(i);
                                }


                            }
            

                    })
            
                }
            }

    }

    OnValueChanged=(e:ItemResponse)=>{
        PropHelper.updatePropertyPath(this.selectedDataItem, this.UiElement.defaultAccessPath, this.Def.DataObject);
        PropHelper.fireComboChnageEvent(this.Def, this.UiElement, e);
        
    }
 
    LaunchOnClickAction=(data : ItemResponse)=>{
        
        if(this.actionTriggers != undefined)
        {
           
            var functions = this.actionTriggers.filter((item:any)=>{
                return item.name == this.UiElement.onClickAction
            })
            functions[0].action(data);
        }
}


fetchComboData=async(searchText='')=> {
    this.comboRequest.value.searchQuery=searchText
    //var content  = await fetchWrapper.post(`${base_end_point()}${this.UiElement.urlController}/${this.UiElement.urlAction}`,this.comboRequest.value);
    var content  = await fetchWrapper.post(`${base_end_point()}item/getItemsForTransactionJson`,this.comboRequest.value);
    this.itemResponses.value=content as ItemResponse[]
    
}
getItemReponseByAccessPath(): ItemResponse {
        return PropHelper.getItemReponseByAccessPath(this.Def.DataObject, this.UiElement.defaultAccessPath);
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
export default toNative(itemCombo)
</script>

<template>
        <v-autocomplete v-model="selectedDataItem" 
                        @update:model-value="OnValueChanged" 
                        :items="itemResponses" 
                        item-title="itemName"
                        :label="`${UiElement.elementCaption} ${UiElement.elementKey}`" 
                        variant="outlined"
                        :disabled="!isEditable"
                        :class="css_class"
                        return-object>

                        
                    </v-autocomplete>

</template>