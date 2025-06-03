<template>
  <div class="post-card">
    <img v-if="post.image" :src="post.image" alt="Post image" class="post-card__image" />
    <h2 class="post-card__title">{{ post.title }}</h2>
    <p class="post-card__description">{{ post.body }}</p>
    <NuxtLink :to="`/posts/${post.id}`" class="post-card__link">
      Читать далее →
    </NuxtLink>
  </div>
</template>

<script setup>
defineProps(['post'])
</script>

<style scoped lang="scss">
.post-card {
  background-color: #ffffff;
  border-radius: 1.5rem;
  padding: 1.5rem;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.04);
  transition: transform 0.2s;
  margin-bottom: 2rem;
  overflow: hidden;
  width: 450px;
  margin: 0 auto;
  margin-bottom: 40px;

  &:hover {
    transform: translateY(-4px);
  }

  &__image {
    width: 100%;
    height: 200px;
    object-fit: cover;
    border-radius: 1rem;
    margin-bottom: 1rem;
  }

  &__title {
    font-size: 1.4rem;
    font-weight: 600;
    margin-bottom: 0.75rem;
    color: #222;
  }

  &__description {
    font-size: 1rem;
    color: #666;
    margin-bottom: 1rem;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  &__link {
    font-size: 0.95rem;
    color: #0070f3;
    text-decoration: none;
    font-weight: 500;

    &:hover {
      text-decoration: underline;
    }
  }
}
</style>  