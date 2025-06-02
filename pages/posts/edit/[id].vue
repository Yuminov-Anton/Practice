<template>
  <div v-if="post">
    <form @submit.prevent="updatePost">
      <input v-model="title" />
      <textarea v-model="body"></textarea>
      <button type="submit">Сохранить</button>
    </form>
  </div>
</template>

<script setup>
const route = useRoute()
const router = useRouter()

const { data: post } = await useAsyncData(() =>
  $fetch(`http://localhost:3000/posts/${route.params.id}`)
)

const title = ref(post.value.title)
const body = ref(post.value.body)

const updatePost = async () => {
  await $fetch(`http://localhost:3000/posts/${route.params.id}`, {
    method: 'PUT',
    body: { title: title.value, body: body.value }
  })
  router.push(`/posts/${route.params.id}`)
}
</script>