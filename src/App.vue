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
    store: {{store}}
    {{doubleCount}} <br>
    otherStore: {{otherStore}} <br>
    <!-- 可以直接读取和写入 -->
    <button @click="store.counter++">+</button> 
    <!-- 可以重置到其初始值 -->
    <button @click="store.$reset">重置</button>
    <button @click="store.increment(2)">++</button>
    <button @click="change">$patch</button>
    <button @click="changeAll">替换state</button>
    <button @click="store.throwError">报错</button>
    <br>
    {{getUserById(1)}} <br>
    {{otherGetter}}
  </footer>
</template>

<script setup>
import HelloWorld from './components/HelloWorld.vue'
import TheWelcome from './components/TheWelcome.vue'
import { useCounterStore } from './stores/counter'
import { useOtherStore } from './stores/other'
import { storeToRefs } from 'pinia';

const store = useCounterStore() // store 是一个被 reactive 包裹的对象，不能解构
const otherStore = useOtherStore()
const { doubleCount, getUserById, otherGetter } = storeToRefs(store) // 为了从 Store 中提取属性同时保持其响应式，需要使用storeToRefs()

console.log(import.meta.env);
// 订阅 store 的 mutation，在组件卸载时自动删除，若要在卸载组件后保留他们，需要配置第二个参数为 { detached: true }
store.$subscribe((mutation, state) => {
  console.log(mutation, state);
}, {detached: true})

// 订阅 action 及其结果
const unsubscribe = store.$onAction(({
  name, // action 的名字
  store, // store 实例
  args, // 调用这个 action 的参数
  after, // 在这个 action 执行完毕后，执行这个函数
  onError // 在这个 action 抛出异常的时候，执行这个函数
}) => {
  const startTime = Date.now();
  console.log(`Start "${name}" with params [${args.join(',')}].`);

  after(result => {
    console.log(`Finish "${name}" after ${Date.now() - startTime}ms.\nResult: ${result}`);
  })

  onError(error => {
    console.warn(`Failed "${name}"after ${Date.now() - startTime}ms.\nError: ${error}`);
  })
})


// 批量修改
function change() {
  store.$patch(state => {
    state.items.push('asd');
    state.hasChanged = !state.hasChanged;
  })
}
function changeAll() {
  // 只能修改已有的状态
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
