<script setup lang="ts">
defineEmits(['close'])
</script>

<template>
  <div class="modal-backdrop">
    <div class="modal" @keypress.escape="$emit('close')">
      <header class="modal-header">
        <slot name="header"> Default header</slot>
      </header>
      <section class="modal-body">
        <slot name="body"> Default body </slot>
      </section>
      <footer class="modal-footer">
        <slot name="footer"> </slot>
        <button type="button" cls="btn-green" @click="$emit('close')">Close</button>
      </footer>
    </div>
  </div>
</template>

<style scoped lang="css">
.modal-backdrop {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal {
  background: #ffffff;
  box-shadow: 2px 2px 20px 1px;
  max-height: min-content;
  display: flex;
  flex-direction: column;
}

.modal-header,
.modal-footer {
  padding: 15px;
  display: grid;
}

.modal-header {
  position: relative;
  border-bottom: 1px solid #eeeeee;
  color: #4aae9b;
  justify-content: space-between;
}

.modal-footer {
  border-top: 1px solid #eeeeee;
  flex-direction: column;
  justify-content: flex-end;
}

.modal-body {
  position: relative;
  padding: 20px 10px;
  height: fit-content;
}
</style>
