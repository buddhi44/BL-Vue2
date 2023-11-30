<script setup lang="ts">
import { UserIcon, MailIcon, ListCheckIcon } from 'vue-tabler-icons';
import { useAuthStore } from '@/stores/authstore';
import { StorageConstant } from '@/core/application/constant/storag_econstants';
import { ref,shallowRef } from 'vue';

const authStore = useAuthStore();
const localUsrName=ref<any>(localStorage.getItem(StorageConstant.UserName));
const localCompany=ref<any>(localStorage.getItem(StorageConstant.CompanyName));

let usrname=ref<string>(localUsrName.value??"")
let company = ref<string>(localCompany.value??"")
usrname=shallowRef(usrname.value.replace(/^"|"$/g, ''))
company=shallowRef(company.value.replace(/^"|"$/g, ''))

</script>

<template>
    <!-- ---------------------------------------------- -->
    <!-- notifications DD -->
    <!-- ---------------------------------------------- -->
    <v-menu :close-on-content-click="false">
        <template v-slot:activator="{ props }">
            <v-list-item
                :title=usrname
                :subtitle=company
          >
            <template v-slot:append>
                <v-btn class="" variant="text" v-bind="props" icon>
                <v-avatar size="35">
                    <img src="@/assets/images/user-1.jpg" height="35" alt="user" />
                </v-avatar>
            </v-btn>
            </template>
          </v-list-item>
            
        </template>
        <v-sheet rounded="xl" width="200" elevation="10" class="mt-2">
            <v-list class="py-0" lines="one" density="compact">
                <v-list-item value="item1" color="primary" >
                    <template v-slot:prepend>
                        <UserIcon stroke-width="1.5" size="20"/>
                    </template>
                    <v-list-item-title class="pl-4 text-body-1">My Profile</v-list-item-title>
                </v-list-item>
                <v-list-item value="item2" color="primary">
                    <template v-slot:prepend>
                        <MailIcon stroke-width="1.5" size="20"/>
                    </template>
                    <v-list-item-title  class="pl-4 text-body-1">My Account</v-list-item-title>
                </v-list-item>
                <v-list-item value="item3" color="primary"> 
                    <template v-slot:prepend>
                        <ListCheckIcon stroke-width="1.5"  size="20"/>
                    </template>
                    <v-list-item-title class="pl-4 text-body-1">My Task</v-list-item-title>
                </v-list-item>
            </v-list>
            <div class="pt-4 pb-4 px-5 text-center">
                <v-btn to="" color="primary" variant="outlined" class="rounded-pill" block @click="authStore.logout()">Logout</v-btn>
            </div>
        </v-sheet>
    </v-menu>
</template>
