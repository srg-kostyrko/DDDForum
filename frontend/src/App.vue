<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router';
import AppHeader from './components/AppHeader.vue';
import Toaster from '@/components/ui/toast/Toaster.vue';
</script>

<template>
  <div class="container">
    <AppHeader />
    <main>
      <RouterView />
    </main>
    <Toaster />
  </div>
</template>
