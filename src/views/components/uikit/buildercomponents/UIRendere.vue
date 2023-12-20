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
        BLButton,
        BLDatePicker,
        TextBox,
        NumericBox,
    }
})
class UiRendere extends Vue {
  
    @Prop()
    public isGrid!:any
    @Prop()
    public Def!:BLUIBuilder

    myComponents = ref<any>(undefined);
    formObject= ref<any>({});
    ContentList=ref<any>()
    Title=ref<string>('')

    arrHeaderSection1=ref<any>();

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
       
        this.arrHeaderSection1 = result.filter((x:any)=> x._internalElementName === '_SearchSalesOrder_')[0];
       
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


export default toNative(UiRendere)
</script>

    <template>
         <v-container>
            
                <v-row justify="space-around"> 

                    <v-card class="px-3">
                        <v-toolbar
                            color="rgba(0, 0, 0, 0)"
                            theme="dark">
                                <v-toolbar-title class="text-h6" v-if="myComponents != null || myComponents != undefined"> {{ Title }} </v-toolbar-title>
                                <v-spacer></v-spacer>
                                
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

                            
                        </v-card-text>
                    </v-card>
                    
                </v-row>
         </v-container>
    </template>


<style></style>
