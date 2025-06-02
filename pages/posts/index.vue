<template>
  <div>
    <h1>Все посты</h1>
    <PostCard v-for="post in posts" :key="post.id" :post="post" />
  </div>
</template>

<script setup>
const { data: posts } = await useAsyncData('allPosts', () =>
  $fetch('http://localhost:3000/posts')
)
</script>