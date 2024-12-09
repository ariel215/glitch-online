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
  let costs = {}
  for (let cost of COSTS) {
    if (cost === 'Wear') {
      costs[cost] = 40
    } else {
      let attr = ATTRIBUTES[COSTS.indexOf(cost)]
      costs[cost] = (attributes.get(attr) || 0) * 10
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
  character.quest = quest
  editQuest.value = false
}
</script>

<template>
  <div class="info">
    <label>
      Player Name <input type="text" id="character-name" v-model="character.playerName" />
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
  </div>
  <h2>Stats</h2>
  <div class="attributes-costs">
    <div class="attributes">
      <h3>Attributes</h3>
      <div
        v-for="attribute of character?.attributes.keys()"
        :key="attribute"
        :class="attribute"
        class="attribute"
      >
        <span> {{ attribute }} </span>
        <div class="attribute-setter">
          <button @click="() => tickDown(attribute)">-</button>
          <span> {{ character?.attributes.get(attribute) }} </span>
          <button @click="() => tickUp(attribute)">+</button>
        </div>
        <span></span>
      </div>
    </div>
    <div class="costs">
      <h3>Starting Costs</h3>
      <div v-for="cost of character?.costs.keys()" :key="cost" :class="cost" class="cost">
        <span> {{ cost }} </span> <span> {{ startingCosts[cost] }} </span> <span></span>
      </div>
    </div>
  </div>
  <div id="gifts" class="box-list">
    <h3>Gifts</h3>
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
  <div id="bonds" class="box-list">
    <h3>Bonds</h3>
    <div v-for="(bond, i) in character?.bonds" :key="i">
      <label> Truth: <input type="text" v-model="bond.truth" /></label>
      <label> Technique: <input type="text" v-model="bond.technique" /></label>
      <button @click="character.bonds.splice(i, 1)">X</button>
    </div>
    <button type="button" @click="newBond()">Add Bond</button>
  </div>
  <div id="geasa" class="box-list">
    <h3>Geasa</h3>
    <div v-for="geas in character?.geasa" :key="geas">
      <p>{{ geas }}</p>
    </div>
    <button type="button" @click="newGeas()">Add Geas</button>
  </div>
  <EditGeas
    v-show="showGeasEditor"
    :geas="''"
    @update="addGeas"
    @close="() => (showGeasEditor = false)"
  ></EditGeas>
  <div id="treasures" class="box-list">
    <h3>Treasures</h3>
    <p>{{ character.treasures.length }} of {{ character.attributes.get('Flore') + 1 }}</p>
    <p v-for="(treasure, i) in character?.treasures" :key="i">{{ treasure }}</p>
    <button
      type="button"
      @click="newTreasure()"
      :disabled="character.treasures.length >= character.attributes.get('Flore') + 1"
    >
      Add Treasure
    </button>
  </div>
  <div id="arcana" class="box-list">
    <h3>Arcana</h3>
    <span id="arcana-count"> {{ character?.arcana.length }} of 12</span>
    <p v-for="(arcanum, i) in character?.arcana" :key="i">{{ arcanum }}</p>
    <button type="button" @click="newArcanum()" :disabled="character.arcana.length >= 12">
      Add Arcanum
    </button>
  </div>
  <div id="quests">
    <h2>Quest</h2>
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
  </div>
  <button type="button" :disabled="!characterComplete" @click="addCharacter()">OK</button>
</template>

<style lang="css" scoped>
.info {
  display: flex;
  flex-direction: column;
  padding-bottom: 2rem;
  border-bottom: 1px solid black;
}

.attributes-costs {
  display: grid;
  grid-template-columns: 1fr 1fr;
}

.attributes {
  display: flex;
  flex-direction: column;
}

.attribute,
.cost {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
}

.attribute button {
  margin-left: 1em;
  margin-right: 1em;
}

.costs {
  display: flex;
  flex-direction: column;
}

.box-list {
  border-radius: 3px;
  border: 1px solid black;
  min-height: 5rem;
}

.box-list > * {
  border-bottom: 1px solid black;
}
</style>
