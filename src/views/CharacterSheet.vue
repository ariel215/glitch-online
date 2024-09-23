<script lang="ts" setup>
import { useAppStore } from '@/stores/player'
import { useRoute } from 'vue-router'
const store = useAppStore()
const route = useRoute()
const char_id = route.params.id
const character = store.characters.get(char_id)
</script>

<template>
  <div class="about">
    <label>
      Player Name <input type="text" id="character-name" :value="character?.playerName" />
    </label>
    <label>
      Character Name <input type="text" id="character-name" :value="character?.characterName" />
    </label>
    <label> Luthe <input type="text" id="luthe" :value="character?.luthe" /> </label>
    <label> Bane <input type="text" id="bane" :value="character?.bane" /> </label>
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
    <div v-for="gift in character?.gifts" :key="gift.name.toString()">
      <h3>{{ gift.name }}</h3>
      <p>{{ gift.description }}</p>
    </div>
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
