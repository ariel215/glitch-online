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
</script>

<template>
  <h1>
    {{ character.characterName }}
    <span v-if="character.luthe">
      which means <em> {{ character.luthe }}</em> ,
    </span>
    Dying of {{ character.bane }}
  </h1>
  <div id="info">
    <p>Technique: {{ character.technique }}</p>
    <p>Sanctuary: {{ character.sanctuary }}</p>
    <p>Sphere: {{ character.sphere }}</p>
    <p>Power of Destruction: {{ character.destruction }}</p>
  </div>
  <div id="attributes-costs">
    <h2>Attributes</h2>
    <div class="attributes">
      <h3>Attributes</h3>
      <div
        v-for="attribute of character?.attributes.keys()"
        :key="attribute"
        :class="attribute"
        class="attribute"
      >
        <span> {{ attribute }} </span>
        <span> {{ character?.attributes.get(attribute) }} </span>
      </div>
      <span></span>
    </div>
    <div class="costs">
      <h2>Costs</h2>
      <div v-for="cost of character?.costs.keys()" :key="cost" :class="cost" class="cost">
        <span> {{ cost }} </span>
        <button @click="tickDown(cost)">-</button>
        <span> {{ character.costs.get(cost) }} </span>
        <button @click="tickUp(cost)">+</button>
      </div>
    </div>
  </div>
  <div id="gifts-bonds-geasa">
    <div v-for="(gift, i) of character.gifts" :key="i">
      <GiftSummary :gift="gift" />
    </div>
    <div v-for="(bond, i) of character.bonds" :key="i">
      {{ bond.truth }}
    </div>
    <div v-for="(geas, i) of character.geasa" :key="i">
      {{ geas }}
    </div>
  </div>
  <div id="treasures-arcana">
    <h2>Treasures</h2>
    <div class="treasure" v-for="(treasure, i) in character.treasures" :key="i">
      {{ treasure }}
    </div>
    <h2>Arcana</h2>
    <div class="arcana" v-for="(arcanum, i) in character.arcana" :key="i">
      {{ arcanum }}
    </div>
  </div>
  <div id="quests">
    <div class="quest-small" v-for="(quest, i) in character.quests" :key="i">
      <h3>{{ quest.name }}</h3>
      <p>{{ quest.xp }}</p>
      <p>{{ quest.description }}</p>
    </div>
  </div>
</template>
