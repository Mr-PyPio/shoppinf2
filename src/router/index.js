import { createRouter, createWebHistory } from 'vue-router'
const HomeView = () => import('views/index.vue')
const Search = () => import('views/search.vue')
const Products = () => import('views/products.vue')

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
  },
  {
    path: '/products.html',
    name: 'products',
    component: Products,
    props: $route => ({ query: $route.query.id })
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
