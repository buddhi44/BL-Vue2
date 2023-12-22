<script  lang="ts">
import {ref,onMounted} from 'vue'
import SectionFormatGroup from '@/views/components/uikit/buildercomponents/SectionFormatGroup.vue'
import PopupWindow from '@/views/components/uikit/buildercomponents/PopupWindow.vue'
import TextBox from '@/views/components/uikit/buildercomponents/TextBox.vue'
import NumericBox from '@/views/components/uikit/buildercomponents/NumericBox.vue'
import ButtonGroup from '@/views/components/uikit/buildercomponents/ButtonGroup.vue'
import BLButton from '@/views/components/uikit/buildercomponents/Button.vue'
import Headings from '@/views/components/uikit/buildercomponents/Headings.vue'
import BLDatePicker from '@/views/components/uikit/buildercomponents/BLDatePicker.vue'
import BLCombo from '@/views/components/uikit/buildercomponents/BLCombo.vue'
import BLSwitch from '@/views/components/uikit/buildercomponents/BLSwitch.vue'
import BLGrid from '@/views/components/uikit/buildercomponents/Grid/BLGrid.vue'
import CodeBaseCombo from '@/views/components/uikit/buildercomponents/combo/codeBaseCombo.vue'
import AccountCombo from '@/views/components/uikit/buildercomponents/combo/accountCombo.vue'
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
        AccountCombo,
        ItemCombo,
        UnitCombo,
        BLButton,
        ButtonGroup,
        BLDatePicker,
        TextBox,
        NumericBox,
        BLGrid
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

    arrButtonSection=ref<any>();
    arrHeaderSection1=ref<any>();
    arrDetailSection1=ref<any>();
    arrDetailGrid=ref<any>();
    Def2=ref<BLUIBuilder>()

    async mounted(){   
        console.log(this.Def)
        await this.LoadFormDefinition().then(res=>{
            this.ContentList= res;
            this.Title=res[1].elementCaption
        }); 
        
        if(this.ContentList!=undefined){
            this.myComponents =this.buildTree(this.ContentList, this.Def.UIObjectKey) 
            
        }    
        
    }

    LoadFormDefinition = async ():Promise<any> =>{

        var request : ObjectFormRequest = {
            MenuKey:Number(this.Def.UIObjectKey)
        }
        
        var content = await fetchWrapper.post(TokenEndPoint.FormDefinitionUrl,request)
        
        var contList = content.children;

        //var element = null;

        // contList.forEach((item:any,index:number)=>{
        //     if(item.elementKey == Number(this.Def.UIObjectKey.value)){
        //         element = item;
        //         contList.splice(index,1)
        //     }
        // })

        return contList
    
    }

    buildTree(items: any, parentKey: number): any {

        let result: any = [];

        result = this.buildParentChild(items, parentKey);
        this.arrButtonSection = result.filter((x:any) => x._internalElementName === 'Button_Section_1')[0].children[0];
        this.arrHeaderSection1 = result.filter((x:any)=> x._internalElementName === 'Header_Section_1')[0];
        this.arrDetailSection1 = result.filter((x:any)=> x._internalElementName === 'OrderItemPopUp')[0];
        this.arrDetailGrid = result.filter((x:any)=> x._internalElementName === 'SalesOrderGrid')[0];      
        
        return result;
    }
    
    buildParentChild=(components: any, parentKey: number ): any =>
    {
        return components.filter((item:any)=>{
            return item.parentKey == parentKey
        }).map((item:any) => {
            const filteredChildren = this.buildParentChild(components, item.elementKey);
            if (filteredChildren.length > 0) 
            {
                item.children = filteredChildren;
            }
            return item;
        });
    }


} 


export default toNative(UIBuilder)
</script>

    <template>
         <v-container>
            
                <v-row justify="space-around"> 

                    <v-card class="px-3">
                        <v-toolbar
                            color="rgba(0, 0, 0, 0)"
                            theme="dark">
                        
                                <v-spacer></v-spacer>
                                <ButtonGroup v-if="arrButtonSection!=undefined || arrButtonSection!=null"   :UiElement="arrButtonSection"  :Def="Def"/>
                        </v-toolbar>
                        <v-card-text>
                            <v-row id="header-section" v-if="arrHeaderSection1!=undefined || arrHeaderSection1!=null">
                                <v-col  v-for="com in arrHeaderSection1.children"  :v-if="com.isVisible" cols=12 :md=com.width  :class="com.isVisible?'':'d-none'">
                                        <NumericBox :isGrid="isGrid" :UiElement="com" v-if="com.elementType == 'NumericBox' || com.elementType == 'TelNumericBox'" :Def="Def" />
                                        <TextBox :isGrid="isGrid" :UiElement="com" v-if="com.elementType == 'TextBox'" :Def="Def" />
                                        <BLButton  :UiElement="com" v-if="com.elementType == 'Button'" :Def="Def"/>
                                        <BLDatePicker :isGrid="isGrid" :UiElement="com" v-if="com.elementType == 'DatePicker'" :Def="Def"/>
                                        <CodeBaseCombo :is-grid="isGrid" :UiElement="com" v-if="(com.elementType == 'Cmb' && com.elementID == 'CodeBase')" :Def="Def"/>
                                        <AccountCombo :is-grid="isGrid" :UiElement="com" v-if="com.elementType == 'Cmb' && com.elementID == 'Account'" :Def="Def"/>
                                        <AddressCombo :is-grid="isGrid" :UiElement="com" v-if="com.elementType == 'Cmb' && com.elementID == 'Address'" :Def="Def"/>

                            
                                </v-col>
                            </v-row>

                            <v-row id="detail-section" v-if="arrDetailSection1!=undefined || arrDetailSection1!=null">
                                <v-col  v-for="com in arrDetailSection1.children"  :v-if="com.isVisible" cols=12 :md=com.width  :class="com.isVisible?'':'d-none'">
                                        <NumericBox :isGrid="isGrid" :UiElement="com" v-if="com.elementType == 'NumericBox' || com.elementType == 'TelNumericBox'" :Def="Def" />
                                        <TextBox :isGrid="isGrid" :UiElement="com" v-if="com.elementType == 'TextBox'||com.elementType == 'Label'" :Def="Def" />
                                        <BLButton  :UiElement="com" v-if="com.elementType == 'Button'" :Def="Def"/>
                                        <BLDatePicker :isGrid="isGrid" :UiElement="com" v-if="com.elementType == 'DatePicker'" :Def="Def"/>
                                        <CodeBaseCombo :is-grid="isGrid" :UiElement="com" v-if="(com.elementType == 'Cmb' && com.elementID == 'CodeBase')" :Def="Def"/>
                                        <AccountCombo :is-grid="isGrid" :UiElement="com" v-if="com.elementType == 'Cmb' && com.elementID == 'Account'" :Def="Def"/>
                                        <AddressCombo :is-grid="isGrid" :UiElement="com" v-if="com.elementType == 'Cmb' && com.elementID == 'Address'" :Def="Def"/>
                                        <ItemCombo :UiElement="com" v-if="com.elementType == 'Cmb' && com.elementID == 'Item'" :Def="Def"/>
                                        <UnitCombo :UiElement="com" v-if="com.elementType == 'Cmb' && com.elementID == 'Unit'" :Def="Def"/>
                                </v-col>
                            </v-row>
                            <v-row id="grid-section" v-if="arrDetailGrid!=undefined || arrDetailGrid!=null">
                                <BLGrid :UiElement="arrDetailGrid" :Def="Def"/>
                            </v-row>
                        </v-card-text>
                    </v-card>
                    
                </v-row>
         </v-container>
    </template>


<style></style>
<!-- <SectionFormatGroup  v-if="com.elementType == 'SectnFrmtGrp'" :Parent="com.elementKey" :ComponentList="ContentList" /> -->
<!-- <PopupWindow v-if="com.elementType == 'PopUpWindow'" :Parent="com.elementKey" :ComponentList="ContentList"/> -->
<!-- <GridCover v-if="com.elementType == 'Grid'" :Parent="com.elementKey" :ComponentList="ContentList" /> -->
 <!-- <div v-if="com.elementType != 'Grid' && com.elementType != 'CalcTmpl' && com.elementType != 'ImageBox' && com.elementType != 'Switch' && com.elementType != 'Cmb' && com.elementType != 'DatePicker' && com.elementType != 'Button' && com.elementType != 'ButtonGroup' && com.elementType != 'TextBox' && com.elementType != 'NumericBox' && com.elementType != 'SectnFrmtGrp' && com.elementType != 'PopUpWindow' && com.elementType != 'ReportWeb' && com.elementType != 'FormGroup'">
 <Headings :UiElement="com" v-if="com.elementType == 'Heading6' || com.elementType == 'Heading5' || com.elementType == 'Heading4' || com.elementType == 'Heading3' || com.elementType == 'Heading2' || com.elementType == 'Heading1'" />         
                <div v-if="com.elementType != 'Heading6' && com.elementType != 'MultiRadio' && com.elementType != 'Label' && com.elementType != 'Heading5' && com.elementType != 'TelNumericBox' && com.elementType != 'Heading4' && com.elementType != 'Heading3' && com.elementType != 'Heading2' && com.elementType != 'Heading1'"> 
                    {{ com }}
                </div> 
                
                </div> 
                
Report web,Grid,Image Box,Label,CalcTmpl and Form Group Not yet Constructed! -->