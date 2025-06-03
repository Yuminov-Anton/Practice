<template>
  <div>
    <h1 class="name">Все посты</h1>
    <div class="flex">
      <PostCard v-for="post in posts" :key="post.id" :post="post" />
    </div>
  </div>
</template>

<script setup>
useHead({
  title: 'Все посты',
  meta: [
    { name: 'description', content: 'Просмотрите все посты' },
  ]
})
const { data: posts } = await useAsyncData('allPosts', () =>
  $fetch('http://localhost:3000/posts')
)
</script>

<style scoped>
.flex{
  display: flex;
  width: 100%;
  gap: 20px;
  flex-wrap: wrap;
}
.name{
  width: 100%;
  margin: 0 auto;
  text-align: center;
  margin-bottom: 30px;
}
button {
  margin: 0 5px;
  padding: 5px 10px;
}
button.active {
  font-weight: bold;
  background-color: #eee;
}
</style>