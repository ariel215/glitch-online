<script lang="ts" setup>
import { usePlayerStore } from '@/stores/player'
import { computed } from 'vue'
import { Player, Attribute, Cost } from '@/types'

const store = usePlayerStore()
const player = new Player()
const attributes = Object.entries(Attribute)
const costs = Object.entries(Cost)
console.log('hello world')
</script>

<template>
  hello world!
  <!-- <div class="about">
    <label> Player Name <input type="text" id="player-name" :value="player.playerName" /> </label>
    <label>
      Character Name <input type="text" id="character-name" :value="player.characterName" />
    </label>
    <label> Luthe <input type="text" id="luthe" :value="player.luthe" /> </label>
    <label> Bane <input type="text" id="bane" :value="player.bane" /> </label>
  </div>
  <div class="attributes-costs">
    <div v-for="attribute of attributes" :key="attribute">
      <span class="attribute-name"> {{ attribute[1] }}</span>
      <span class="attribute-value">{{ player.attributes.get(attribute[1]) }}</span>
    </div>
    <div v-for="cost of costs" :key="cost">
      <span class="cost-name">{{ cost }}</span>
      <span class="cost-value"> {{ player.costs.get(cost) }}</span>
    </div>
  </div> -->
</template>

<style lang="css" scoped></style>
