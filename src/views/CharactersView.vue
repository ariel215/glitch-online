<script setup lang="ts">
import { useAppStore } from '@/stores/player'
import { Character } from '@/types'
import { useRouter } from 'vue-router'
const store = useAppStore()
const characters = store.characters
const router = useRouter()
function new_character() {
  router.push({ name: 'newCharacter' })
}
</script>

<template>
  <table>
    <thead>
      <tr>
        <th scope="column">Characters</th>
      </tr>
    </thead>
    <tbody>
      <tr v-if="characters.size == 0"></tr>
      <tr v-for="[id, character] in characters.entries()" :key="character.characterName">
        <RouterLink :to="{ name: 'character', params: { id: id } }">
          <td>{{ character.characterName }}, dying of {{ character.bane }}</td>
        </RouterLink>
      </tr>
    </tbody>
  </table>
  <button @click="new_character">Add Character</button>
</template>

<style lang="css" scoped>
table {
  border: 1px solid grey;
  table-layout: fixed;
  width: 75%;
  min-height: 1rem;
  background-color: rgb(0, 0, 0, 0.1);
  border-collapse: collapse;
  font-size: large;
}

thead th {
  border: 1px solid grey;
}

tr {
  min-height: 1rem;
}
</style>
