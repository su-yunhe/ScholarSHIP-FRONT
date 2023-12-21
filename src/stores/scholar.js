import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import httpInstance from '@/utils/http'

export const useScholarStore = defineStore('scholar', () => {
    let scholarInfo = {}
    let essayList = []
    let removedEssayList = []
    let graph_data = {}

    return{
        scholarInfo,
        essayList,
        removedEssayList,
        graph_data,
    }
}, {
  persist: true,
})