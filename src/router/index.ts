import { createRouter, createWebHistory } from 'vue-router'
import CharactersView from '@/views/CharactersView.vue'
import CharacterBuilder from '@/views/CharacterBuilder.vue'
import AboutView from '@/views/AboutView.vue'
import CharacterSheet from '@/views/CharacterSheet.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: CharactersView
    },
    {
      path: '/edit/:id',
      name: 'editCharacter',
      component: CharacterBuilder
    },
    {
      path: '/character/:id',
      name: 'character',
      component: CharacterSheet
    },
    {
      path: '/about',
      name: 'about',
      component: AboutView
    }
  ]
})

export default router
