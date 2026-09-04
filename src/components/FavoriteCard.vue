<script setup>
import Card from 'primevue/card'
import Button from 'primevue/button'

defineProps({
  user: {
    type: Object,
    required: true,
  },
})

const emit = defineEmits(['remove'])
</script>

<template>
  <Card class="h-full favorite-card">
    <template #title>
      <span class="text-lg">{{ user.name }}</span>
    </template>

    <template #content>
      <ul class="list-none p-0 m-0 flex flex-column gap-2 text-sm">
        <li>
          <strong>Email:</strong>
          <a :href="`mailto:${user.email}`" class="ml-1">{{ user.email }}</a>
        </li>
        <li><strong>Phone:</strong> <span class="ml-1">{{ user.phone }}</span></li>
        <li>
          <strong>Address:</strong>
          <span class="ml-1">{{ user.address.street }}, {{ user.address.city }}</span>
        </li>
        <li><strong>Company:</strong> <span class="ml-1">{{ user.company.name }}</span></li>
        <li>
          <strong>Website:</strong>
          <a
            :href="`https://${user.website}`"
            target="_blank"
            rel="noopener"
            class="ml-1"
          >{{ user.website }}</a>
        </li>
      </ul>
    </template>

    <template #footer>
      <Button
        icon="pi pi-trash"
        label="Удалить из избранного"
        severity="danger"
        outlined
        size="small"
        @click="emit('remove', user.id)"
      />
    </template>
  </Card>
</template>

<style scoped>
.favorite-card :deep(.p-card-body) {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.favorite-card :deep(.p-card-footer) {
  margin-top: auto;
}

.favorite-card a {
  color: inherit;
  text-decoration: none;
  word-break: break-word;
}

.favorite-card a:hover {
  text-decoration: underline;
}
</style>