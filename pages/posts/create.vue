<template>
  <div class="create-post">
    <h1 class="create-post__title">Создание поста</h1>
    <form class="create-post__form" @submit.prevent="createPost">
      <input
        v-model="title"
        class="create-post__input"
        type="text"
        placeholder="Заголовок"
        required
      />
      <textarea
        v-model="body"
        class="create-post__textarea"
        placeholder="Описание"
        required
      ></textarea>
      <input
        v-model="image"
        class="create-post__input"
        type="text"
        placeholder="Путь изображения"
        required
      />
      <button type="submit" class="create-post__button">Создать пост</button>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'

useHead({
  title: 'Создание поста',
  meta: [
    { name: 'description', content: 'Создайте новый пост' },
  ]
})

const title = ref('')
const body = ref('')
const image = ref('')

const createPost = async () => {
  await $fetch('http://localhost:3000/posts', {
    method: 'POST',
    body: { title: title.value, body: body.value, image:image.value  }
  })
  navigateTo('/posts')
}
</script>

<style scoped lang="scss">
.create-post {
  max-width: 600px;
  margin: 2rem auto;
  padding: 2rem;
  background-color: #ffffff;
  border-radius: 16px;
  box-shadow: 0 0 12px rgba(0, 0, 0, 0.05);

  &__title {
    font-size: 1.8rem;
    font-weight: bold;
    margin-bottom: 1.5rem;
    text-align: center;
  }

  &__form {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  &__input,
  &__textarea {
    padding: 0.8rem 1rem;
    border: 1px solid #ccc;
    border-radius: 8px;
    font-size: 1rem;
    width: 100%;
    box-sizing: border-box;
  }

  &__textarea {
    resize: vertical;
    min-height: 120px;
  }

  &__button {
    background-color: #4caf50;
    color: white;
    padding: 0.8rem;
    font-size: 1rem;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    transition: background-color 0.3s;

    &:hover {
      background-color: #43a047;
    }
  }
}
</style>