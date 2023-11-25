
<script setup lang="ts">

import { ref, reactive, onMounted } from 'vue';
//import { Form, Field } from 'vee-validate';
//import * as Yup from 'yup';

import bl_logo from '../../../assets/bl360.png'
import { useAuthStore } from '@/stores/authstore';

const visible = ref(false);
const initialState = {
    usrname: '',
    password: '',
  }

  const state = reactive({
    ...initialState,
  })

// const schema = Yup.object().shape({
//     username: Yup.string().required('Username is required'),
//     password: Yup.string().required('Password is required')
// });

const onSubmit = () => 
{
  const authStore = useAuthStore();

  return authStore.login(state.usrname, state.password);
};
</script>

<template>
  
  <div class="justify-center align-center">
    
    <v-img
        class="mx-auto my-6"
        width="300"
        :aspect-ratio="1"
        :src="bl_logo"
      ></v-img>

    <form>

      <v-card
      class="mx-auto pa-12 pb-8"
      elevation="8"
      max-width="448"
      rounded="lg"
    >
      <div class="text-subtitle-1 text-medium-emphasis">Account</div>

      <v-text-field
        density="compact"
        placeholder="Email address"
        prepend-inner-icon="mdi-email-outline"
        variant="outlined"
        v-model="state.usrname"
      ></v-text-field>

      <div class="text-subtitle-1 text-medium-emphasis d-flex align-center justify-space-between">
        Password

        <a
          class="text-caption text-decoration-none text-blue"
          href="#"
          rel="noopener noreferrer"
          target="_blank"
        >
          Forgot login password?</a>
      </div>

      <v-text-field
        :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
        :type="visible ? 'text' : 'password'"
        density="compact"
        placeholder="Enter your password"
        prepend-inner-icon="mdi-lock-outline"
        variant="outlined"
        @click:append-inner="visible = !visible"
        v-model="state.password"
      ></v-text-field>

      <v-card
        class="mb-12"
        color="surface-variant"
        variant="tonal"
      >
        
      </v-card>

      <v-btn
        block
        class="mb-8"
        color="blue"
        size="large"
        variant="tonal"
        @click="onSubmit"
      >
        Log In
      </v-btn>
    </v-card>

    </Form>
    
  </div>

</template>


