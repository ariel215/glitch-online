<script setup lang="ts">
import { Quest, QuestArc, QUESTARCS } from '@/types'
import { ref, type Ref } from 'vue'

type questMode = 'anytime' | 'storyline'
let mode: Ref<questMode> = ref('anytime')
let action: string = ''
let majorGoals: Ref<Array<string>> = ref([])
let flavorGoals: Ref<Array<string>> = ref([])
let quest = ref(new Quest())
function makeQuest() {
  if (mode.value == 'anytime') {
    quest.value.conditions = {
      anytime: action
    }
  } else {
    quest.value.conditions = {
      major: majorGoals.value,
      minor: flavorGoals.value
    }
  }
  return quest
}
</script>

<template>
  <div class="card">
    <h3 class="card-header">
      <label> Name: <input type="text" v-model="quest.name" /></label>
    </h3>
    <h3>Arcs:</h3>
    <div v-for="(arc, i) in quest.arcs" :key="i">
      <select v-model="arc.arc">
        <option v-for="arckind in QUESTARCS" :key="arckind" :value="arckind">
          {{ arckind }}
        </option>
      </select>
      <select v-model="arc.position">
        <option v-for="i in [...Array(5).keys()]" :key="i" :value="i + 1">
          {{ i + 1 }}
        </option>
      </select>
      <button type="button" @click="quest.arcs.splice(i, 1)">X</button>
    </div>
    <button
      type="button"
      @click="
        () => {
          quest.arcs.push({ arc: QuestArc.Bindings, position: 1 })
          console.log(quest.arcs.length)
        }
      "
    >
      Add arc
    </button>
    <label>
      Quest kind:
      <select name="quest-kind" id="quest-kind" v-model="mode">
        <option value="anytime">Anytime</option>
        <option value="storyline">Story Line</option>
      </select>
      <div id="quest-builder">
        <p>
          <label> XP: <input type="number" v-model="quest.xp_needed" /></label>
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
    <button class="btn-green" @click="$emit('update', makeQuest())">Ok</button>
  </div>
</template>

<style></style>
