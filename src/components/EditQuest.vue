<script setup lang="ts">
import { Quest } from '@/types'
import VModal from './VModal.vue'
import { ref, type Ref } from 'vue'

type questMode = 'anytime' | 'storyline'
let mode: Ref<questMode> = ref('anytime')
let action: string = ''
let majorGoals: Ref<Array<string>> = ref([])
let flavorGoals: Ref<Array<string>> = ref([])
let quest = new Quest()
function makeQuest() {
  if (mode.value == 'anytime') {
    quest.conditions = {
      anytime: action
    }
  } else {
    quest.conditions = {
      major: majorGoals.value,
      minor: flavorGoals.value
    }
  }
  return quest
}
</script>

<template>
  <VModal @close="(...args) => $emit('close', ...args)">
    <template v-slot:header>
      <h1>New Quest</h1>
    </template>
    <template v-slot:body>
      <label>
        Quest kind:
        <select name="quest-kind" id="quest-kind" v-model="mode">
          <option value="anytime">Anytime</option>
          <option value="storyline">Story Line</option>
        </select>
        <div id="quest-builder">
          <p>
            <label> Name: <input type="text" v-model="quest.name" /></label>
          </p>
          <p>
            <label> XP: <input type="number" v-model="quest.cost" /></label>
          </p>
          <label>
            Description: <br />
            <textarea id="quest-description"> Quest Description</textarea>
          </label>
          <div v-if="mode === 'anytime'" id="anytime-quest">
            <p>Mark 1 XP on this quest any time you do the following:</p>
            <textarea id="quest-action" v-model="action"></textarea>
          </div>
          <div v-if="mode === 'storyline'" id="storyline-quest">
            <p>Get 5 xp, once, if:</p>
            <div v-for="(_, i) in majorGoals" v-bind:key="i">
              <p>
                <input type="text" v-model="majorGoals[i]" />
                <button @click="() => majorGoals.splice(i, 1)">X</button>
              </p>
            </div>
            <button type="button" @click="() => majorGoals.push('')">Add major goal</button>
            <p>Get 1 xp whenever:</p>
            <div v-for="(goal, i) in flavorGoals" v-bind:key="goal">
              <p>
                <input type="text" v-model="flavorGoals[i]" />
                <button @click="() => flavorGoals.splice(i, 1)">X</button>
              </p>
            </div>
            <button type="button" @click="() => flavorGoals.push('')">Add quest flavor goal</button>
          </div>
        </div>
      </label>
    </template>
    <template v-slot:footer>
      <button class="btn-green" @click="$emit('update', makeQuest())">Ok</button>
    </template>
  </VModal>
</template>

<style></style>
