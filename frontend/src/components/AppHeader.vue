<script setup lang="ts">
import { useUserStore } from '@/stores/user.store';
import { storeToRefs } from 'pinia';
import AppLink from './AppLink.vue';

const userStore = useUserStore();
const { user } = storeToRefs(userStore);
</script>

<template>
  <header class="flex justify-center items-center gap-4">
    <div class="max-w-16">
      <AppLink to="/">
        <img src="/dddforumlogo.png" />
      </AppLink>
    </div>
    <div>
      <h1 class="text-3xl font-bold">Domain-Driven Designers</h1>
      <h3 class="text-lg font-bold">Where awesome domain driven designers are made</h3>
      <AppLink to="/submit">submit</AppLink>
    </div>
    <div>
      <div v-if="user">
        <div>{{ user.username }}</div>
        <u>
          <div>logout</div>
        </u>
      </div>
      <AppLink v-else to="/register">Join</AppLink>
    </div>
  </header>
</template>
