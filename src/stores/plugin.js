import { ref } from "vue";
/**
 * 
 * @param {Object} context
 * {
 *   pinia, // 使用 createPinia() 创建的 pinia
 *   app, // 使用 createApp() 创建的当前应用程序（仅限 Vue 3）
 *   store, // 插件正在扩充的 store
 *   options // 定义存储的选项对象传递给 defineStore()
 * } 
 */
export function myPiniaPlugin(context) {
    console.log(context);
    let { store } = context
    store.hello = 'world'

    store.shared = ref('shared')
    // store.shared // 'shared' 它会自动展开

    if (process.env.NODE_ENV === 'development') {
        store._customProperties.add('hello')
    }
    // return {
    //     hello: 'world'
    // }
}