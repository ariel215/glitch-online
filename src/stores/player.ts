import { defineStore } from 'pinia'
import { Player } from '@/types'

export const usePlayerStore = defineStore('player', {
  state: () => ({
    player: Player
  })
})
