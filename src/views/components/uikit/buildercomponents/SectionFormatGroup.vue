<script setup lang="ts">
import {ref,onMounted,defineComponent} from 'vue'
import UIBuilder from '../UIBuilder.vue'

const props = defineProps(["Parent","ComponentList"])

const myComponent = ref<any>(undefined)

onMounted(()=>{
    myComponent.value = props.ComponentList.find((itm)=>{
        return itm.elementKey = props.Parent
    })
})

</script>

<template>
    <div>
        <p>Section Format Group</p>
        <UIBuilder :ContentList="ComponentList" :Parent="Parent" />
    </div>
</template>
