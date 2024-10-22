<script setup lang="ts">
import type { Gift } from '@/types'

const { gift } = defineProps<{ gift: Gift }>()
</script>

<template>
  <h1>{{ gift.name }}</h1>
  <p>{{ gift.cost }} {{ gift.level }}</p>
  <p>{{ gift.description }}</p>
</template>
