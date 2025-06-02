<template>
  <div>
    <h1>Главная</h1>
    <PostCard v-for="post in posts" :key="post.id" :post="post" />
    <NuxtLink to="/posts">Смотреть все посты</NuxtLink>
  </div>
</template>

<script setup>
const { data: posts } = await useAsyncData('homePosts', () =>
  $fetch('http://localhost:3000/posts?_limit=3')
)
</script>

<style scoped lang="scss">
h1 {
  margin-bottom: 1rem;
}
</style>
