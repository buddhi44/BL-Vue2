<script setup lang="ts">
import {ref,onMounted,defineComponent} from 'vue'
import UIBuilder from '../UIBuilder.vue'

const props = defineProps(["Parent","ComponentList","actionTriggers"])

const myComponent = ref<any>(undefined)

onMounted(()=>{
    myComponent.value = props.ComponentList.find((itm:any)=>{
        return itm.elementKey = props.Parent
    })
})

</script>

<template>
    <v-row>
        <UIBuilder :actionTriggers="actionTriggers" :isGrid="true" :ContentList="ComponentList" :Parent="Parent" />
    </v-row>
</template>
