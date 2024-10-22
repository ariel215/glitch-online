<script setup lang="ts">
import { Activations, COSTS, Flexibilities, Gift, Ranges } from '@/types'
import { ref } from 'vue'
import VModal from './VModal.vue'
const props = defineProps<{ gift: Gift }>()
defineEmits<{
  (e: 'update', g: Gift): void
  (e: 'close'): void
}>()
let gift = ref(props.gift)
</script>

<template>
  <VModal>
    <template v-slot:header>
      <label> Name: <input type="text" id="name-input" v-model="gift.name" /> </label>
    </template>
    <template v-slot:body>
      <label>
        Description: <input type="text" id="description-input" v-model="gift.description" />
      </label>
      <label> Level: <input type="number" min="1" max="12" v-model="gift.level" /> </label>
      <label>
        Cost:
        <select name="cost" id="cost" v-model="gift.cost">
          <option v-for="option_ in COSTS" value="{{ option_ }}" v-bind:key="option_">
            {{ option_ }}
          </option>
        </select>
      </label>
      <label>
        Activation
        <select name="activation" id="activation" v-model="gift.activation">
          <option v-for="option_ in Activations" value="{{ option_ }}" v-bind:key="option_">
            {{ option_ }}
          </option>
        </select>
      </label>
      <label>
        Range
        <select name="range" id="range" v-model="gift.range">
          <option v-for="option_ in Ranges" value="{{ option_ }}" v-bind:key="option_">
            {{ option_ }}
          </option>
        </select>
      </label>
      <label>
        Flexibility
        <select name="flex" id="flex" v-model="gift.flexibility">
          <option v-for="option_ in Flexibilities" value="{{ option_ }}" v-bind:key="option_">
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
