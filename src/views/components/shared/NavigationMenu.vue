<template>
    <v-navigation-drawer v-model="isOpenDrawer">
        <v-list-item prepend-icon="mdi-view-dashboard" link title="List Item 1"></v-list-item>
        <v-list-item prepend-icon="mdi-forum" link title="List Item 2"></v-list-item>
        <v-expansion-panels>
            <v-expansion-panel title="panel title">
                <v-list>
                    <v-list-item title="hello" />
                </v-list>
            </v-expansion-panel>
        </v-expansion-panels>
    </v-navigation-drawer>
</template>

<script setup lang="ts">
import {ref} from 'vue'

const isOpenDrawer = ref(true)
</script>

<style>
</style>