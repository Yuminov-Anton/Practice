<template>
  <div v-if="visible" class="modal-overlay">
    <div class="modal">
      <h2>Редактировать пост</h2>
      <form @submit.prevent="submit">
        <label>Заголовок:</label>
        <input v-model="localPost.title" type="text" />

        <label>Описание:</label>
        <textarea v-model="localPost.body" rows="4" />

        <label>Картинка (URL):</label>
        <input v-model="localPost.image" type="text" />

        <div class="buttons">
          <button type="submit">Сохранить</button>
          <button type="button" @click="close">Отмена</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  post: { id: number; title: string; body: string; image?: string }
  visible: boolean
}>()
const emit = defineEmits(['close', 'updated'])

const localPost = ref({ ...props.post })

watch(() => props.post, () => {
  localPost.value = { ...props.post }
})

const close = () => {
  emit('close')
}

const submit = async () => {
  await $fetch(`http://localhost:3000/posts/${props.post.id}`, {
    method: 'PUT',
    body: localPost.value,
  })
  emit('updated', localPost.value)
  close()
}
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal {
  background: white;
  padding: 2rem;
  border-radius: 12px;
  max-width: 500px;
  width: 100%;
}

.modal input,
.modal textarea {
  width: 100%;
  padding: 0.5rem;
  margin: 0.5rem 0 1rem;
  border: 1px solid #ccc;
  border-radius: 8px;
}

.buttons {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
}
</style>