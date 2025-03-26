<script setup lang="ts">
import { type QuestDescription } from '@/types'

const { quest } = defineProps<{ quest: QuestDescription }>()
</script>

<template>
  <div>
    <h1>{{ quest.name }}</h1>
    <span v-for="(arc, i) in quest.arcs" :key="i"> {{ arc.toString() }}</span>
    <p>{{ quest.description }}</p>
    <div v-if="quest.conditions.kind == 'anytime'">
      Once every 15 minutes or so, whenever you {{ quest.conditions.anytime }}, the GM may award you
      1 XP.
    </div>
    <div v-else>
      The GM may have you mark 5 xp on this quest when you:
      <ul>
        <li v-for="(condition, i) in quest.conditions.major" :key="i">{{ condition }}</li>
      </ul>
      Additionally, whenever you or anyone else does one of the following, mark 1 XP on this quest:
      <ul>
        <li v-for="(condition, i) in quest.conditions.minor" :key="i">{{ condition }}</li>
      </ul>
    </div>
  </div>
</template>
