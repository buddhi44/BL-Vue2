<script  lang="ts">
import { watch,inject,ref,onMounted } from 'vue';
import BLContainer from '../BLContainer.vue'
import { Component, Vue, toNative,Prop,Inject,Watch } from 'vue-facing-decorator'
import type { BLUIBuilder, IUIDefinition } from '@/core/domain/interfaces/IBLUIOperationHelper';
import type { BLUIElement } from '@/core/domain/BLUIElement';
import  { PropHelper } from '@/helper/propertyHelper';

@Component
class blNnumericBox extends Vue implements IUIDefinition{
    @Prop()
    public UiElement!:any
    @Prop()
    public isGrid!:any
    @Prop()
    public Def!:BLUIBuilder

    uiObject!: BLUIElement;
    css_class=ref<string>('')
    isEditable= ref<boolean>(true)
    css !:string
    myCaption = ref<string>("")
    readonly=ref<boolean>(false)
    numericValue=ref<number>(0)

    mounted(){
        this.uiObject=this.UiElement;
        this.css = this.UiElement.isVisible?this.UiElement.cssClass:"d-none"
        this.css=this.css+ (this.UiElement.isMust?" required":"")
        this.css_class=this.css  
        this.readonly= this.UiElement.elementType === 'ReadOnlyTextBox'
    
        if (this.Def != undefined && this.Def.DataObject != undefined) 
        {

            if (this.Def.DataObject[this.UiElement.defaultAccessPath])
            {
                this.numericValue = this.Def.DataObject[this.UiElement.defaultAccessPath];
            }
        }

        if (!this.Def.hasComponent(this)) {
            this.Def.ObjectRefs.push(this);
        }
        //console.log(this.Def.ObjectRefs)

    }

    onNumericBoxChange(ev: string) {
       //this.Def.DataObject[this.UiElement.defaultAccessPath] = Number(ev)
       
      PropHelper.updatePropertyPath(Number(ev), this.UiElement.defaultAccessPath, this.Def.DataObject);

        if (this.Def != undefined && this.UiElement.onClickAction != null && this.UiElement.onClickAction.length > 1) {

            if (this.Def.OwnerComponent != undefined && (typeof this.Def.OwnerComponent[this.UiElement.onClickAction]) == 'function') {
                let callback = this.Def.OwnerComponent[this.UiElement.onClickAction] as Function
                callback.apply(this.Def.OwnerComponent, [Number(ev)]);
            }
            else {
                // console.timeStamp();
                // console.error(`cannot find function  ${this.UiElement.onClickAction} in the  below mentioned component `);


            }
        }
    }

    Disable(): void {
        this.UiElement.isEnable = false;

    }
    Enable(): void {
        this.UiElement.isEnable = true;
    }
    Reload(): void {
    throw new Error('Method not implemented.');
    }

    // @Watch('Def.DataObject', { immediate: true })

    //     propertyWatcher(newValue: any, oldValue: any) {
    //         let val = PropHelper.getPropertyValue(this.Def.DataObject, this.UiElement.defaultAccessPath)
    //         if (val != undefined) {
    //             this.numericValue = val;
    //             return;
    //         }
    //         this.numericValue = 0;
    //     }


}
export default toNative(blNnumericBox)
//console.log(props.UiElement)
</script>

<template>
        <v-text-field id="{{UiElement.elementID}}"
                      type="number" 
                      v-model="numericValue" 
                      :label="UiElement.elementCaption" 
                      :class="css_class"
                      :disabled="!(UiElement.isEnable)"
                      :readonly="readonly"
                      @update:model-value="(e)=>{onNumericBoxChange(e)}"></v-text-field>

</template>

<style></style>