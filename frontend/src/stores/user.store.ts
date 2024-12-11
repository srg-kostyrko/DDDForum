import { ref } from 'vue';
import { defineStore } from 'pinia';
import type { User } from '@/contracts/user';

export const useUserStore = defineStore('user', () => {
  const user = ref<User | null>(null);

  return { user };
});
