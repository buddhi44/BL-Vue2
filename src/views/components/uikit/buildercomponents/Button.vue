<script lang="ts">
import {ref,onMounted,inject} from 'vue'
import { Component, Vue, toNative,Prop,Inject,Watch } from 'vue-facing-decorator'
import type { BLUIBuilder, IUIDefinition } from '@/core/domain/interfaces/IBLUIOperationHelper';
import type { BLUIElement } from '@/core/domain/BLUIElement';

@Component
class button extends Vue implements IUIDefinition{

    uiObject!: BLUIElement;
    @Prop()
    public UiElement!:any
    @Prop()
    public isGrid!:any
    @Prop()
    public Def!:BLUIBuilder

    css_class=ref<string>('')
    isEditable= ref<boolean>(true)
    css !:string
    myCaption = ref<string>("")
    myicon = ref<string | undefined>(undefined)
    

    async mounted(){
        this.uiObject=this.UiElement;
        this.css = this.UiElement.isVisible?this.UiElement.cssClass:"d-none"
        this.css=this.css+ (this.UiElement.isMust?" required":"")
        this.css_class=this.css  

        this.setIcon()
          
    }

    setIcon=()=>{

        if(this.UiElement.iconCss != null || this.UiElement.iconCss != undefined || this.UiElement.iconCss != ""){
        switch (this.UiElement.iconCss) {
            case "fa-solid fa-user-plus":
                this.myicon.value = "mdi-account-plus"
                break;
            case "fa-solid fa-file-export":
                this.myicon.value = "mdi-file-replace"
                break;
            case "fa-solid fa-retweet":
                this.myicon.value = "mdi-keyboard-return"
                break;
            case "fa-solid fa-hand":
                this.myicon.value = "mdi-hand-back-left"
                break;
            case "fa-solid fa-refresh":
                this.myicon.value = "mdi-refresh-circle"
                break;
            case "fa-solid fa-scroll":
                this.myicon.value = "mdi-script"
                break;
            case "fa-solid fa-power-off":
                this.myicon.value = "mdi-close-octagon-outline"
                break;
            case "fa-solid fa-share-from-square":
                this.myicon.value = "mdi-share-circle"
                break;
            case "fa-solid fa-envelope":
                this.myicon.value = "mdi-email"
                break;
            case "fa-solid fa-print":
                this.myicon.value = "mdi-printer"
                break;
            case "fa-regular fa-circle-left":
                this.myicon.value = "mdi-arrow-left-bold-circle"
                break;
            case "fa-solid fa-ban":
                this.myicon.value = "mdi-file-cancel"
                break;
            case "fa-solid fa-dollar-sign":
                this.myicon.value = "mdi-currency-usd"
                break;
            case "fa-solid fa-money-check":
                this.myicon.value = "mdi-cash-check"
                break;
            case "fa-solid fa-table-list":
                this.myicon.value = "mdi-format-list-bulleted-square"
                break;
            case "fa-solid fa-right-from-bracket":
                this.myicon.value = "mdi-arrow-right-top-bold"
                break;
            case "fa-solid fa-right-to-bracket":
                this.myicon.value = "mdi-arrow-u-right-top-bold"
                break;
            case "fa-solid fa-magnifying-glass":
                this.myicon.value = "mdi-magnify"
                break;
            case "fa-solid fa-file":
                this.myicon.value = "mdi-file"
                break;
            case "fa-solid fa-pen":
                this.myicon.value = "mdi-pen"
                break;
            case "fa-solid fa-floppy-disk":
                this.myicon.value = "mdi-harddisk"
                break;
            case "fa-brands fa-get-pocket":
                this.myicon.value = "mdi-pocket"
                break;
            case "TwoTone.QrCodeScanner":
                this.myicon.value = "mdi-qrcode-scan"
                break;
            default:
                //console.log(props.UiElement.iconCss)
                break;
        }
        this.myCaption = this.UiElement.elementCaption;
        //this.UiElement.elementCaption = undefined
        }
        else{
            //console.log(props.UiElement)
        }
    }

    onButtonClicked=(e:any)=> 
    {

        if (this.Def != undefined && this.UiElement.onClickAction != null && this.UiElement.onClickAction.length > 1) {

            if (this.Def.OwnerComponent != undefined && (typeof this.Def.OwnerComponent[this.UiElement.onClickAction]) == 'function') {
                let callback = this.Def.OwnerComponent[this.UiElement.onClickAction] as Function
                callback.apply(this.Def.OwnerComponent, [e.target, this.uiObject]);
            }
            else {
                console.timeStamp();
                console.error(`cannot find function  ${this.uiObject.onClickAction} in the  below mentioned component `);
            
            }
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

}
export default toNative(button)

</script>

<template>
    <v-tooltip :text="UiElement.elementCaption" >
        <template v-slot:activator="{props}">
            <v-btn :onclick="(e:any) => onButtonClicked(e)" v-bind="props" color="primary" size="large" flat :class="`${props.UiElement?.cssClass} mx-2`">{{ UiElement.elementCaption }}</v-btn>
        </template>
    </v-tooltip>
</template>

<style></style>