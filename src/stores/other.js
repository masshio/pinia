import { defineStore } from "pinia";

export const useOtherStore = defineStore({
    id: 'other',
    state: () => ({
        name: 'data'
    }),
    getters: {
        data: state => state.name + 'other'
    }
})