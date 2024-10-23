<script lang="ts" setup>
import EditGift from '@/components/EditGift.vue'
import GiftSummary from '@/components/GiftSummary.vue'
import { useAppStore } from '@/stores/player'
import { ATTRIBUTES, Character, COSTS, Gift, type Attribute, type Cost } from '@/types'
import { ref, reactive, type Ref, computed } from 'vue'
import { useRoute } from 'vue-router'
const store = useAppStore()
const route = useRoute()
const char_id = Number.parseInt(route.params.id)
const character = store.characters.get(char_id) || reactive(new Character())
if (!store.characters.get(char_id)) {
  store.characters.set(char_id, character)
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
        <button @click="() => tickDown(attribute)">-</button>
        <span> {{ character?.attributes.get(attribute) }} </span>
        <button @click="() => tickUp(attribute)">+</button>
      </div>
    </div>
    <div class="costs">
      <h3>Starting Costs</h3>
      <div v-for="cost of character?.costs.keys()" :key="cost" :class="cost" class="cost">
        <span> {{ cost }} </span> <span> {{ startingCosts[cost] }} </span>
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
    <div v-for="bond in character?.bonds" :key="bond.truth.toString()">
      <h4>{{ bond.truth }}</h4>
      <em> Technique: </em> {{ bond.technique }}
    </div>
  </div>
  <div id="geasa" class="box-list">
    <h3>Geasa</h3>
    <div v-for="geas in character?.geasa" :key="geas.description.toString()">
      <p>{{ geas.description }}</p>
    </div>
  </div>
  <div id="treasures" class="box-list">
    <h3>Treasures</h3>
    <p v-for="treasure in character?.treasures" :key="treasure.toString()">{{ treasure }}</p>
  </div>
  <div id="arcana" class="box-list">
    <h3>Arcana</h3>
    <span id="arcana-count"> {{ character?.arcana.length }} / 12</span>
    <p v-for="arcanum in character?.arcana" :key="arcanum.toString()">{{ arcanum }}</p>
  </div>
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
