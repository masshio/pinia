<template>
  <header>
    <img alt="Vue logo" class="logo" src="./assets/logo.svg" width="125" height="125" />

    <div class="wrapper">
      <HelloWorld msg="You did it!" />
    </div>
  </header>

  <main>
    <TheWelcome />
  </main>

  <footer>
    {{store}}
    {{doubleCount}} <br>
    <!-- 可以直接读取和写入 -->
    <button @click="store.counter++">+</button> 
    <!-- 可以重置到其初始值 -->
    <button @click="store.$reset">重置</button>
    <button @click="store.increment">++</button>
    <button @click="change">$patch</button>
    <button @click="changeAll">替换state</button>
  </footer>
</template>

<script setup>
import HelloWorld from './components/HelloWorld.vue'
import TheWelcome from './components/TheWelcome.vue'
import { useCounterStore } from './stores/counter'
import { storeToRefs } from 'pinia';

const store = useCounterStore(); // store 是一个被 reactive 包裹的对象，不能解构
console.log(store);
const { doubleCount } = storeToRefs(store) // 为了从 Store 中提取属性同时保持其响应式，需要使用storeToRefs()
// 批量修改
function change() {
  store.$patch(state => {
    state.items.push('asd');
    state.hasChanged = !state.hasChanged;
  })
}
function changeAll() {
  store.$state = {
    counter: 666,
    name: 'fool'
  }
}
</script>

<style scoped>
header {
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}
</style>
