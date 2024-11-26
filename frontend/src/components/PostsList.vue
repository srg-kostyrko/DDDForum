<script setup lang="ts">
import { useQuery } from '@tanstack/vue-query';
import { UseTimeAgo } from '@vueuse/components';

const { data } = useQuery({
  queryKey: ['posts'],
  queryFn: async () => {
    const request = await fetch('/api/posts?sort=recent');
    const json = await request.json();
    if (request.ok && json.success) {
      console.log(json);
      return json.data;
    }
    throw new Error(json.error);
  },
});
</script>
<template>
  <div class="flex mb-4 divide-x divide-gray-400">
    <div class="active px-4">Popular</div>
    <div class="active px-4">New</div>
  </div>
  <div v-for="post in data" :key="post.id" class="flex gap-2 mb-4">
    <div class="flex flex-col gap-2 items-center mr-4">
      <div class="post-item-upvote">
        <img src="../assets/arrow.svg" />
      </div>
      <div>{{ post.votes.length }}</div>
      <div class="post-item-downvote rotate-180">
        <img src="../assets/arrow.svg" />
      </div>
    </div>
    <div>
      <div class="font-xl font-bold">{{ post.title }}</div>
      <div class="flex items-center divide-x divide-gray-400">
        <div class="pr-4">
          <UseTimeAgo v-slot="{ timeAgo }" :time="post.dateCreated"> {{ timeAgo }} </UseTimeAgo>
        </div>
        <RouterLink
          :to="{ name: '/memeber/[username]', params: { username: post.member.user.username } }"
          class="px-4"
        >
          by {{ post.member.user.username }}
        </RouterLink>
        <div class="px-4">{{ post.comments.length }} comments</div>
      </div>
    </div>
  </div>
</template>
