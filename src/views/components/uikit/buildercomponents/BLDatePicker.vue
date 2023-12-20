<script lang="ts">
import {inject,ref,watch,watchEffect,onMounted} from 'vue'
import { Component, Vue, toNative,Prop,Inject,Watch } from 'vue-facing-decorator'
import BLContainer from '../BLContainer.vue'
import { useDate } from 'vuetify';
import type { BLUIBuilder, IUIDefinition } from '@/core/domain/interfaces/IBLUIOperationHelper';
import type { BLUIElement } from '@/core/domain/BLUIElement';

@Component
class blDatePicker extends Vue implements IUIDefinition{

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
    dateAdapter = useDate();
    format =ref<string>("d.m.y") 
    selectedDate= ref<Date>();
    dateModal=ref<string>('')

    mounted(){
        this.selectedDate=new Date()
        this.dateModal=this.selectedDate.toISOString().slice(0,10)
       
        this.css = this.UiElement.isVisible?this.UiElement.cssClass:"d-none"
        this.css=this.css+ (this.UiElement.isMust?" required":"")
        this.css_class=this.css  
          
    }

    onDateChanged(ev: string) {
        
        this.Def.DataObject[this.UiElement.defaultAccessPath] = new Date(ev)
        console.log(this.Def.DataObject[this.UiElement.defaultAccessPath])
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

// console.log(props.UiElement)
// console.log(basecontent[props.UiElement.defaultAccessPath])

// watchEffect(()=>{
//     dateMdl.value = dateAdapter.format(basecontent[props.UiElement.defaultAccessPath],"keyboardDate")
// })

export default toNative(blDatePicker)
</script>

<template>

        <v-text-field id="{{UiElement.elementID}}"
                    type="date" 
                    v-model="dateModal"  
                    :label="UiElement.elementCaption"  
                    @update:model-value="(e)=>{onDateChanged(e)}" 
                    :disabled="!(isEditable)" ></v-text-field>
   
</template>