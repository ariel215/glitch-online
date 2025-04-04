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
  if (typeof route.params.id == 'string') {
    let char = store.characters.get(parseInt(route.params.id))
    if (char === undefined) {
      alert('Could not find character requested')
      router.back()
      throw 'unreachable'
    } else {
      return char
    }
  } else {
    alert('wrong number of parameters')
    router.back()
    throw 'unreachable'
  }
}

watch(character, (c: Character) => {
  console.log('character changed!')
  store.saveCharacter(c)
})

function markXP(quest: Quest, xp: number) {
  quest.xp += xp
}
</script>

<template>
  <CharacterSheetTemplate>
    <template #character-info>
      <h1>{{ character.characterName }}</h1>
      <p v-if="character.luthe">
        (which means <em>{{ character.luthe }} </em>)
      </p>
      <h3>Dying of {{ character.bane }}</h3>
      <ul>
        <li>Technique: {{ character.technique }}</li>
        <li>Sphere: {{ character.sphere }}</li>
        <li>Sanctuary: {{ character.sanctuary }}</li>
        <li>Power of destruction: {{ character.destruction }}</li>
      </ul>
    </template>

    <template #attributes>
      <div class="heading">
        <h4 class="attribute-title">Attributes</h4>
      </div>
      <div id="attributes">
        <template v-for="(attribute, i) of ATTRIBUTES" :key="i">
          <span class="attribute-name"> {{ attribute }} </span>
          <span> {{ character?.attributes[attribute] }} </span>
        </template>
      </div>
    </template>

    <template #costs>
      <h4 class="cost-title">Costs</h4>
      <div id="costs">
        <template v-for="cost in COSTS" :key="cost">
          <span class="cost-name"> {{ cost }} </span>
          <div>
            <input type="number" v-model="character.costs[cost]" />
          </div>
        </template>
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
      <h4 v-if="character.geasa.length">Geasa</h4>
      <p v-for="(geas, i) in character.geasa" :key="i">{{ geas }}</p>
    </template>

    <template #treasures>
      <div v-if="!character.treasures.length">No treasures yet</div>
      <p>
        <em>{{ character.treasures.length }} of {{ character.attributes['Flore'] + 1 }}</em>
      </p>
      <p v-for="(_treasure, i) in character?.treasures" :key="i">
        <input type="text" v-model="character.treasures[i]" />
        <button type="button" @click="character.treasures.splice(i, 1)">X</button>
      </p>
      <button
        type="button"
        @click="character.treasures.push('')"
        :disabled="character.treasures.length >= character.attributes['Flore'] + 1"
      >
        Add Treasure
      </button>
    </template>

    <template #arcana>
      <div v-if="!character.arcana.length">No arcana yet</div>
      <div v-else>
        <p id="arcana-count">
          <em>{{ character?.arcana.length }} of 12</em>
        </p>
        <p v-for="(_arcanum, i) in character?.arcana" :key="i">
          <input type="text" v-model="character.arcana[i]" />
          <button type="button" @click="character.arcana.splice(i, 1)">X</button>
        </p>
        <button
          type="button"
          @click="character.arcana.push('')"
          :disabled="character.arcana.length >= 12"
        >
          Add Arcanum
        </button>
      </div>
    </template>

    <template #quests>
      <EditQuest
        v-for="(_, i) in character.quests"
        :key="i"
        v-model="character.quests[i]"
      ></EditQuest>
      <button @click="character.quests.push(new Quest())" :disabled="character.quests.length >= 5">
        Add Quest
      </button>
    </template>
  </CharacterSheetTemplate>
</template>

<style lang="css" scoped>
.flex-column {
  display: flex;
  flex-direction: column;
}
</style>
