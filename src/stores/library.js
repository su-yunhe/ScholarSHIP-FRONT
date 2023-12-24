import { defineStore } from 'pinia'
import { reactive, ref } from 'vue'
import { useUserStore } from './userStore'
import httpInstance from '@/utils/http'
const userStore = useUserStore()

export const useLibraryStore = defineStore('library', () => {
    const labelId = ref('')
    return{
        labelId,
    }
}, {
  persist: true,
})