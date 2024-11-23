<script setup lang="ts">
import { Button } from '@/components/ui/button';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { userRegisterShema, type User } from '@/contracts/user';
import { toTypedSchema } from '@vee-validate/zod';
import { useForm } from 'vee-validate';

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
        <RouterLink :to="{ name: '/login' }">login</RouterLink>
      </div>
      <Button type="submit">Submit</Button>
    </div>
  </form>
</template>
