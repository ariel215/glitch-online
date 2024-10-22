<script setup>
import * as consts from '@/constants'
import { ATTRIBUTES } from '@/types'
import { reactive, ref } from 'vue'

const pointsRemaining = ref(consts.PTS_CHARACTER_CREATION)
const attributes = reactive({
  Eide: 0,
  Flore: 0,
  Lore: 0,
  Wyrd: 0,
  Ability: 0
})

const starting_cost = computed((attribute) => {
  if (attribute === 'Ability') {
    40
  } else {
    attributes[attribute] * 10
  }
})

const attribute_points = computed(
  () =>
    attributes.Ability * 3 +
    attributes.Wyrd * 2 +
    attributes.Lore * 2 +
    attributes.Flore * 2 +
    attributes.Eide * 2
)
</script>

<template>
  <div class="modal">
    <div class="modal-dialogue">
      <div class="modal-content">
        <div class="modal-body">
          <h5>Points left to spend: {{ attribute_points }}</h5>
          <div v-for="(attribute, index) in ATTRIBUTES" :key="index">
            <span class="attribute-name"> {{ attribute }}</span>
            <button
              type="button"
              class="btn btn-secondary"
              @click="attributes[attribute] -= 1"
              :disabled="attributes[attribute] == 0"
            >
              -
            </button>
            {{ attributes[attribute] }}
            <button
              type="button"
              class="btn btn-secondary"
              @click="attributes[attribute] += 1"
              :disabled="attributes[attribute] >= 7"
            >
              +
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
