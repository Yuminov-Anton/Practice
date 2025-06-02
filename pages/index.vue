<template>
  <div class="home">
    <h1 class="home__title">Последние посты</h1>
    <div class="home__posts">
      <PostCard v-for="post in posts" :key="post.id" :post="post" />
    </div>
    <NuxtLink to="/posts" class="home__more-link">Смотреть все посты →</NuxtLink>
  </div>
</template>

<script setup>
const { data: posts } = await useAsyncData('homePosts', () =>
  $fetch('http://localhost:3000/posts?_limit=3')
)
</script>

<style scoped lang="scss">
.home {
  &__title {
    font-size: 2rem;
    font-weight: bold;
    margin-bottom: 2rem;
    text-align: center;
    color: #222;
  }

  &__posts {
    display: flex;
    gap: 1rem;
  }

  &__more-link {
    display: block;
    margin: 2rem auto 0;
    text-align: center;
    font-weight: 500;
    color: #0070f3;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
}
</style>