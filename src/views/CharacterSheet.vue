<script setup lang="ts">
import EditQuest from '@/components/EditQuest.vue'
import GiftSummary from '@/components/GiftSummary.vue'
import QuestCard from '@/components/QuestCard.vue'
import { useCharacterStore } from '@/stores/character'
import { ATTRIBUTES, Character, COSTS, Quest, type Cost } from '@/types'
import { useRoute, useRouter } from 'vue-router'
import CharacterSheetTemplate from './CharacterSheetTemplate.vue'
import { watch } from 'vue'
const router = useRouter()
const route = useRoute()
const store = useCharacterStore()
const character = getCharacter()
function getCharacter(): Character {
  let char = store.characters.get(parseInt(route.params.id))
  if (char === undefined) {
    alert('Could not find character requested')
    router.back()
  }
  return char
}

watch(character, (c: Character) => {
  console.log('character changed!')
  store.saveCharacter(c)
})

function tickDown(cost: Cost) {
  let c = character.costs.get(cost)
  if (c) {
    character.costs.set(cost, c - 1)
  }
}

function tickUp(cost: Cost) {
  let c = character.costs.get(cost)
  if (c) {
    character.costs.set(cost, c + 1)
  }
}

function markXP(quest: Quest, xp: number) {
  quest.xp += xp
}

let editingQuest = false
function newQuest() {
  editingQuest = true
}
</script>

<template>
  <CharacterSheetTemplate>
    <template #character-info>
      <h1>{{ character.characterName }}</h1>
      <p v-if="character.luthe">
        (which means <em>{{ character.luthe }} </em>)
      </p>
      <p>who is dying of {{ character.bane }}</p>
      <ul>
        <li>Technique: {{ character.technique }}</li>
        <li>Sphere: {{ character.sphere }}</li>
        <li>Sanctuary: {{ character.sanctuary }}</li>
        <li>Power of destruction: {{ character.destruction }}</li>
      </ul>
    </template>

    <template #attributes>
      <div class="flex-column">
        <div v-for="(attribute, i) in ATTRIBUTES" :key="i">
          {{ attribute }}: {{ character.attributes.get(attribute) }}
        </div>
      </div>
    </template>
    <template #costs>
      <div class="flex-column">
        <div v-for="(cost, i) in COSTS" :key="i">
          {{ cost }}: <button @click="() => tickDown(cost)">-</button>
          {{ character.costs.get(cost) }}
          <button @click="() => tickUp(cost)">+</button>
        </div>
      </div>
    </template>

    <template #gifts>
      <GiftSummary v-for="(gift, i) in character.gifts" :key="i" :gift="gift"></GiftSummary>
    </template>

    <template #bonds>
      <div class="bond" v-for="(bond, i) in character.bonds" :key="i">
        <span class="truth"> {{ bond.truth }}</span>
        <span class="technique"> {{ bond.technique }} </span>
      </div>
    </template>

    <template #geasa>
      <p v-for="(geas, i) in character.geasa" :key="i">{{ geas }}</p></template
    >

    <template #quests>
      <!-- <QuestCard
        v-for="(quest, i) in character.quests"
        :key="i"
        v-model="character.quests[i]"
        @mark="(xp: number) => markXP(quest, xp)"
      ></QuestCard> -->
      <EditQuest
        v-if="editingQuest"
        v-model="character.quests[character.quests.length - 1]"
      ></EditQuest>
      <button @click="newQuest" :disabled="character.quests.length >= 5">Add Quest</button>
    </template>
  </CharacterSheetTemplate>
</template>

<style lang="css" scoped>
.flex-column {
  display: flex;
  flex-direction: column;
}
</style>
