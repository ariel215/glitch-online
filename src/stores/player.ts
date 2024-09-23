import { defineStore } from 'pinia'
import { Character, Quest } from '@/types'
import { ref, type Ref } from 'vue'

let id = 0

export const useAppStore = defineStore('app', () => {
  const characters: Ref<Map<number, Character>> = ref(new Map())
  const quests: Ref<Map<string, Quest>> = ref(new Map())
  function add_character(char: Character) {
    const char_id = id
    characters.value.set(char_id, char)
    id += 1
    return char_id
  }

  function add_quest(quest: Quest) {
    quests.value.set(quest.name, quest)
  }

  return { characters, add_character, quests, add_quest }
})
