<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router';
import AppHeader from './components/AppHeader.vue';
</script>

<template>
  <div class="container">
    <AppHeader />
    <main>
      <RouterView />
    </main>
  </div>
</template>
