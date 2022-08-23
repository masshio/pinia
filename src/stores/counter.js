import { defineStore } from 'pinia'
import { useOtherStore } from './other';

export const useCounterStore = defineStore({ 
  id: 'counter', // 应用程序中 store 的唯一 id
  state: () => ({
    counter: 1,
    name: 'callum',
    items: [],
    hasChanged: false,
    users: [
      {id: 1, name: 'callum'},
      {id: 2, name: 'leo'}
    ]
  }),
  getters: {
    doubleCount: state => state.counter * 2,
    doubleCountPlusOne() {
      // 通过 this 访问任何其他 getter (this 是 store 实例)
      return this.doubleCount + 1;
    },
    // 接收参数的 getter，类似 computed
    getUserById: state => {
      return userId => state.users.find(user => user.id === userId)
    },
    // 访问其他 Store 的 getter
    otherGetter(state) {
      const otherStore = useOtherStore()
      return state.name + otherStore.data
    }
  },
  // action 相当于组件的 methods
  actions: {
    increment(arg) {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          this.counter += arg
          resolve(arg)
        },1000)
      })
    },
    throwError() {
      throw new Error('action error')
    }
  }
})
