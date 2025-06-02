<template>
  <div class="modal" v-if="show">
    <div class="modal__overlay" @click="$emit('cancel')"></div>
    <div class="modal__content">
      <p class="modal__text">{{ message }}</p>
      <div class="modal__buttons">
        <button class="modal__btn modal__btn--cancel" @click="$emit('cancel')">Отмена</button>
        <button class="modal__btn modal__btn--confirm" @click="$emit('confirm')">Удалить</button>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  show: Boolean,
  message: {
    type: String,
    default: 'Вы уверены, что хотите удалить пост?'
  }
})
defineEmits(['confirm', 'cancel'])
</script>

<style scoped>
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 50;
}

.modal__overlay {
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.4);
}

.modal__content {
  position: relative;
  background: white;
  border-radius: 8px;
  padding: 20px;
  width: 300px;
  margin: 150px auto;
  z-index: 60;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
}

.modal__text {
  margin-bottom: 20px;
}

.modal__buttons {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
}

.modal__btn {
  padding: 6px 12px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.modal__btn--cancel {
  background-color: #ccc;
}

.modal__btn--confirm {
  background-color: #e74c3c;
  color: white;
}
</style>