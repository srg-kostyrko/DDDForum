<script setup lang="ts">
import { computed } from 'vue';
import { RouterLink, type RouterLinkProps } from 'vue-router';

defineOptions({
  inheritAttrs: false,
});

const props = defineProps<RouterLinkProps>();
</script>

<template>
  <router-link v-bind="$props" custom v-slot="{ isActive, href, navigate }">
    <a v-bind="$attrs" :href="href" @click="navigate" class="text-blue-500">
      <slot />
    </a>
  </router-link>
</template>
