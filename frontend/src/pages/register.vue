<script setup lang="ts">
import { toTypedSchema } from '@vee-validate/zod';
import * as z from 'zod';
import { useForm } from 'vee-validate';
import { Button } from '@/components/ui/button';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';

const formSchema = toTypedSchema(
  z.object({
    email: z.string().email(),
    username: z.string().min(2).max(255),
    firstname: z.string().min(2).max(255),
    lastname: z.string().min(2).max(255),
  }),
);

const form = useForm({
  validationSchema: formSchema,
});

const onSubmit = form.handleSubmit((values) => {
  console.log('Form submitted!', values);
});
</script>
<template>
  <div class="max-w-4xl w-lg m-auto">
    <h3 class="text-bold mb-2">Create Account</h3>
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
      <FormField v-slot="{ componentField }" name="firstname">
        <FormItem>
          <FormLabel>First name</FormLabel>
          <FormControl>
            <Input type="text" v-bind="componentField" />
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>
      <FormField v-slot="{ componentField }" name="lastname">
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
  </div>
</template>
