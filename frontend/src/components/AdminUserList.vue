<script setup>
import { ref, onMounted } from 'vue'
import { getUsers, createUser, updateUser, deleteUser } from '../services/user_api'
import UserModal from './UserModal.vue'

const users = ref([])
const showModal = ref(false)
const selectedUser = ref(null)
const isEditing = ref(false)

// Fonction pour récupérer les données des tâches
const fetchUsers = async () => {
  try {
    const usersData = await getUsers()
    users.value = usersData
  } catch (error) {
    console.error('Error fetching users:', error)
  }
}

// Function to handle user creation or editing
const saveUser = async (formData) => {
  try {
    if (isEditing.value && selectedUser.value) {
      await updateUser(selectedUser.value.id, formData)
    } else {
      await createUser(formData)
    }
    fetchUsers()
    closeModal()
  } catch (error) {
    console.error('Error saving user:', error)
  }
}
// Function to open the modal for creating a new user
const addUser = () => {
  selectedUser.value = null
  isEditing.value = false
  showModal.value = true
}

const editUser = (user) => {
  selectedUser.value = user
  isEditing.value = true
  showModal.value = true
}

// Function to close the modal
const closeModal = () => {
  showModal.value = false
}

// Function to delete a user
const removeUser = async (userId) => {
  try {
    await deleteUser(userId)
    fetchUsers()
  } catch (error) {
    console.error('Error deleting user:', error)
  }
}

// Appel de la fonction au montage du composant
onMounted(() => {
  fetchUsers()
})
</script>

<template>
  <div class="bg-white p-6 rounded-lg shadow-lg">
    <div class="mb-6 flex justify-between items-center">
      <h2 class="text-2xl font-semibold text-gray-800">Gestion des Utilisateurs</h2>
      <button
        @click="addUser"
        class="bg-indigo-600 text-white py-2 px-4 rounded-lg shadow hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
      >
        Ajouter un Utilisateur
      </button>
    </div>

    <div class="overflow-x-auto">
      <table class="min-w-full bg-white">
        <thead class="bg-gray-50 border-b">
          <tr>
            <th
              class="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider"
            >
              Nom
            </th>
            <th
              class="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider"
            >
              Email
            </th>
            <th
              class="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider"
            >
              Rôle
            </th>
            <th
              class="px-6 py-3 text-right text-sm font-medium text-gray-500 uppercase tracking-wider"
            >
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in users" :key="user.id" class="bg-white border-b hover:bg-gray-50">
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
              {{ user.name + ' ' + user.lastname }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ user.email }}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
              {{ user.role === 'admin' ? 'Administrateur' : 'Utilisateur' }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
              <button
                @click="editUser(user)"
                class="text-indigo-600 hover:text-indigo-900 focus:outline-none"
              >
                Éditer
              </button>
              <button
                @click="removeUser(user.id)"
                class="text-red-600 hover:text-red-900 focus:outline-none ml-4"
              >
                Supprimer
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Modal for Adding/Editing User -->
    <user-modal
      v-if="showModal"
      :user="selectedUser"
      :is-editing="isEditing"
      @save="saveUser"
      @close="closeModal"
    />
  </div>
</template>
