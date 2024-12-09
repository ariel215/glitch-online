<script lang="ts" setup>
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

function addCharacter() {
  store.add_character(character)
  router.push('/')
}

function newBond() {
  character.bonds.push(new Bond())
}

let showGeasEditor = false
function newGeas() {
  showGeasEditor = true
}
function addGeas(geas: Geas) {
  character.geasa.push(geas)
  showGeasEditor = false
}

function newArcanum() {
  character.arcana.push('')
}

function newTreasure() {
  character.treasures.push('')
}

let attributes = character.attributes
let editing: Map<string, boolean> = new Map()
for (let gift of character.gifts) {
  editing.set(gift.name, false)
}

let showGiftEditor = ref(false)
let giftEdited = new Gift()
let giftIndex: Ref<number | null, number | null> = ref(null)
function addGift() {
  showGiftEditor.value = true
}

function editGift(idx: number) {
  showGiftEditor.value = true
  giftIndex.value = idx
}
function resetEditor() {
  showGiftEditor.value = false
  giftEdited = new Gift()
  giftIndex.value = null
}

function onEditorUpdate(g: Gift) {
  if (giftIndex.value === null) {
    character?.gifts.push(g)
  } else {
    character.gifts[giftIndex.value] = g
  }
  resetEditor()
}

function deleteGift(index: number) {
  character?.gifts.splice(index, 1)
}

function tickUp(attribute: Attribute) {
  let val = attributes.get(attribute)
  if (val === undefined) {
    return
  }
  if (val < 7) {
    attributes.set(attribute, val + 1)
  }
}

function tickDown(attribute: Attribute) {
  let val = attributes.get(attribute)
  if (val === undefined) {
    return
  }
  if (val > 0) {
    attributes.set(attribute, val - 1)
  }
}
const startingCosts = computed(() => {
  let costs = new Map<Cost, number>()
  for (let cost of COSTS) {
    if (cost === 'Wear') {
      costs.set(cost, 40)
    } else {
      let attr = ATTRIBUTES[COSTS.indexOf(cost)]
      costs.set(cost, (attributes.get(attr) || 0) * 10)
    }
  }
  return costs
})

const characterComplete = computed(() => {
  return character.cp() <= CHARPT_MAX
})

let editQuest: Ref<boolean> = ref(false)
function newQuest() {
  console.log('new quest')
  editQuest.value = true
}

function setQuest(quest: Quest) {
  character.quests.push(quest)
  editQuest.value = false
}
</script>

<template>
  <CharacterSheetTemplate>
    <template #character-info>
      <label>
        Player Name <input type="text" id="player-name" v-model="character.playerName" />
      </label>
      <label>
        Character Name <input type="text" id="character-name" v-model="character.characterName" />
      </label>
      <label> Luthe <input type="text" id="luthe" v-model="character.luthe" /> </label>
      <label> Bane <input type="text" id="bane" v-model="character.bane" /> </label>
      <label> Technique <input type="text" v-model="character.technique" /> </label>
      <label> Sanctuary <input type="text" v-model="character.sanctuary" /></label>
      <label> Sphere <input type="text" v-model="character.sphere" /> </label>
      <label> Power of Destruction <input type="text" v-model="character.destruction" /> </label>
      <span> Character points used: </span> <span> {{ character.cp() }} of {{ CHARPT_MAX }}</span>
    </template>

    <template #attributes>
      <h3>Attributes</h3>
      <div v-for="(attribute, i) of ATTRIBUTES" :key="i" class="attribute">
        <span> {{ attribute }} </span>
        <div class="attribute-setter">
          <button @click="() => tickDown(attribute)">-</button>
          <span> {{ character?.attributes.get(attribute) }} </span>
          <button @click="() => tickUp(attribute)">+</button>
        </div>
        <span></span>
      </div>
    </template>

    <template #costs>
      <h3>Starting Costs</h3>
      <div v-for="cost of character?.costs.keys()" :key="cost" :class="cost" class="cost">
        <span> {{ cost }} </span> <span> {{ startingCosts.get(cost) }} </span> <span></span>
      </div>
    </template>

    <template #gifts>
      <div id="gifts" class="box-list">
        <div v-for="(gift, index) in character?.gifts" :key="index">
          <GiftSummary :gift="gift" />
          <button type="button" @click="editGift(index)">Edit</button>
          <button type="button" @click="deleteGift(index)">Delete</button>
        </div>

        <button type="button" @click="addGift">Add Gift</button>
        <EditGift
          v-show="showGiftEditor"
          :gift="giftEdited"
          @update="onEditorUpdate"
          @close="resetEditor"
        ></EditGift>
      </div>
    </template>

    <template #bonds>
      <div id="bonds" class="box-list">
        <h3>Bonds</h3>
        <div v-for="(bond, i) in character?.bonds" :key="i">
          <label> Truth: <input type="text" v-model="bond.truth" /></label>
          <label> Technique: <input type="text" v-model="bond.technique" /></label>
          <button @click="character.bonds.splice(i, 1)">X</button>
        </div>
        <button type="button" @click="newBond()">Add Bond</button>
      </div>
    </template>
    <template #geasa>
      <div v-for="geas in character?.geasa" :key="geas">
        <p>{{ geas }}</p>
      </div>
      <button type="button" @click="newGeas()">Add Geas</button>
      <EditGeas
        v-show="showGeasEditor"
        :geas="''"
        @update="addGeas"
        @close="() => (showGeasEditor = false)"
      ></EditGeas>
    </template>
    <template #treasures>
      <p>{{ character.treasures.length }} of {{ character.attributes.get('Flore') + 1 }}</p>
      <p v-for="(treasure, i) in character?.treasures" :key="i">{{ treasure }}</p>
      <button
        type="button"
        @click="newTreasure()"
        :disabled="character.treasures.length >= character.attributes.get('Flore') + 1"
      >
        Add Treasure
      </button>
    </template>

    <template #arcana>
      <span id="arcana-count"> {{ character?.arcana.length }} of 12</span>
      <p v-for="(arcanum, i) in character?.arcana" :key="i">{{ arcanum }}</p>
      <button type="button" @click="newArcanum()" :disabled="character.arcana.length >= 12">
        Add Arcanum
      </button>
    </template>
    <template #quests>
      <div v-if="character.quests.length">
        <h4>{{ character.quests[0].name }}</h4>
        <button type="button" @click="() => (character.quests = [])">X</button>
      </div>
      <div v-else>
        <button type="button" @click="newQuest()" :disabled="character.quests.length > 0">
          Create New Quest
        </button>
      </div>
      <EditQuest v-show="editQuest" @close="editQuest = false" @update="setQuest" />
    </template>
    <button type="button" :disabled="!characterComplete" @click="addCharacter()">OK</button>
  </CharacterSheetTemplate>
</template>
