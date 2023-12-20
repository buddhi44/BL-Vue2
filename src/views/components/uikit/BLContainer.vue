<script lang="ts">
import { Component, Vue, toNative,Prop,Inject,Watch, Ref } from 'vue-facing-decorator'

class blContainer extends Vue {
    @Prop()
    public isGrid!:any
    @Prop()
    public width!:any
}


export default toNative(blContainer)
</script>

<template>
    <v-col v-if="isGrid" :cols="width">
        <slot></slot>
    </v-col>
    <template v-if="!isGrid">
        <slot></slot>
    </template>
</template>

<style></style>