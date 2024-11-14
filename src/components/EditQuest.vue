<script setup lang="ts">
type questMode = 'anytime' | 'storyline'
let mode: questMode = 'anytime'
let majorGoals: Array<string> = []
let flavorGoals: Array<string> = []
</script>

<template>
  <label>
    Quest kind:
    <select name="quest-kind" id="quest-kind" v-model="mode">
      <option value="anytime">Anytime</option>
      <option value="storyline">Story Line</option>
    </select>
    <div id="quest-builder">
      <label> Name: <input type="text" /></label>
      <label> XP: <input type="number" /></label>
      <label>
        Description: <br />
        <textarea id="quest-description"></textarea>
      </label>
      <div v-if="mode === 'anytime'" id="anytime-quest">
        <p>Mark 1 XP on this quest any time you do the following:</p>
        <textarea id="quest-action"></textarea>
      </div>
      <div v-if="mode === 'storyline'" id="storyline-quest">
        <div v-for="(goal, i) in majorGoals" v-bind:key="goal">
          <input type="text" v-model="majorGoals[i]" />
          <button @click="() => majorGoals.splice(i, 1)">X</button>
        </div>
        <button type="button" @click="() => majorGoals.push('')">Add major goal</button>
        <div v-for="(goal, i) in flavorGoals" v-bind:key="goal">
          <input type="text" v-model="flavorGoals[i]" />
          <button @click="() => flavorGoals.splice(i, 1)">X</button>
        </div>
        <button type="button" @click="() => flavorGoals.push('')">Add quest flavor goal</button>
      </div>
    </div>
  </label>
</template>
