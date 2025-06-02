<template>
  <form @submit.prevent="createPost">
    <input v-model="title" placeholder="Заголовок" required />
    <textarea v-model="body" placeholder="Описание" required></textarea>
    <button type="submit">Создать пост</button>
  </form>
</template>

<script setup>
const title = ref('')
const body = ref('')

const createPost = async () => {
  await $fetch('http://localhost:3000/posts', {
    method: 'POST',
    body: { title: title.value, body: body.value }
  })
  navigateTo('/posts')
}
</script>