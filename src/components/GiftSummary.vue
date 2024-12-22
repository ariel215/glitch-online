<script setup lang="ts">
import type { Gift } from '@/types'

const { gift } = defineProps<{ gift: Gift }>()
</script>

<template>
  <div class="card">
    <h4 class="card-header">{{ gift.name }}</h4>
    <div class="card-body">
      <p>{{ gift.description }}</p>
      <p>A {{ gift.cost }} {{ gift.level }} miracle</p>
      <p>
        {{ gift.activation }} activation, {{ gift.range }} range, {{ gift.flexibility }} flexibility
      </p>
    </div>
  </div>
</template>
