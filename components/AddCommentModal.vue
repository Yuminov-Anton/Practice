<template>
  <div class="modal-overlay" @click.self="$emit('close')">
    <div class="modal">
      <h3>Добавить комментарий</h3>
      <form @submit.prevent="submit">
        <textarea
          v-model="text"
          placeholder="Напишите комментарий..."
          required
        ></textarea>
        <div class="actions">
          <button type="submit">Отправить</button>
          <button type="button" @click="$emit('close')">Отмена</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  postId: number
}>()

const emit = defineEmits(['close', 'submitted'])

const text = ref('')

const submit = async () => {
  if (!text.value.trim()) return

  try {
    const newComment = await $fetch('http://localhost:3000/comments', {
      method: 'POST',
      body: {
        postId: props.postId,
        text: text.value.trim()
      }
    })
    emit('submitted', newComment)
    emit('close')
    text.value = ''
  } catch (e) {
    alert('Ошибка при добавлении комментария')
  }
}
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal {
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  width: 90%;
  max-width: 400px;
}

textarea {
  width: 100%;
  padding: 0.5rem;
  border-radius: 8px;
  margin-bottom: 1rem;
  resize: vertical;
  border: 1px solid #ccc;
  min-height: 80px;
}

.actions {
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
}

button {
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 8px;
  cursor: pointer;
}

button[type="submit"] {
  background: #4caf50;
  color: white;
}

button[type="button"] {
  background: #ccc;
}
</style>