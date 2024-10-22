<script lang="ts" setup>
import EditGift from '@/components/EditGift.vue'
import GiftSummary from '@/components/GiftSummary.vue'
import { useAppStore } from '@/stores/player'
import { Character, Gift } from '@/types'
import { ref, type Ref } from 'vue'
import { useRoute } from 'vue-router'
const store = useAppStore()
const route = useRoute()
const char_id = Number.parseInt(route.params.id)
let character = store.characters.get(char_id)
if (!character) {
  character = new Character()
  store.characters.set(char_id, character)
}
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
</script>

<template>
  <div class="about">
    <label>
      Player Name <input type="text" id="character-name" v-model="character.playerName" />
    </label>
    <label>
      Character Name <input type="text" id="character-name" v-model="character.characterName" />
    </label>
    <label> Luthe <input type="text" id="luthe" v-model="character.luthe" /> </label>
    <label> Bane <input type="text" id="bane" v-model="character.bane" /> </label>
  </div>
  <div class="stats">
    <div
      v-for="attribute of character?.attributes.keys()"
      :key="attribute"
      :class="attribute"
      class="attribute"
    >
      <span> {{ attribute }} </span> <span> {{ character?.attributes.get(attribute) }} </span>
    </div>
    <div v-for="cost of character?.costs.keys()" :key="cost" :class="cost" class="cost">
      <span> {{ cost }} </span> <span> {{ character?.costs.get(cost) }} </span>
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
.about {
  display: grid;
  grid-template-columns: auto;
  padding-bottom: 2rem;
  border-bottom: 1px solid black;
}

.stats {
  display: grid;
  grid-template-rows: repeat(1fr, 5);
  grid-template-columns: 1fr, 4fr;
}

.attribute {
  grid-column: 1;
}

.cost {
  grid-column: 2;
}

.box-list {
  border-radius: 3px;
  border: 1px solid black;
  min-height: 5rem;
}
</style>
