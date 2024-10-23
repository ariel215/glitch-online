<script setup lang="ts">
import { ACTIVATIONS, COSTS, FLEXIBILITIES, Gift, RANGES } from '@/types'
import { ref } from 'vue'
import VModal from './VModal.vue'
const props = defineProps<{ gift: Gift }>()
defineEmits<{
  (e: 'update', g: Gift): void
  (e: 'close'): void
}>()
let gift = props.gift.copy()
</script>

<template>
  <VModal @close="$emit('close')">
    <template v-slot:header>
      <label> Name: <input type="text" id="name-input" v-model="gift.name" /> </label>
      <button id="button-close" @click="$emit('close')">X</button>
    </template>
    <template v-slot:body>
      <label>
        Description: <input type="text" id="description-input" v-model="gift.description" />
      </label>
      <label> Level: <input type="number" min="1" max="12" v-model="gift.level" /> </label>
      <label>
        Cost:
        <select name="cost" id="cost" v-model="gift.cost">
          <option v-for="option_ in COSTS" :value="option_" v-bind:key="option_">
            {{ option_ }}
          </option>
        </select>
      </label>
      <label>
        Activation
        <select name="activation" id="activation" v-model="gift.activation">
          <option v-for="option_ in ACTIVATIONS" :value="option_" v-bind:key="option_">
            {{ option_ }}
          </option>
        </select>
      </label>
      <label>
        Range
        <select name="range" id="range" v-model="gift.range">
          <option v-for="option_ in RANGES" :value="option_" v-bind:key="option_">
            {{ option_ }}
          </option>
        </select>
      </label>
      <label>
        Flexibility
        <select name="flex" id="flex" v-model="gift.flexibility">
          <option v-for="option_ in FLEXIBILITIES" :value="option_" v-bind:key="option_">
            {{ option_ }}
          </option>
        </select>
      </label>
    </template>
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
