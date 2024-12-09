<script setup lang="ts">
import EditGeas from '@/components/EditGeas.vue'
import EditGift from '@/components/EditGift.vue'
import EditQuest from '@/components/EditQuest.vue'
import GiftSummary from '@/components/GiftSummary.vue'
import { useAppStore } from '@/stores/player'
import {
  ATTRIBUTES,
  Bond,
  Character,
  CHARPT_MAX,
  COSTS,
  Gift,
  Quest,
  type Attribute,
  type Cost,
  type Geas
} from '@/types'
import { ref, reactive, type Ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import CharacterSheetTemplate from './CharacterSheetTemplate.vue'
const store = useAppStore()
const router = useRouter()
const route = useRoute()

const character = getCharacter()
function getCharacter(): Character {
  if (route.name === 'newCharacter') {
    return reactive(new Character())
  } else {
    let char = store.characters.get(parseInt(route.params.id))
    if (char === undefined) {
      router.push({ name: 'newCharacter' })
      throw 'unreachable'
    }
    return char
  }
}

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

function newQuest() {
  alert('implement me pls')
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
      <p>Technique: {{ character.technique }}</p>
      <p>Sphere: {{ character.sphere }}</p>
      <p>Sanctuary: {{ character.sanctuary }}</p>
      <p>Power of destruction: {{ character.destruction }}</p>
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
      <QuestCard
        v-for="(quest, i) in character.quests"
        :key="i"
        :quest="quest"
        @mark="(xp: number) => markXP(quest, xp)"
      ></QuestCard>
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
