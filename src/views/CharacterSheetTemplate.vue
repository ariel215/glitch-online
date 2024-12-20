<template>
  <div id="character-info" class="character-section">
    <h2>About</h2>
    <slot name="character-info"> </slot>
  </div>
  <div id="character-stats" class="character-section">
    <div id="attributes-costs">
      <slot name="attributes"></slot>
      <slot name="costs"></slot>
    </div>
  </div>
  <div id="character-features" class="character-section">
    <slot name="gifts"></slot>
    <slot name="bonds"></slot>
    <h4>Geasa</h4>
    <slot name="geasa"></slot>
  </div>
  <div id="treasures-arcana" class="character-section">
    <div id="treasures">
      <h3>Treasures</h3>
      <slot name="treasures"></slot>
    </div>
    <div id="arcana">
      <h3>Arcana</h3>
      <slot name="arcana"></slot>
    </div>
  </div>
  <div id="character-quests" class="character-section">
    <h3>Quests</h3>
    <slot name="quests"></slot>
  </div>
</template>

<style lang="css">
#attributes-costs {
  display: grid;
  grid-template-areas:
    'ah ah . ch ch'
    'at at . ct ct'
    'at at . ct ct'
    'at at . ct ct'
    'at at . ct ct';
}

#charater-info {
  display: flex;
  flex-direction: column;
  padding-bottom: 2rem;
  border-bottom: 1px solid black;
}

.box-list > * {
  border-bottom: 1px solid black;
}

.attribute-title {
  grid-area: ah;
}

.cost-title {
  grid-area: ch;
}

#attributes {
  grid-area: at;
}

#costs {
  grid-area: ct;
}

#attributes,
#costs {
  display: grid;
  grid-template-columns: 1fr 1fr;
}

.attribute,
.cost {
  display: grid;
  grid-template-columns: 2fr 1fr;
}

#attribute button {
  margin-left: 1em;
  margin-right: 1em;
}

.character-section {
  border-bottom: 1px solid grey;
  padding-bottom: 10px;
  margin-bottom: 5px;
}
</style>
