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
  return (
    character.cp() <= CHARPT_MAX &&
    character.quests.length == 1 &&
    character.characterName &&
    character.technique &&
    character.sanctuary &&
    character.sphere &&
    character.destruction
  )
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

let charPtsyellow = computed(() => character.cp() < 20)
let charPtsRed = computed(() => character.cp() > CHARPT_MAX)
let charPtsGreen = computed(() => 20 <= character.cp() && character.cp() <= CHARPT_MAX)
</script>

<template>
  <CharacterSheetTemplate>
    <template #character-info>
      <div id="names">
        <label for="character-name"> Character Name </label>
        <input type="text" id="character-name" v-model="character.characterName" />
        <label for="luthe"> Luthe </label
        ><input type="text" id="luthe" v-model="character.luthe" />
        <label for="bane"> My character is dying of: </label
        ><input type="text" id="bane" v-model="character.bane" />
      </div>
      <div id="background">
        <label for="technique"> Technique </label
        ><input type="text" id="technique" v-model="character.technique" />
        <label for="sanctuary"> Sanctuary </label
        ><input id="sanctuary" type="text" v-model="character.sanctuary" />
        <label for="sphere"> Sphere </label
        ><input id="sphere" type="text" v-model="character.sphere" />
        <label for="destruction"> Power of Destruction </label
        ><input id="destruction" type="text" v-model="character.destruction" />
      </div>
      <span :class="{ yellow: charPtsyellow, red: charPtsRed, green: charPtsGreen }">
        {{ character.cp() }} of {{ CHARPT_MAX }}</span
      >
      <span> character points used </span>
    </template>

    <template #attributes>
      <h4 class="attribute-title">Attributes</h4>
      <div id="attributes">
        <template v-for="(attribute, i) of ATTRIBUTES" :key="i">
          <span class="attribute-name"> {{ attribute }} </span>
          <div class="attribute-value" :class="'attribute-value-' + i">
            <button @click="() => tickDown(attribute)">-</button>
            <span> {{ character?.attributes.get(attribute) }} </span>
            <button @click="() => tickUp(attribute)">+</button>
          </div>
        </template>
      </div>
    </template>

    <template #costs>
      <h4 class="cost-title">Starting Costs</h4>
      <div id="costs">
        <template v-for="cost of character?.costs.keys()" :key="cost">
          <span class="cost-name"> {{ cost }} </span>
          <span class="cost-value"> {{ startingCosts.get(cost) }} </span>
        </template>
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
      <div v-for="(bond, i) in character?.bonds" :key="i">
        <label> Truth: <input type="text" v-model="bond.truth" /></label>
        <label> Technique: <input type="text" v-model="bond.technique" /></label>
        <button @click="character.bonds.splice(i, 1)">X</button>
      </div>
      <button type="button" @click="newBond()">Add Bond</button>
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
  </CharacterSheetTemplate>
  <button type="button" :disabled="!characterComplete" @click="addCharacter()">
    Create Character
  </button>
</template>

<style>
#names {
  display: grid;
  grid-template-columns: 1fr 3fr;
  margin-bottom: 1rem;
}

#background {
  display: grid;
  grid-template-columns: 1fr 2fr 1fr 2fr;
}

input {
  max-width: 15rem;
}

.yellow {
  color: #8c5821;
}

.red {
  color: var(--bs-red);
}

.green {
  color: var(--bs-green);
}
</style>
