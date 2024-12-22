<script setup lang="ts">
import { Quest, QuestArc, QUESTARCS, type Anytime, type Storyline } from '@/types'
import { ref, useTemplateRef, type Ref } from 'vue'

type questMode = 'anytime' | 'storyline'
let mode: Ref<questMode> = ref('anytime')
let quest = defineModel({ type: Quest })
let anytime: Anytime = {
  anytime: ''
}
let storyline: Storyline = {
  major: [],
  minor: []
}
let questKind = useTemplateRef('questKind')

function updateConditions() {
  if (questKind.value?.value === 'anytime') {
    quest.value.conditions = anytime
  } else {
    quest.value.conditions = storyline
  }
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
      <select name="quest-kind" id="quest-kind" ref="questKind" @change="updateConditions">
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
          <textarea id="quest-action" v-model="anytime"></textarea>
        </div>
        <div v-if="mode === 'storyline'" id="storyline-quest">
          <p>Get 5 xp, once, if:</p>
          <div v-for="(_, i) in storyline.major" v-bind:key="i">
            <p>
              <input type="text" v-model="storyline.major[i]" />
              <button @click="() => storyline.major.splice(i, 1)">X</button>
            </p>
          </div>
          <button type="button" @click="() => storyline.major.push('')">Add major goal</button>
          <p>Get 1 xp whenever:</p>
          <div v-for="(goal, i) in storyline.minor" v-bind:key="goal">
            <p>
              <input type="text" v-model="storyline.minor[i]" />
              <button @click="() => storyline.minor.splice(i, 1)">X</button>
            </p>
          </div>
          <button type="button" @click="() => storyline.minor.push('')">
            Add quest flavor goal
          </button>
        </div>
      </div>
    </label>
  </div>
</template>

<style></style>
