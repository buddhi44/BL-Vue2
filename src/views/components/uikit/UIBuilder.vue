<script  lang="ts">
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
import CodeBaseCombo from '@/views/components/uikit/buildercomponents/combo/codeBaseCombo.vue'
import AddressCombo from '@/views/components/uikit/buildercomponents/combo/addressCombo.vue'
import ItemCombo from '@/views/components/uikit/buildercomponents/combo/itemCombo.vue'
import UnitCombo from '@/views/components/uikit/buildercomponents/combo/unitCombo.vue'
import { Component, Vue, toNative,Prop,Inject,Watch, Ref } from 'vue-facing-decorator'
import type { BLUIBuilder } from '@/core/domain/interfaces/IBLUIOperationHelper'
import type ObjectFormRequest from '@/core/domain/ObjectFormRequest'
import { fetchWrapper } from '@/managers/helper'
import { TokenEndPoint } from '@/router/token_endpoint'

@Component({
    components:{
        CodeBaseCombo,
        AddressCombo,
        UnitCombo,

    }
})
class UIBuilder extends Vue {
  
    @Prop()
    public isGrid!:any
    @Prop()
    public Def!:BLUIBuilder

    myComponents = ref<any>(undefined);
    formObject= ref<any>({});
    ContentList=ref<any>()
    Title=ref<string>('')

    async mounted(){   
        await this.LoadFormDefinition().then(res=>{
            this.ContentList= res;
            this.Title=res[1].elementCaption}); 
        
        if(this.ContentList!=undefined){
            this.myComponents =this.filterComponentsByParent(this.ContentList, this.Def.UIObjectKey) 
            
        }    
        
    }

    filterComponentsByParent=(components: any, parentKey: number ): any =>
    {
        return components.filter((item:any)=>{
            return item.parentKey == parentKey
        }).map((item:any) => {
            const filteredChildren = this.filterComponentsByParent(components, item.elementKey);
            if (filteredChildren.length > 0) 
            {
                item.children = filteredChildren;
            }
            return item;
        });
    }

    LoadFormDefinition = async ():Promise<any> =>{
    
    var request : ObjectFormRequest = {
        MenuKey:Number(this.Def.UIObjectKey)
    }
    
    var content = await fetchWrapper.post(TokenEndPoint.FormDefinitionUrl,request)
    
    var contList = content.children;

    var element = null;
    contList.forEach((item:any,index:number)=>{
        if(item.elementKey == Number(this.Def.UIObjectKey.value)){
            element = item;
            contList.splice(index,1)
        }
    })
    return contList
    
}
} 


export default toNative(UIBuilder)
</script>

    <template>
        <h3 class="mb-5" v-if="myComponents != null || myComponents != undefined">{{ Title }}</h3>
        <div v-for="com in ContentList">
            <!-- <SectionFormatGroup  v-if="com.elementType == 'SectnFrmtGrp'" :Parent="com.elementKey" :ComponentList="ContentList" />
            <PopupWindow v-if="com.elementType == 'PopUpWindow'" :Parent="com.elementKey" :ComponentList="ContentList"/> -->
            <TextBox :isGrid="isGrid" :UiElement="com" v-if="com.elementType == 'TextBox' || com.elementType == 'NumericBox' || com.elementType == 'TelNumericBox'" />
            <ButtonGroup   v-if="com.elementType == 'ButtonGroup'"  :Parent="com.elementKey" :UiElement="com" />
            <BLButton  :UiElement="com" v-if="com.elementType == 'Button'" />
            <BLDatePicker :isGrid="isGrid" :UiElement="com" v-if="com.elementType == 'DatePicker'" />
            <CodeBaseCombo :is-grid="isGrid" :UiElement="com" v-if="(com.elementType == 'Cmb' && com.elementID == 'CodeBase')" :Def="Def"/>
            <AddressCombo :is-grid="isGrid" :UiElement="com" v-if="com.elementType == 'Cmb' && com.elementID == 'Address'" :Def="Def"/>
            <UnitCombo :is-grid="isGrid" :UiElement="com" v-if="com.elementType == 'Cmb' && com.elementID == 'Unit'" :Def="Def"/>
            <ItemCombo :is-grid="isGrid" :UiElement="com" v-if="com.elementType == 'Cmb' && com.elementID == 'Item'" :Def="Def"/>
            <BLSwitch :UiElement="com" v-if="com.elementType == 'Switch' || com.elementType == 'MultiRadio'" />
            <!-- <GridCover v-if="com.elementType == 'Grid'" :Parent="com.elementKey" :ComponentList="ContentList" /> -->
            <Headings :UiElement="com" v-if="com.elementType == 'Heading6' || com.elementType == 'Heading5' || com.elementType == 'Heading4' || com.elementType == 'Heading3' || com.elementType == 'Heading2' || com.elementType == 'Heading1'" />
            <!-- <div v-if="com.elementType != 'Grid' && com.elementType != 'CalcTmpl' && com.elementType != 'ImageBox' && com.elementType != 'Switch' && com.elementType != 'Cmb' && com.elementType != 'DatePicker' && com.elementType != 'Button' && com.elementType != 'ButtonGroup' && com.elementType != 'TextBox' && com.elementType != 'NumericBox' && com.elementType != 'SectnFrmtGrp' && com.elementType != 'PopUpWindow' && com.elementType != 'ReportWeb' && com.elementType != 'FormGroup'">
            
            <div v-if="com.elementType != 'Heading6' && com.elementType != 'MultiRadio' && com.elementType != 'Label' && com.elementType != 'Heading5' && com.elementType != 'TelNumericBox' && com.elementType != 'Heading4' && com.elementType != 'Heading3' && com.elementType != 'Heading2' && com.elementType != 'Heading1'">
                {{ com }}
            </div> 
            
            </div> -->
        </div>
            
    </template>


<style></style>


<!-- Report web,Grid,Image Box,Label,CalcTmpl and Form Group Not yet Constructed! -->