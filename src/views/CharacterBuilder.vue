<script lang="ts" setup>
import EditGift from '@/components/EditGift.vue'
import EditQuest from '@/components/EditQuest.vue'
import {
  ATTRIBUTES,
  Bond,
  Character,
  CHARPT_MAX,
  COSTS,
  Gift,
  Quest,
  type Attribute
} from '@/types'
import { computed, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import CharacterSheetTemplate from './CharacterSheetTemplate.vue'
import { useCharacterStore } from '@/stores/character'
const store = useCharacterStore()
const router = useRouter()
const route = useRoute()

const character = getCharacter()
function getCharacter(): Character {
  if (route.name === 'newCharacter') {
    return store.newCharacter()
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
  router.push({ name: 'character', params: { id: character.id } })
}

watch(character, (c) => store.saveCharacter(c))

function newBond() {
  character.bonds.push(new Bond())
}

function newGeas() {
  character.geasa.push('')
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

let costs = computed(() => {
  let costs = character.costs
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

let charPtsyellow = computed(() => character.cp() < 20)
let charPtsRed = computed(() => character.cp() > CHARPT_MAX)
let charPtsGreen = computed(() => 20 <= character.cp() && character.cp() <= CHARPT_MAX)

const characterComplete = computed(() => {
  return (
    charPtsGreen &&
    character.quests.length == 1 &&
    character.characterName &&
    character.technique &&
    character.sanctuary &&
    character.sphere &&
    character.destruction
  )
})

function newQuest() {
  character.quests.push(new Quest())
}
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
      <div class="heading">
        <h4 class="attribute-title">Attributes</h4>
        <em> 3 pts/level of Ability; 2 pts/level otherwise </em>
      </div>
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
          <span class="cost-value"> {{ costs.get(cost) }} </span>
        </template>
      </div>
    </template>

    <template #gifts>
      <h4 v-if="character.gifts">Gifts</h4>
      <div id="gifts" class="card-group">
        <div v-for="(gift, index) in character?.gifts" :key="index">
          <EditGift
            v-model="character.gifts[index]"
            @close="character.gifts.splice(index, 1)"
          ></EditGift>
        </div>
      </div>
      <button type="button" @click="character.gifts.push(new Gift())">Add Gift</button>
    </template>

    <template #bonds>
      <h4>Bonds</h4>
      <p><em> 1 point each </em></p>
      <div v-for="(bond, i) in character?.bonds" :key="i">
        <label> Truth: <input type="text" v-model="bond.truth" /></label>
        <label> Technique: <input type="text" v-model="bond.technique" /></label>
        <button @click="character.bonds.splice(i, 1)">X</button>
      </div>
      <button type="button" @click="newBond()">Add Bond</button>
    </template>

    <template #geasa>
      <p><em> 1 point each </em></p>
      <div v-for="(geas, i) in character?.geasa" :key="geas">
        <input type="text" v-model="character.geasa[i]" />
        <button @click="() => character.geasa.splice(i, 1)">X</button>
      </div>
      <button type="button" @click="newGeas()">Add Geas</button>
    </template>
    <template #treasures>
      <p>
        <em>{{ character.treasures.length }} of {{ character.attributes.get('Flore') + 1 }}</em>
      </p>
      <p v-for="(_treasure, i) in character?.treasures" :key="i">
        <input type="text" v-model="character.treasures[i]" />
        <button type="button" @click="character.treasures.splice(i, 1)">X</button>
      </p>
      <button
        type="button"
        @click="newTreasure()"
        :disabled="character.treasures.length >= character.attributes.get('Flore') + 1"
      >
        Add Treasure
      </button>
    </template>

    <template #arcana>
      <p id="arcana-count">
        <em>{{ character?.arcana.length }} of 12</em>
      </p>
      <p v-for="(_arcanum, i) in character?.arcana" :key="i">
        <input type="text" v-model="character.arcana[i]" />
        <button type="button" @click="character.arcana.splice(i, 1)">X</button>
      </p>
      <button type="button" @click="newArcanum()" :disabled="character.arcana.length >= 12">
        Add Arcanum
      </button>
    </template>
    <template #quests>
      <div v-if="character.quests.length">
        <EditQuest v-model="character.quests[0]" />
        <button type="button" @click="() => (character.quests = [])">X</button>
      </div>
      <div v-else>
        <button type="button" @click="newQuest()" :disabled="character.quests.length > 0">
          Create New Quest
        </button>
      </div>
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

.card-list {
  display: flex;
  flex-direction: row;
}
</style>
