
<script setup lang="ts">
import { ref, shallowRef } from 'vue';
import Icon from '../vertical-sidebar/Icon.vue';

const props = defineProps({ sidebarMenu:Object,level: Number});
var menu=ref<any>(props.sidebarMenu)
console.log(props.sidebarMenu)

</script>

<template>
    <!-- <v-list class="py-4 px-4 bg-containerBg">
        <v-list-item prepend-icon="mdi-home" title="Home"></v-list-item>
    </v-list>
    <hr/> -->
    <v-list class="py-4 px-4 bg-containerBg">
      
      <div v-for="(m, i) in menu.subMenus">
        
        <v-list-group 
          v-if="m.subMenus.length>0"
          :value="m?.menuCaption">
            <template v-slot:activator="{ props }">
            <v-list-item
                v-bind="props"
                prepend-icon="mdi mdi-apple-keyboard-command"
                :title="m?.menuCaption"
            ></v-list-item>
            
            </template>

            <SideMenu :sidebarMenu="m"/>

        </v-list-group>

          <div class="mb-1" v-else-if="m.parentId>0" >
            <v-list-item  :value="m?.menuCaption"
                      :to="`${m.controllerName.toLowerCase()}/${m.controllerAction.toLowerCase()}?ElementKey=${m.menuId}`" 
                      rounded
                      :class="'bg-hover-primary'" 
                      :color="'primary'" 
                      :ripple="false" >
            <!---If icon-->
            <template v-slot:prepend>
                <div :class="'navbox bg-hover-primary'" :color="'primary'">
                    <span class="icon-box">
                        <Icon :item="'BoxMultiple1Icon'" :level="level" :class="'position-relative z-index-2 texthover-primary'" />
                    </span>
                </div>
            </template>
            <v-list-item-title class="text-subtitle-1 font-weight-medium" :color="'primary'">{{ m.menuCaption}}</v-list-item-title>
            
        </v-list-item>
        </div>
      </div>
      
    </v-list> 
</template>

