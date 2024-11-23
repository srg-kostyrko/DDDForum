<script setup lang="ts">
import { useUserStore } from '@/stores/user.store';
import { storeToRefs } from 'pinia';

const userStore = useUserStore();
const { user } = storeToRefs(userStore);
</script>

<template>
  <header class="flex justify-center items-center gap-4">
    <div class="max-w-16">
      <RouterLink to="/">
        <img src="/dddforumlogo.png" />
      </RouterLink>
    </div>
    <div>
      <h1 class="text-3xl font-bold">Domain-Driven Designers</h1>
      <h3 class="text-lg font-bold">Where awesome domain driven designers are made</h3>
      <RouterLink to="/submit">submit</RouterLink>
    </div>
    <div>
      <div v-if="user">
        <div>{{ user.username }}</div>
        <u>
          <div>logout</div>
        </u>
      </div>
      <RouterLink v-else to="/register">Join</RouterLink>
    </div>
  </header>
</template>
