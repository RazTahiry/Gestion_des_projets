<script setup>
import { ref, watch, onMounted } from 'vue'
import { getUsers } from '../services/user_api'

const props = defineProps({
  task: Object,
  isEditing: Boolean
})

const users = ref([]) // Pour stocker les utilisateurs récupérés

// Fonction pour récupérer les utilisateurs
const fetchUsers = async () => {
  try {
    const usersData = await getUsers()
    users.value = usersData
  } catch (error) {
    console.error('Error fetching users:', error)
  }
}

const emit = defineEmits(['save', 'close'])

const formData = ref({
  name: '',
  description: '',
  Pid_person: '',
  status: 'En attente'
})

// Watcher to populate form data when editing
watch(
  () => props.task,
  (newVal) => {
    if (newVal) {
      formData.value = { ...newVal }
    }
  },
  { immediate: true }
)

const handleSubmit = () => {
  emit('save', formData.value)
}

const closeModal = () => {
  emit('close')
}

onMounted(() => {
  fetchUsers()
})
</script>

<template>
  <div class="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
    <div class="bg-white p-6 rounded-lg shadow-lg w-96">
      <h2 class="text-xl font-semibold mb-4">{{ isEditing ? 'Modifier' : 'Ajouter' }} Tâche</h2>

      <div class="mb-4">
        <label for="title" class="block text-sm font-medium text-gray-700">Titre</label>
        <input
          v-model="formData.name"
          id="title"
          type="text"
          class="w-full p-2 border border-gray-300 rounded-md"
        />
      </div>

      <div class="mb-4">
        <label for="description" class="block text-sm font-medium text-gray-700">Description</label>
        <input
          v-model="formData.description"
          id="description"
          type="text"
          class="w-full p-2 border border-gray-300 rounded-md"
        />
      </div>

      <div class="mb-4">
        <label for="userId" class="block text-sm font-medium text-gray-700">Utilisateur</label>
        <select
          v-model="formData.Pid_person"
          id="userId"
          class="w-full p-2 border border-gray-300 rounded-md"
          :disabled="isEditing"
        >
          <option value="" disabled>Choisir un utilisateur</option>
          <option v-for="user in users" :key="user.id" :value="user.id">
            {{ user.email }}
          </option>
        </select>
      </div>

      <div class="mb-6">
        <label for="status" class="block text-sm font-medium text-gray-700">Statut</label>
        <select
          v-model="formData.status"
          id="status"
          class="w-full p-2 border border-gray-300 rounded-md"
        >
          <option value="En attente">En attente</option>
          <option value="En cours">En cours</option>
          <option value="Complété">Complété</option>
        </select>
      </div>

      <div class="flex justify-end">
        <button @click="closeModal" class="bg-gray-300 text-gray-700 px-4 py-2 rounded-md mr-2">
          Annuler
        </button>
        <button @click="handleSubmit" class="bg-indigo-600 text-white px-4 py-2 rounded-md">
          {{ isEditing ? 'Modifier' : 'Ajouter' }}
        </button>
      </div>
    </div>
  </div>
</template>
