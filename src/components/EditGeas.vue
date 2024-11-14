<script setup lang="ts">
import { ACTIVATIONS, COSTS, FLEXIBILITIES, type Geas, RANGES } from '@/types'
import { ref } from 'vue'
import VModal from './VModal.vue'
const props = defineProps<{ geas: Geas }>()
defineEmits<{
  (e: 'update', g: Geas): void
  (e: 'close'): void
}>()
let gift = props.geas
</script>

<template>
  <VModal @close="$emit('close')">
    <template v-slot:header> </template>
    <template v-slot:body> <label> Geas: </label><textarea v-model="gift"> </textarea></template>
    <template v-slot:footer>
      <button class="btn-green" @click="$emit('update', gift)">Ok</button>
    </template>
  </VModal>
</template>

<style lang="css">
.modal-header {
  grid-template-columns: 4fr 1fr;
}
.modal-header > :nth-child(even) {
  justify-self: right;
}
</style>

<style lang="css" scoped>
#button-close {
  max-width: fit-content;
}
</style>
