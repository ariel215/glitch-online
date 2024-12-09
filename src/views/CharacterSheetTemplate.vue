<template>
  <div id="character-info">
    <slot name="character-info"> </slot>
  </div>
  <div id="character-stats">
    <h3>Stats</h3>
    <div id="attributes-costs">
      <div id="attributes">
        <slot name="attributes"></slot>
      </div>
      <div id="costs">
        <slot name="costs"></slot>
      </div>
    </div>
  </div>
  <div id="character-features" class="box-list">
    <h3>Gifts</h3>
    <slot name="gifts"></slot>
    <h3>Bonds</h3>
    <slot name="bonds"></slot>
    <h3>Geasa</h3>
    <slot name="geasa"></slot>
  </div>
  <div id="treasures-arcana" class="box-list">
    <div id="treasures">
      <h3>Treasures</h3>
      <slot name="treasures"></slot>
    </div>
    <div id="arcana">
      <h3>Arcana</h3>
      <slot name="arcana"></slot>
    </div>
  </div>
  <div id="character-quests" class="box-list">
    <h3>Quests</h3>
    <slot name="quests"></slot>
  </div>
</template>

<style lang="css">
#attributes-costs {
  display: flex;
  flex-direction: row;
}

#charater-info {
  display: flex;
  flex-direction: column;
  padding-bottom: 2rem;
  border-bottom: 1px solid black;
}

#attributes-costs {
  display: flex;
  flex-direction: row;
}
.box-list {
  border-radius: 3px;
  border: 1px solid black;
  min-height: 5rem;
}

.box-list > * {
  border-bottom: 1px solid black;
}

#attributes,
#costs {
  display: flex;
  flex-direction: column;
}

.attribute,
.cost {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
}

#attribute button {
  margin-left: 1em;
  margin-right: 1em;
}
</style>
