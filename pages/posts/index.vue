<template>
  <div>
    <h1>Все посты</h1>
    <div class="flex">
      <PostCard v-for="post in posts" :key="post.id" :post="post" />
    </div>
    <div class="pagination">
      <button
        v-for="page in totalPages"
        :key="page"
        :class="{ active: page === currentPage }"
        @click="goToPage(page)"
      >
        {{ page }}
      </button>
    </div>
  </div>
</template>

<script setup>
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
.pagination {
  margin-top: 20px;
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