<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import Button from 'primevue/button'
import Message from 'primevue/message'
import { useFavoritesStore } from '@/stores/favorites'

const favorites = useFavoritesStore()

const users = ref([])
const loading = ref(false)
const error = ref(null)

async function fetchUsers() {
  loading.value = true
  error.value = null
  try {
    const { data } = await axios.get('https://jsonplaceholder.typicode.com/users')
    users.value = data
  } catch (e) {
    error.value = 'Не удалось загрузить список пользователей'
    console.error(e)
  } finally {
    loading.value = false
  }
}

onMounted(fetchUsers)
</script>

<template>
  <Message v-if="error" severity="error" class="mb-3">
    {{ error }}
    <Button label="Повторить" link size="small" @click="fetchUsers" />
  </Message>

  <DataTable
    :value="users"
    :loading="loading"
    dataKey="id"
    paginator
    :rows="10"
    :rowsPerPageOptions="[5, 10, 20]"
    stripedRows
    responsiveLayout="scroll"
  >
    <template #empty>
      <span v-if="!loading">Нет данных</span>
    </template>

    <Column field="id" header="ID" sortable style="width: 5rem"></Column>
    <Column field="name" header="Name" sortable></Column>
    <Column field="email" header="Email" sortable></Column>
    <Column field="address.street" header="Street" sortable></Column>
    <Column field="phone" header="Phone" sortable></Column>
    <Column field="company.name" header="Company" sortable></Column>

    <Column header="" style="width: 12rem">
      <template #body="{ data }">
        <Button
          :severity="favorites.isFavorite(data.id) ? 'success' : 'contrast'"
          :icon="favorites.isFavorite(data.id) ? 'pi pi-star-fill' : 'pi pi-star'"
          label="В избранное"
          size="small"
          @click="favorites.toggle(data)"
        />
      </template>
    </Column>
  </DataTable>
</template>