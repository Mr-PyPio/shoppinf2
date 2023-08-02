import { createRouter, createWebHistory  } from 'vue-router'
const HomeView = () => import('views/index.vue')
const Search = () => import('views/search.vue')

const routes = [
  {
    path: '/',
    name: 'index',
    component: HomeView
  },
  {
    path: '/search.html',
    name: 'search',
    component: Search,
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
