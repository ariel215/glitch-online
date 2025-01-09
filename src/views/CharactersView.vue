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
        <th scope="column"><h2>Characters</h2></th>
      </tr>
    </thead>
    <tbody>
      <tr v-if="characters.size == 0"></tr>
      <tr v-for="[id, character] in characters.entries()" :key="character.characterName">
        <td class="character-select">
          <RouterLink :to="{ name: 'character', params: { id: id } }">
            {{ character.characterName }}, dying of {{ character.bane }}
          </RouterLink>
          <div class="character-buttons">
            <RouterLink :to="{ name: 'editCharacter', params: { id: id } }">
              <button type="button">Edit</button>
            </RouterLink>
            <button @click="() => store.deleteCharacter(character)">Delete</button>
          </div>
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

.character-select {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
</style>
