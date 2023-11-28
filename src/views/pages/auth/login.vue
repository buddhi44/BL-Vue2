
<script setup lang="ts">

import { ref, reactive, onMounted } from 'vue';
//import { Form, Field } from 'vee-validate';
//import * as Yup from 'yup';

import LoginForm from '@/views/components/auth/LoginForm.vue';
import Logo from '@/views/layouts/logo/Logo.vue';


</script>

<template>
  <div class="authentication">
      <v-container fluid class="pa-3">
          <v-row class="h-100vh d-flex justify-center align-center">
              <v-col cols="12" class="d-flex align-center">
                  <div class="boxed-auth-wrap m-auto">
                      <v-card rounded="xl" elevation="10" class="px-sm-1 px-0  mx-auto index-2" max-width="450">
                          <v-card-item class="pa-sm-8">
                              <div class="d-flex justify-center mb-5">
                                  <Logo />
                              </div>

                              <LoginForm />
                              
                          </v-card-item>
                      </v-card>
                  </div>
              </v-col>
          </v-row>

      </v-container>
  </div>
</template>