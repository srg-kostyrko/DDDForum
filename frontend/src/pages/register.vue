<script setup lang="ts">
import { useUserStore } from '@/stores/user.store';
import { type User } from '@/contracts/user';
import { useRouter } from 'vue-router';
import { toast } from '@/components/ui/toast';
import { useRegisterMutation } from '@/api';
import UserRegisterForm from '@/components/UserRegisterForm.vue';

const router = useRouter();
const userStore = useUserStore();

const { register, isPending } = useRegisterMutation();

const onSubmit = async (values: User) => {
  try {
    await register(values);
    userStore.user = values;
    toast({
      title: 'Success!',
      description: 'Redirecting home',
      onOpenChange(value) {
        if (!value) {
          router.push({ name: '/' });
        }
      },
      duration: 3000,
    });
  } catch (error) {
    toast({
      title: 'Uh oh! Something went wrong.',
      description: error instanceof Error ? error.message : String(error),
      variant: 'destructive',
    });
  }
};
</script>
<template>
  <div class="max-w-4xl w-lg m-auto">
    <h3 class="text-bold mb-2">Create Account</h3>
    <UserRegisterForm :is-pending="isPending" @submit="onSubmit" />
  </div>
</template>
