<script lang="ts">
import BLToolButton from './BLToolButton.vue'
import BLButton from './Button.vue'
import { Component, Vue, toNative,Prop,Inject,Watch } from 'vue-facing-decorator'
import type { BLUIBuilder, IUIDefinition } from '@/core/domain/interfaces/IBLUIOperationHelper';
import type { BLUIElement } from '@/core/domain/BLUIElement';

@Component({
    components:{
        BLButton,
        BLToolButton
    }
}
   
)
class buttonGroup extends Vue {

    @Prop()
    public UiElement!:any
    @Prop()
    public isGrid!:any
    @Prop()
    public Def!:BLUIBuilder


    mounted(){


    }

}

//console.log("button",props.UiElement)
export default toNative(buttonGroup)
</script>

<template>
    <div class="d-flex gap-3 align-center flex-column flex-wrap flex-xl-nowrap flex-sm-row fill-height">
        <div v-for="com in UiElement.children">
            <div v-if="com.elementType == 'Button'">
                <BLToolButton v-if="com.iconCss !=null && com.iconCss !=''" :UiElement="com" :Def="Def"/>
                <BLButton v-else :UiElement="com" :Def="Def"/>
            </div>
            
        </div>
        
    </div>
</template>

<style></style>