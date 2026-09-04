<script setup>
import { RouterView } from 'vue-router'
import AppMenubar from './components/AppMenubar.vue'
</script>

<template>
  <AppMenubar />
  <main class="p-4">
    <RouterView />
  </main>
</template>