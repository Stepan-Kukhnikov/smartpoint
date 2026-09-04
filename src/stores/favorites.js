import { ref, computed, watch } from 'vue'
import { defineStore } from 'pinia'

const STORAGE_KEY = 'favorite-users'

export const useFavoritesStore = defineStore('favorites', () => {
  const items = ref(JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '[]'))
  const isEmpty = computed(() => items.value.length === 0)

  const ids = computed(() => new Set(items.value.map(u => u.id)))
  const isFavorite = (id) => ids.value.has(id)

  function toggle(user) {
    isFavorite(user.id) ? remove(user.id) : items.value.push(user)
  }
  function remove(id) {
    items.value = items.value.filter(u => u.id !== id)
  }

  watch(items, (val) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(val))
  }, { deep: true })

  return { items, isEmpty, isFavorite, toggle, remove }
})