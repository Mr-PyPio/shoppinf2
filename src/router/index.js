import { createRouter, createWebHistory } from 'vue-router'
const HomeView = () => import('views/index.vue')
const Search = () => import('views/search.vue')
const Products = () => import('views/products.vue')
const Category = () => import('views/category.vue')
const DailyNew = () => import('views/daily-new.vue')
const TimeSale = () => import('views/time-sale.vue')
const Hot = () => import('views/hot.vue')
const Login = () => import('views/login.vue')
const Cart = () => import('views/cart.vue')
const Personal = () => import('views/personal.vue')
const Checkout = () => import('views/checkout.vue')
const NotFoundComponent = () => import('components/tool/notFoundComponent.vue')
const PaymentSuccess = () => import('components/checkout/paySuccess.vue')
const PaymentFailure = () => import('components/checkout/payFailure.vue')
const Address = () => import('components/personal/address.vue')
const AddressChange = () => import('components/personal/addressChange.vue')

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
    path: '/daily-new.html',
    name: 'daily-new',
    component: DailyNew,
  },
  {
    path: '/time-sale.html',
    name: 'time-sale',
    component: TimeSale,
  },
  {
    path: '/hot.html',
    name: 'hot',
    component: Hot,
  },
  {
    path: '/products.html',
    name: 'products',
    component: Products,
    props: route => ({ query: route.query.id })
  },
  {
    path: '/category.html',
    name: 'category',
    component: Category,
    props: route => ({ query: route.query.id })
  },
  {
    path: '/login.html',
    name: 'login',
    component: Login,
    props: route => ({ query: route.query.type })
  },
  {
    path: '/cart.html',
    name: 'cart',
    component: Cart,
  },
  {
    path: '/personal.html',
    name: 'personal',
    component: Personal,
  },
  {
    path: '/checkout.html',
    name: 'checkout',
    component: Checkout,
  },
  {
    path: '/payment_success.html',
    name: 'paymentSuccess',
    component: PaymentSuccess,
  },
  {
    path: '/payment_failure.html',
    name: 'paymentFailure',
    component: PaymentFailure,
  },
  {
    path: '/address.html',
    name: 'address',
    component: Address,
  },
  {
    path: '/addressChange.html',
    name: 'addressChange',
    component: AddressChange,
  },
  {
    path: '/404',
    name: 'NotFound',
    component: NotFoundComponent
  },
  {
    path: '/:catchAll(.*)',
    redirect: '/404'
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

/* eslint-disable */
// router.beforeEach(async (to) => {
//   const tokenStr = window.localStorage.getItem('userLimit') ?? ''
//   const userName = window.localStorage.getItem('username') ?? ''
//   if (to.name != 'Login') {
//     // 没有token，强制跳转到登录页=
//     if (tokenStr) {
//       const { data: res } = await axios.post('loginStatus', { token: tokenStr, username: userName })
//       if (res.status == '400' || res.msg == '已过期') {
//         return '/login.html'
//       }
//     } else {
//       return '/login.html'
//     }
//   }
// })

export default router
