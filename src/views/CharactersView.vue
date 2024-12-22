<script setup lang="ts">
import { useCharacterStore } from '@/stores/character'
import { useRouter } from 'vue-router'
const store = useCharacterStore()
const characters = store.characters
const router = useRouter()
function newCharacter() {
  let char = store.newCharacter()
  router.push({
    name: 'editCharacter',
    params: {
      id: char.id
    }
  })
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
        <td>
          <RouterLink :to="{ name: 'character', params: { id: id } }">
            {{ character.characterName }}, dying of {{ character.bane }}
          </RouterLink>
          <button @click="() => store.deleteCharacter(character)">Delete</button>
        </td>
      </tr>
    </tbody>
  </table>
  <button @click="newCharacter">Add Character</button>
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
