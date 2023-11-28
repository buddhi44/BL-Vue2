<script setup lang="ts">
import { RouterLink } from 'vue-router';
import bl_logo from '../../../assets/images/bl-logo.svg'
</script>
<template>
    <div class="logo">
        <RouterLink to="/" class="d-flex justify-content-center align-items-center">
            <img :src="bl_logo" alt="home" style="width:50%"/>
        </RouterLink>
    </div>
</template>
