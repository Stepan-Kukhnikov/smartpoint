<script setup>
import FavoriteCard from '@/components/FavoriteCard.vue'
import { useFavoritesStore } from '@/stores/favorites'

const favorites = useFavoritesStore()
</script>

<template>
  <div
    v-if="favorites.isEmpty"
    class="flex flex-column align-items-center justify-content-center gap-3 mt-8"
  >
    <i class="pi pi-star text-5xl text-color-secondary"></i>
    <p class="m-0 text-color-secondary">Нет пользователей в избранном</p>
  </div>
  

  <div v-else class="grid">
    <div
      v-for="user in favorites.items"
      :key="user.id"
      class="col-12 sm:col-6 lg:col-4 xl:col-3"
    >
      <FavoriteCard :user="user" @remove="favorites.remove" />
    </div>
  </div>
</template>