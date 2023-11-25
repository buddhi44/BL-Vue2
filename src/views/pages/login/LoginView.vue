<script setup lang="ts">
import {inject} from 'vue'
import type {IAuthenticationManager} from '../../../managers/authentication/IAuthenticationManager'
const authManager:IAuthenticationManager = inject("AuthenticationManager")

async function authenticate(){
  var res = await authManager.authenticate({
    UserName:'Gayantha.BL',
    Password:'gayanu.AMB1'
  })
  console.log(res)
}

</script>

<template>
  <main>
    <input type="text" name="username"/>
    <input type="password" name="password"/>
<button @click="() => authenticate()">test 2</button>
  </main>
</template>
