import axios from 'axios'
import { defineStore } from 'pinia'

export const useCounterStore = defineStore('defineStore', {
  state: () => {
    return {
      orderLen: 0,
      wisthLen: 0,
      email: '',
      cartQty: 0,
      userName: window.localStorage.getItem('username') ?? '',
      noLoginCartData: [],
      loginStatus: false,
      cartNum: 0,
      userId: ''
    }
  },
  actions: {
    async userMessage() {
      const token = window.localStorage.getItem('userLimit') ?? ''
      const { data: data } = await axios.post('loginStatus', { token, userName: this.userName })
      if (data.status == 200) {
        // this.orderLen = data.data[0].user_orderid ? data.data[0].user_orderid.length : 0
        // this.wisthLen = data.data[0].user_wishid ? data.data[0].user_wishid.length : 0
        this.cartNum = data.data[0].cart_num
        this.email = data.data[0].email
        this.userId = data.data[0].user_id
        this.loginStatus = true
      } else {
        // this.orderLen = 0
        // this.wisthLen = 0
        this.email = ''
        this.userId = ''
        this.loginStatus = false
        if (this.noLoginCartData.length > 0) {
          const arr = this.noLoginCartData
          let qty = 0
          arr.forEach(item => {
            qty += item.qty
          })
          this.cartNum = qty
        } else {
          this.cartNum = 0
        }
      }
    },
  },
  getters: {

  },
  persist: true,
})
