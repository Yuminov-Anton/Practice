<template>
  <div class="post-container">
    <template v-if="pending">
      <div class="loading">
        <p>Загрузка поста...</p>
      </div>
    </template>
    
    <template v-else-if="post">
      <h1>{{ post.title }}</h1>
      <img v-if="post.image" :src="post.image" class="post-image" />
      <p>{{ post.body }}</p>
      <div class="post-buttons">
        <button class="edit" @click="openEdit">Редактировать</button>
        <button class="delete" @click="showConfirm = true">Удалить</button>
      </div>

      <EditPostModal
        v-if="post"
        :post="post"
        :visible="showModal"
        @close="showModal = false"
        @updated="handleUpdated"
      />

      <ConfirmModal
        v-if="showConfirm"
        message="Удалить пост?"
        @confirm="deletePost"
        @cancel="showConfirm = false"
      />

      <h3>Комментарии</h3>
      <div v-if="comments?.length">
        <div v-for="comment in comments" :key="comment.id" class="comment">
          {{ comment.text }}
        </div>
      </div>
      <div v-else>
        <em>Комментариев пока нет.</em>
      </div>

      <button @click="showAddCommentModal = true" class="add-comment-btn">
        Добавить комментарий
      </button><br><br>

      <AddCommentModal
        v-if="showAddCommentModal"
        :post-id="parseInt(postId)"
        @close="showAddCommentModal = false"
        @submitted="addLocalComment"
      />
    </template>
    
    <template v-else>
      <h2>Пост не найден</h2>
      <p>Возможно, он был удалён или вы указали неверный адрес.</p>
      <p>ID поста: {{ postId }}</p>
    </template>
    
    <button @click="$router.push('/posts')" class="back-button">
      Вернуться к постам
    </button>
  </div>
</template>

<script setup lang="ts">
watchEffect(() => {
  if (post.value) {
    useHead({
      title: `${post.value.title} - Пост`,
      meta: [
        { name: 'description', content: post.value.body?.slice(0, 160) || 'Описание поста' },
      ]
    })
  }
})

import AddCommentModal from '@/components/AddCommentModal.vue'

const showAddCommentModal = ref(false)
const route = useRoute()
const router = useRouter()

const postId = computed(() => route.params.id as string)
const showModal = ref(false)
const showConfirm = ref(false)

const { data: post, refresh, pending, error } = await useAsyncData(
  `post-${postId.value}`,
  () => $fetch(`http://localhost:3000/posts/${postId.value}`),
  {
    watch: [postId],
    server: false
  }
)

const { data: comments } = await useAsyncData(
  `comments-${postId.value}`,
  () => $fetch(`http://localhost:3000/comments?postId=${postId.value}`),
  {
    watch: [postId],
    default: () => [],
    server: false
  }
)

console.log('ID поста:', postId.value)
console.log('Загруженный пост:', post.value)
console.log('Pending:', pending.value)
console.log('Ошибка загрузки:', error.value)

watchEffect(async () => {
  if (postId.value) {
    try {
      const directFetch = await $fetch(`http://localhost:3000/posts/${postId.value}`)
      console.log('Прямой запрос к серверу:', directFetch)
    } catch (err) {
      console.log('Ошибка прямого запроса:', err)
    }
  }
})

const openEdit = () => {
  showModal.value = true
}

const handleUpdated = (updatedPost: any) => {
  post.value = updatedPost
  showModal.value = false
}

const deletePost = async () => {
  try {
    await $fetch(`http://localhost:3000/posts/${postId.value}`, {
      method: 'DELETE'
    })
    showConfirm.value = false
    router.push('/posts')
  } catch (error) {
    console.error('Ошибка при удалении поста:', error)
    alert('Не удалось удалить пост')
    showConfirm.value = false
  }
}
const addLocalComment = (newComment: { id: number; postId: number; text: string }) => {
  comments.value.push(newComment)
}
</script>

<style scoped>
.post-container {
  max-width: 600px;
  margin: auto;
  padding: 20px;
}

.post-image {
  width: 100%;
  height: auto;
  border-radius: 12px;
  margin-bottom: 1rem;
}

.post-buttons {
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
}

.edit,
.delete,
.back-button {
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 14px;
}

.edit {
  background-color: #4caf50;
  color: white;
}

.delete {
  background-color: #f44336;
  color: white;
}

.back-button {
  background-color: #2196f3;
  color: white;
}

.edit:hover,
.delete:hover,
.back-button:hover {
  opacity: 0.8;
}

.loading {
  text-align: center;
  padding: 2rem;
  font-size: 1.2rem;
}

.comment {
  background: #f4f4f4;
  padding: 1rem;
  border-radius: 8px;
  margin-bottom: 1rem;
}
.comment-form {
  margin-top: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.comment-form textarea {
  padding: 0.5rem;
  font-size: 14px;
  border-radius: 8px;
  border: 1px solid #ccc;
  resize: vertical;
  min-height: 80px;
}

.comment-form button {
  align-self: flex-start;
  background-color: #4caf50;
  color: white;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 8px;
  cursor: pointer;
}

.comment-form button:hover {
  opacity: 0.8;
}
.add-comment-btn {
  background-color: #4caf50; /* зелёный */
  color: white;
  border: none;
  border-radius: 8px;
  padding: 10px 16px;
  font-size: 14px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.add-comment-btn:hover {
  background-color: #45a049;
}

.add-comment-btn:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}
</style>