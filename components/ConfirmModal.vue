<template>
  <div class="modal-backdrop" @click.self="onCancel">
    <div class="modal">
      <p>{{ message }}</p>
      <div class="modal-buttons">
        <button class="confirm" @click="onConfirm">Да, удалить</button>
        <button @click="onCancel">Отмена</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  message: string
  onConfirm: () => void
  onCancel: () => void
}>()
</script>

<style scoped>
.modal-backdrop {
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
  padding: 20px;
  border-radius: 8px;
  text-align: center;
  min-width: 300px;
}

.modal-buttons {
  margin-top: 15px;
  display: flex;
  justify-content: space-around;
  gap: 10px;
}

.confirm {
  background: #e74c3c;
  color: white;
  padding: 6px 12px;
  border: none;
  border-radius: 4px;
}
</style>