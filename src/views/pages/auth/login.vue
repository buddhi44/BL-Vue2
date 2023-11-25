
<template>
  
  <div class="justify-center align-center ma-">
    
    <v-img
        class="mx-auto my-6"
        width="300"
        :aspect-ratio="1"
        :src="bl_logo"
      ></v-img>
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
        v-model="username"
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
        v-model="password"
        @click:append-inner="visible = !visible"
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
        @click="()=>LoginNow()"
      >
        Log In
      </v-btn>
    </v-card>
  </div>

</template>


<script setup lang="ts">
import type {IAuthenticationManager} from '../../../managers/authentication/IAuthenticationManager'
import { ref,inject } from 'vue';
import bl_logo from '../../../assets/bl360.png'
const visible = ref(false);

const authManager:IAuthenticationManager = inject("AuthenticationManager")

const username = ref("")
const password = ref("")

async function  LoginNow(){
  if(username.value != null && username.value != undefined && username.value != ""){
    if(password.value != null && password.value != undefined && password.value != ""){
      var tokenResult = await authManager.authenticate({
        UserName:username.value,
        Password:password.value
      })
      console.log(tokenResult)
    }else{
      alert("Please enter Valid Password!")
    }
  }else{
    alert("Please Insert Valid Username!")
  }
}
</script>