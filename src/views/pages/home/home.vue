<script setup lang="ts">
import { storeToRefs } from 'pinia';

import { useAuthStore } from '@/stores/authstore';

const authStore = useAuthStore();
const { authToken: string } = storeToRefs(authStore);

</script>

<template>
    <div>
        <h1>Hi </h1>
        <p>You're logged in with Vue 3 + Pinia & JWT!!</p>
        <h3>Users from secure api end point:</h3>
    </div>
</template>