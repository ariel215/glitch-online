<script setup lang="ts">
import { Quest, QuestArc, QUESTARCS, type Anytime, type Storyline } from '@/types'
import { ref, type Ref } from 'vue'

type questMode = 'anytime' | 'storyline'
let mode: Ref<questMode> = ref('anytime')
let quest = defineModel<Quest>({ required: true })
let anytime: Ref<Anytime> = ref({
  kind: 'anytime',
  anytime: ''
})

let storyline: Ref<Storyline> = ref({
  kind: 'storyline',
  major: ['Major Goal'],
  minor: ['Flavor Goal']
})

function updateConditions() {
  if (mode.value === 'anytime') {
    quest.value.conditions = anytime.value
  } else {
    quest.value.conditions = storyline.value
  }
}

defineEmits(['close'])
</script>

<template>
  <div class="card">
    <div class="card-header">
      <h3>
        <label> Name: <input type="text" v-model="quest.name" /></label>
      </h3>
      <label> XP: <input type="number" v-model="quest.xp_needed" /></label>
      <button @click="$emit('close')">X</button>
    </div>

    <div id="quest-builder" class="card-body">
      <label>
        Quest kind:
        <select
          name="quest-kind"
          id="quest-kind"
          ref="questKind"
          v-model="mode"
          @change="updateConditions"
        >
          <option value="anytime">Anytime</option>
          <option value="storyline">Story Line</option>
        </select>
      </label>
      <label>
        Description: <br />
        <textarea id="quest-description"> Quest Description</textarea>
      </label>
      <div v-if="mode === 'anytime'" id="anytime-quest">
        <p>Mark 1 XP on this quest any time you do the following:</p>
        <textarea id="quest-action" v-model="anytime.anytime"></textarea>
      </div>
      <div v-if="mode === 'storyline'" id="storyline-quest">
        <p>Get 5 xp, once, if:</p>
        <div v-for="(_, i) in storyline.major" v-bind:key="i">
          <p>
            <input type="text" v-model="storyline.major[i]" />
            <button @click="() => storyline.major.splice(i, 1)">X</button>
          </p>
        </div>
        <button
          type="button"
          @click="
            () => {
              storyline.major.push('Major Goal')
              console.log(storyline)
            }
          "
        >
          Add major goal
        </button>
        <p>Get 1 xp whenever you or someone else:</p>
        <div v-for="(goal, i) in storyline.minor" v-bind:key="goal">
          <p>
            <input type="text" v-model="storyline.minor[i]" />
            <button @click="() => storyline.minor.splice(i, 1)">X</button>
          </p>
        </div>
        <button type="button" @click="() => storyline.minor.push('Flavor goal')">
          Add quest flavor goal
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped lang="css">
h3 {
  font-size: 1.5rem;
  font-weight: 300;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
}

label {
  display: block;
}
</style>
