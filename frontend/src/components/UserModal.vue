<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  user: Object,
  isEditing: Boolean,
  userOptions: Array
})

const emit = defineEmits(['save', 'close'])

const formData = ref({
  name: '',
  lastname: '',
  email: '',
  password: '',
  role: 'user'
})

// Watcher to populate form data when editing
watch(
  () => props.user,
  (newVal) => {
    if (newVal) {
      formData.value = { ...newVal }
    }
  },
  { immediate: true }
)

const handleSubmit = () => {
  const dataToSave = { ...formData.value }
  if (props.isEditing) {
    delete dataToSave.password
  }

  emit('save', dataToSave)
}

const closeModal = () => {
  emit('close')
}
</script>

<template>
  <div class="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
    <div class="bg-white p-6 rounded-lg shadow-lg w-96">
      <h2 class="text-xl font-semibold mb-4">
        {{ isEditing ? 'Modifier' : 'Ajouter' }} Utilisateur
      </h2>

      <div class="mb-4">
        <label for="name" class="block text-sm font-medium text-gray-700">Nom</label>
        <input
          v-model="formData.name"
          id="name"
          type="text"
          class="w-full p-2 border border-gray-300 rounded-md"
        />
      </div>

      <div class="mb-4">
        <label for="lastname" class="block text-sm font-medium text-gray-700">Prénom</label>
        <input
          v-model="formData.lastname"
          id="lastname"
          type="text"
          class="w-full p-2 border border-gray-300 rounded-md"
        />
      </div>

      <div class="mb-4">
        <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
        <input
          v-model="formData.email"
          id="email"
          type="email"
          class="w-full p-2 border border-gray-300 rounded-md"
        />
      </div>

      <div class="mb-4">
        <label for="password" class="block text-sm font-medium text-gray-700">Mot de passe</label>
        <input
          v-model="formData.password"
          id="password"
          type="password"
          class="w-full p-2 border border-gray-300 rounded-md"
          :disabled="isEditing"
        />
      </div>

      <div class="mb-6">
        <label for="role" class="block text-sm font-medium text-gray-700">Rôle</label>
        <select
          v-model="formData.role"
          id="role"
          class="w-full p-2 border border-gray-300 rounded-md"
        >
          <option value="user">Utilisateur</option>
          <option value="admin">Administrateur</option>
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
