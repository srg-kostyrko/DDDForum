<script setup lang="ts">
const posts = [
  {
    id: 1,
    title: 'First Post',
    votes: 5,
    date: Date.now(),
    author: 'username',
    comments: 2,
  },
  {
    id: 2,
    title: 'Second Post',
    votes: 5,
    date: Date.now(),
    author: 'username',
    comments: 2,
  },
];
</script>
<template>
  <div class="flex mb-4 divide-x divide-gray-400">
    <div class="active px-4">Popular</div>
    <div class="active px-4">New</div>
  </div>

  <div v-for="post in posts" :key="post.id" class="flex gap-2 mb-4">
    <div class="flex flex-col gap-2 items-center mr-4">
      <div class="post-item-upvote">
        <img src="../assets/arrow.svg" />
      </div>
      <div>{{ post.votes }}</div>
      <div class="post-item-downvote rotate-180">
        <img src="../assets/arrow.svg" />
      </div>
    </div>
    <div>
      <div class="font-xl font-bold">{{ post.title }}</div>
      <div class="flex items-center divide-x divide-gray-400">
        <div class="pr-4">2 days ago</div>
        <RouterLink
          :to="{ name: '/memeber/[username]', params: { username: post.author } }"
          class="px-4"
        >
          by {{ post.author }}
        </RouterLink>
        <div class="px-4">{{ post.comments }} comments</div>
      </div>
    </div>
  </div>
</template>
