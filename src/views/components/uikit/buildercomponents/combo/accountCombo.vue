<script lang="ts">
import {ref,inject,watchEffect,onMounted,type Ref} from 'vue'
import BLContainer from '../../BLContainer.vue';
import { fetchWrapper } from '@/managers/helper/fetch_wrapper'
import base_end_point from '@/router/base_end_point';
import Vuetify from 'vuetify';
import { AccountResponse } from '@/core/domain/Entities/Base/accountResponse';
import { Component, Vue, toNative,Prop,Inject,Watch } from 'vue-facing-decorator'
import type { BLUIBuilder, IUIDefinition } from '@/core/domain/interfaces/IBLUIOperationHelper';
import type { BLUIElement } from '@/core/domain/BLUIElement';
import { ComboRequest } from '@/core/domain/Entities/Base/comboRequest';
import SalesOrder from '@/views/pages/salesManagement/SalesOrder.vue';
import type { BLOrder } from '@/core/domain/Entities/BLOrder';

@Component
class accountCombo extends Vue implements IUIDefinition{

    uiObject!: BLUIElement;
    @Prop()
    public UiElement!:any
    @Prop()
    public isGrid!:any
    @Prop()
    public Def!:BLUIBuilder

    accountResponses=ref<AccountResponse[]>([])
    selectedDataItem = ref<AccountResponse>(new AccountResponse())
    css_class=ref<string>('')
    isEditable= ref<boolean>(true)
    comboRequest=ref<ComboRequest>(new ComboRequest())
    css !:string


    @Inject({from:'actionTriggers'}) 
    readonly actionTriggers:  any[] | undefined

    async mounted(){
            this.uiObject=this.UiElement;
            this.selectedDataItem.value=new AccountResponse()
            this.accountResponses.value=[]
            this.css = this.UiElement.isVisible?this.UiElement.cssClass:"d-none"
            this.css=this.css+ (this.UiElement.isMust?" required":"")
            this.css_class=this.css
            
            this.comboRequest.requestingElementKey=this.UiElement.elementKey
            await this.fetchComboData();
           // console.log("codes",this.codeBaseResponses)
            if((this.accountResponses!=undefined || this.accountResponses!=null)&& !this.UiElement.isServerFiltering ){
                this.accountResponses.forEach((i:any) => {
                
                if (i!=null && i!=undefined && i.isDefault) {
                    this.selectedDataItem = i;
                    this.OnValueChanged(i);
    
                }
            

                })
            }
            
          
    }

    OnValueChanged=(e:AccountResponse)=>{
        this.Def.DataObject[this.UiElement.defaultAccessPath] = this.selectedDataItem;
        
    }
 
    LaunchOnClickAction=(data : AccountResponse)=>{
        console.log(this.actionTriggers)
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
    var content  = await fetchWrapper.post(`${base_end_point()}account/readAccounts`,this.comboRequest.value);
    this.accountResponses.value=content as AccountResponse[]
    
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
export default toNative(accountCombo)
</script>

<template>

        <v-autocomplete v-model="selectedDataItem" 
                        @update:model-value="OnValueChanged" 
                        :items="accountResponses" 
                        item-title="accountName"
                        :label="`${UiElement.elementCaption} ${UiElement.elementKey}`" 
                        variant="outlined"
                        :disabled="!isEditable"
                        :class="css_class"
                        return-object>

                        
                    </v-autocomplete>

</template>