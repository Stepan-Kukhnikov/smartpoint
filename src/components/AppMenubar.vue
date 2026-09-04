<script setup>
import { computed } from 'vue'
import Menubar from 'primevue/menubar'
import Badge from 'primevue/badge'
import { useFavoritesStore } from '@/stores/favorites'

const favorites = useFavoritesStore()

const items = computed(() => [
  { label: 'Пользователи', icon: 'pi pi-users', route: '/' },
  {
    label: 'Избранное',
    icon: 'pi pi-star',
    route: '/favorites',
    badge: favorites.count || null,
  },
])
</script>

<template>
  <Menubar :model="items" class="mb-4 justify-content-center">
    <template #item="{ item, props }">
      <router-link v-slot="{ href, navigate, isExactActive }" :to="item.route" custom>
        <a
          :href="href"
          v-bind="props.action"
          :class="{ 'menu-item-active': isExactActive }"
          @click="navigate"
        >
          <span :class="item.icon"></span>
          <span class="ml-2">{{ item.label }}</span>
          <Badge v-if="item.badge" :value="item.badge" class="ml-2" />
        </a>
      </router-link>
    </template>
  </Menubar>
</template>

<style scoped>
.menu-item-active,
.menu-item-active :deep(.pi) {
  color: var(--p-green-500);
  font-weight: 600;
}
</style>