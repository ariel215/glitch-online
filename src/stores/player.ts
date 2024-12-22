import { defineStore } from 'pinia'
import { Character } from '@/types'
import { ref, type Ref } from 'vue'

export const useCharacterStore = defineStore('characters', () => {
  const characters: Ref<Map<number, Character>> = ref(new Map())
  Character.load_ids()
  const missing_ids = []
  for (const id of Character.character_ids) {
    const char = Character.load(id)
    if (char !== undefined) {
      characters.value.set(id, char)
    } else {
      missing_ids.push(id)
    }
  }
  for (const id of missing_ids) {
    Character.character_ids.delete(id)
  }
  return { characters }
})
