<template>
  <div class="post-card">
    <h3>{{ post.title }}</h3>
    <p>{{ post.description }}</p>
    <NuxtLink :to="`/posts/${post.id}`">Читать далее</NuxtLink>
  </div>
</template>

<script setup>
defineProps({
  post: {
    type: Object,
    required: true
  }
})
</script>

<style scoped lang="scss">
.post-card {
  border: 1px solid #ddd;
  padding: 1rem;
  border-radius: 8px;
  margin-bottom: 1rem;
}
</style>
