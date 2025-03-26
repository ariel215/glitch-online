<script setup lang="ts">
import { Quest } from '@/types'
const quest = defineModel<Quest>({ required: true })
</script>

<template>
  <div class="card">
    <h4 class="card-header">{{ quest.name }}</h4>
    <div class="card-body">
      <div class="xp-tracker">
        <span class="xp"> {{ quest.xp }}</span> out of
        <span class="xp-max">{{ quest.xp_needed }}</span>
        <button type="button" @click="quest.xp += 1">+1 XP</button>
      </div>
      <div class="quest-description">
        {{ quest.description }}
      </div>
      <div v-if="quest.conditions.kind == 'anytime'">
        <h5>Bonus XP</h5>
        <p>Earn 1 bonus XP towards this quest whenever:</p>
        <p>{{ quest.conditions.anytime }}</p>
      </div>
      <div v-else>
        <h5>Major Goals</h5>
        The GM can award you 5 XP towards this quest when:
        <ul>
          <li v-for="(condition, i) in quest.conditions.major" :key="i">{{ condition }}</li>
        </ul>
        You can earn each bonus once, for a total of up to 10 XP.
        <h5>Quest Flavor</h5>
        Once per chapter when you're in focus, you can earn 1 XP for yourself and 1 for the quest
        when:
        <ul>
          <li v-for="(condition, i) in quest.conditions.minor" :key="i">{{ condition }}</li>
        </ul>
        ...and so can any other player, once per chapter, if they substitute their PC for yours or
        otherwise involve them.
      </div>
    </div>
  </div>
</template>
