<template>
  <div>
    <h1>Редактировать пост</h1>
    <form @submit.prevent="updatePost">
      <label>Заголовок:</label>
      <input v-model="form.title" required />

      <label>Описание:</label>
      <textarea v-model="form.body" required />

      <label>Ссылка на изображение:</label>
      <input v-model="form.image" type="url" />

      <div v-if="form.image">
        <img :src="form.image" alt="preview" style="max-width: 300px;" />
      </div>

      <button type="submit">Сохранить</button>
    </form>
  </div>
</template>

<script setup>
const route = useRoute()
const router = useRouter()
const id = route.params.id

const { data: post } = await useFetch(`http://localhost:3000/posts/${id}`)

const form = reactive({
  title: post.value?.title || '',
  body: post.value?.body || '',
  image: post.value?.image || ''
})

const updatePost = async () => {
  await $fetch(`http://localhost:3000/posts/${id}`, {
    method: 'PUT',
    body: form
  })
  router.push(`/posts/${id}`)
}
</script>