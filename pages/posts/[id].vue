<template>
  <div v-if="post">
    <h1>{{ post.title }}</h1>
    <p>{{ post.body }}</p>

    <div style="margin-top: 20px;">
      <NuxtLink :to="`/posts/edit/${post.id}`">
        <button style="margin-right: 10px;">Редактировать</button>
      </NuxtLink>
      <button @click="showModal = true">Удалить</button>
    </div>
  </div>

  <p v-else>Загрузка...</p>

  <ConfirmModal
    :show="showModal"
    @confirm="deletePost"
    @cancel="showModal = false"
  />
</template>

<script setup>
import ConfirmModal from '~/components/ConfirmModal.vue'

const route = useRoute()
const router = useRouter()

const showModal = ref(false)

const { data: post } = await useAsyncData(() =>
  $fetch(`http://localhost:3000/posts/${route.params.id}`)
)

const deletePost = async () => {
  await $fetch(`http://localhost:3000/posts/${route.params.id}`, {
    method: 'DELETE'
  })
  router.push('/posts')
}
</script>

<style scoped lang="scss">
h1 {
  margin-bottom: 0.5rem;
}
section {
  margin-top: 2rem;
  background: #f7f7f7;
  padding: 1rem;
  border-radius: 8px;
}
</style>