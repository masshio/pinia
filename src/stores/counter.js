import { defineStore } from 'pinia'

export const useCounterStore = defineStore({ 
  id: 'counter', // 应用程序中 store 的唯一 id
  state: () => ({
    counter: 1,
    name: 'callum',
    items: [],
    hasChanged: false
  }),
  getters: {
    doubleCount: (state) => state.counter * 2
  },
  actions: {
    increment() {
      this.counter++
    }
  }
})
