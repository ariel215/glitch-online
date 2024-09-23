<script setup lang="ts">
import { useAppStore } from '@/stores/player'
const store = useAppStore()
const characters = store.characters
</script>

<template>
  <table>
    <thead>
      <tr>
        Character
      </tr>
    </thead>
    <tbody>
      <tr v-for="[id, character] in characters.entries()" :key="character.characterName">
        <td>
          <a href="/character/{{ id }}"
            >{{ character.characterName }}, dying of {{ character.bane }}</a
          >
        </td>
      </tr>
    </tbody>
  </table>
</template>
