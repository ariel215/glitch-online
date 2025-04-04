<script setup lang="ts">
import { ACTIVATIONS, COSTS, FLEXIBILITIES, Gift, RANGES, price } from '@/types'
let gift = defineModel<Gift>({ required: true })
defineEmits(['close'])
</script>

<template>
  <div class="card">
    <div class="card-header">
      <label> Name: <input type="text" id="name-input" v-model="gift.name" /> </label>
      <em> {{ price(gift) }} CP </em>
      <button id="button-close" @click="$emit('close', null)">X</button>
    </div>
    <div class="card-body">
      <label>
        Description: <textarea id="description-input" v-model="gift.description"></textarea>
      </label>
      <br />
      <label> Base Level: <input type="number" min="1" max="12" v-model="gift.level" /> </label>
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
          <option v-for="(option_, i) in ACTIVATIONS" :value="option_" v-bind:key="option_">
            {{ option_ }} ({{ i * -2 + 1 }} CP)
          </option>
        </select>
      </label>
      <label>
        Range
        <select name="range" id="range" v-model="gift.range">
          <option v-for="(option_, i) in RANGES" :value="option_" v-bind:key="option_">
            {{ option_ }} ({{ 1 - 2 * i }} cp)
          </option>
        </select>
      </label>
      <label>
        Flexibility
        <select name="flex" id="flex" v-model="gift.flexibility">
          <option v-for="(option_, i) in FLEXIBILITIES" :value="option_" v-bind:key="option_">
            {{ option_ }} ({{ 1 - 2 * i }} cp)
          </option>
        </select>
      </label>
    </div>
  </div>
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
.card-header {
  display: grid;
  grid-template-columns: 80% 10% 10%;
}
.card-header button {
  justify-self: end;
}
</style>
