<script setup lang="ts">
import { Button } from '@/components/ui/button';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { userRegisterShema, type User } from '@/contracts/user';
import { toTypedSchema } from '@vee-validate/zod';
import { useForm } from 'vee-validate';
import AppLink from './AppLink.vue';
import { Loader2 } from 'lucide-vue-next';

defineProps<{
  isPending: boolean;
}>();
const emit = defineEmits<{
  submit: [User];
}>();

const formSchema = toTypedSchema(userRegisterShema);
const form = useForm({
  validationSchema: formSchema,
});

const onSubmit = form.handleSubmit((values) => {
  emit('submit', values);
});
</script>

<template>
  <form class="flex flex-col gap-2" @submit.prevent="onSubmit">
    <FormField v-slot="{ componentField }" name="email">
      <FormItem>
        <FormLabel>Email</FormLabel>
        <FormControl>
          <Input type="text" v-bind="componentField" />
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>
    <FormField v-slot="{ componentField }" name="username">
      <FormItem>
        <FormLabel>Username</FormLabel>
        <FormControl>
          <Input type="text" v-bind="componentField" />
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>
    <FormField v-slot="{ componentField }" name="firstName">
      <FormItem>
        <FormLabel>First name</FormLabel>
        <FormControl>
          <Input type="text" v-bind="componentField" />
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>
    <FormField v-slot="{ componentField }" name="lastName">
      <FormItem>
        <FormLabel>Last name</FormLabel>
        <FormControl>
          <Input type="text" v-bind="componentField" />
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>
    <div class="flex justify-between">
      <div class="to-login">
        <div>Already have an account?</div>
        <AppLink :to="{ name: '/login' }">login</AppLink>
      </div>
      <Button :disabled="isPending" type="submit">
        <Loader2 v-if="isPending" class="mr-2 h-4 w-4 animate-spin" />
        <span v-else>Submit</span>
      </Button>
    </div>
  </form>
</template>
