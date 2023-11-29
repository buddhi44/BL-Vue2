<script setup lang="ts">
import { ref, shallowRef,onMounted,onActivated } from 'vue';
import sidebarItems from './vertical-sidebar/sidebarItem';
import SideMenu from './vertical-sidebar/SideMenu.vue';
import Logo from './logo/Logo.vue';
// Icon Imports
import { Menu2Icon, BellRingingIcon,Logout2Icon,HomeIcon } from 'vue-tabler-icons';
import NotificationDD from './vertical-header/NotificationDD.vue';
import ProfileDD from './vertical-header/ProfileDD.vue';

const sidebarMenu = shallowRef(sidebarItems);
const sDrawer = ref(true);

</script>

<template>
    <v-navigation-drawer left v-model="sDrawer" app class="leftSidebar ml-sm-5 mt-sm-5 bg-containerBg" elevation="10"
        width="270">
        <div class="pa-5 pl-4 ">
            <Logo />
        </div>
        <div class="py-0 px-6">
                <v-btn class="mr-2 bg-primary rounded-pill" size="large"
                    href="https://www.bluelotus360.com/" block target="_blank">Blue Lotus 360</v-btn>
        </div>
        <perfect-scrollbar class="scrollnavbar bg-containerBg overflow-y-hidden">
              
            <v-list class="py-4 px-4 bg-containerBg">
                <v-list-item  value="Home"
                      to="/" 
                      rounded
                      :class="'bg-hover-primary'" 
                      :color="'primary'" 
                      :ripple="false" >
            
                    <template v-slot:prepend>
                        <div :class="'navbox bg-hover-primary'" :color="'primary'">
                            <span class="icon-box">
                                <HomeIcon size="20" stroke-width="1.5" />
                            </span>
                        </div>
                    </template>
                    <v-list-item-title class="text-subtitle-1 font-weight-medium" :color="'primary'">Home</v-list-item-title>
            
                </v-list-item>
            </v-list>
            <SideMenu :sidebarMenu="sidebarMenu"/>
            
        </perfect-scrollbar>

    </v-navigation-drawer>
    <div class="container verticalLayout">
        <div class="maxWidth">
            <v-app-bar elevation="0" height="70">
                <div class="d-flex align-center justify-space-between w-100">
                    <div>
                        <v-btn class="hidden-lg-and-up text-muted" 
                               @click="sDrawer = !sDrawer" icon
                               variant="flat" size="small">
                            <Menu2Icon size="20" stroke-width="1.5" />
                        </v-btn>

                        <NotificationDD />
                    </div>
                    <div>
                        <ProfileDD />
                    </div>
                </div>
            </v-app-bar>
        </div>
    </div>
</template>
