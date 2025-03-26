import { defineStore } from 'pinia'
import { Character } from '@/types'
import { ref, type Ref } from 'vue'

function storage_name(id: number) {
  return `character_${id}`
}

export const useCharacterStore = defineStore('characters', () => {
  const characters: Ref<Map<number, Character>> = ref(new Map())
  const character_ids = load_ids()
  const missing_ids = []
  for (const id of character_ids) {
    const char = load_character(id)
    if (char !== undefined) {
      characters.value.set(id, char)
    } else {
      missing_ids.push(id)
    }
  }
  for (const id of missing_ids) {
    character_ids.delete(id)
  }

  function newCharacter(): Character {
    const character = new Character()
    characters.value.set(character.id, character)
    character_ids.add(character.id)
    localStorage.setItem('character_ids', JSON.stringify([...character_ids]))
    saveCharacter(character)
    return characters.value.get(character.id) || character
  }

  /// Save to localStorage
  function saveCharacter(character: Character) {
    function replacer(key: any, value: any) {
      if (value instanceof Map) {
        const new_value: any = {}
        for (const [vkey, vval] of value.entries()) {
          new_value[vkey] = vval
        }
        return new_value
      } else {
        return value
      }
    }
    localStorage.setItem(storage_name(character.id), JSON.stringify(character, replacer))
  }

  function deleteCharacter(character: Character) {
    localStorage.removeItem(storage_name(character.id))
    character_ids.delete(character.id)
    localStorage.setItem('character_ids', JSON.stringify([...character_ids]))
    return characters.value.delete(character.id)
  }
  return { characters, newCharacter, deleteCharacter, saveCharacter }
})

function load_character(id: number): Character | undefined {
  const char_str = localStorage.getItem(storage_name(id))
  if (char_str) {
    const char = new Character(JSON.parse(char_str))
    Character.curr_id = Math.max(char.id + 1, Character.curr_id)
    return char
  } else {
    return undefined
  }
}

function load_ids(): Set<number> {
  const character_ids_str = localStorage.getItem('character_ids')
  if (character_ids_str !== null) {
    const character_ids: Set<number> = new Set(JSON.parse(character_ids_str))
    Character.curr_id = Math.max(...character_ids) + 1
    return character_ids
  } else {
    localStorage.setItem('character_ids', '[]')
    return new Set()
  }
}
