<script setup lang="ts"></script>

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
      <RouterLink to="/register">Join</RouterLink>
    </div>
  </header>
</template>
