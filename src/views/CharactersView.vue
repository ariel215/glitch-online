<script setup lang="ts">
import { useAppStore } from '@/stores/player'
import { Character } from '@/types'
import { useRouter } from 'vue-router'
const store = useAppStore()
const characters = store.characters
const router = useRouter()
function new_character() {
  let char = new Character()
  let id = store.add_character(char)
  router.push({ name: 'character', params: { id } })
}
</script>

<template>
  <table>
    <thead>
      <tr>
        Characters
      </tr>
    </thead>
    <tbody>
      <tr v-for="[id, character] in characters.entries()" :key="character.characterName">
        <RouterLink :to="{ name: 'character', params: { id: id } }">
          <td>{{ character.characterName }}, dying of {{ character.bane }}</td>
        </RouterLink>
      </tr>
    </tbody>
  </table>
  <button @click="new_character">Add Character</button>
</template>
