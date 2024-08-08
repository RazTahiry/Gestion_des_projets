<script setup>
import { ref, onMounted } from 'vue'
import { getTasks } from '../services/task_api'
import { getUsers, getUser } from '../services/user_api'

const tasks = ref([])
let nb_user = ref(0)
let nb_task = ref(0)

// Fonction pour récupérer les données des tâches
const fetchTasks = async () => {
  try {
    const taskData = await getTasks()
    const tasksWithUserEmail = await Promise.all(
      taskData.map(async (task) => {
        const user = await getUser(task.Pid_person)
        return {
          ...task,
          userEmail: user.email
        }
      })
    )
    tasks.value = tasksWithUserEmail
    nb_task.value = tasksWithUserEmail.length
  } catch (error) {
    console.error('Error fetching tasks or users:', error)
  }
}

// Fonction pour récupérer les données des utilisateurs
const fetchUsers = async () => {
  try {
    const taskData = await getUsers()

    // Compter le nombre des utilisateurs
    nb_user.value = taskData.length
  } catch (error) {
    console.error('Error fetching users:', error)
  }
}

// Appel de la fonction au montage du composant
onMounted(() => {
  fetchTasks(), fetchUsers()
})
</script>

<template>
  <div>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div class="bg-white shadow-lg rounded-lg p-6">
        <div class="flex items-center justify-between">
          <div class="text-lg font-medium text-gray-700">Nombre d'utilisateurs</div>
          <div class="text-3xl font-bold text-indigo-600">{{ nb_user }}</div>
        </div>
      </div>

      <div class="bg-white shadow-lg rounded-lg p-6">
        <div class="flex items-center justify-between">
          <div class="text-lg font-medium text-gray-700">Nombre de tâches</div>
          <div class="text-3xl font-bold text-indigo-600">{{ nb_task }}</div>
        </div>
      </div>
    </div>

    <div class="mt-8 bg-white shadow-lg rounded-lg overflow-hidden">
      <div class="py-6 px-3">
        <h2 class="text-lg font-medium text-gray-700 mb-4">Liste des tâches</h2>
        <div class="overflow-x-auto">
          <table class="min-w-full bg-white">
            <thead class="bg-gray-50 border-b">
              <tr>
                <th
                  class="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider"
                >
                  Titre
                </th>
                <th
                  class="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider"
                >
                  Déscription
                </th>
                <th
                  class="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider"
                >
                  Dernière modification
                </th>
                <th
                  class="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider"
                >
                  Utilisateur
                </th>
                <th
                  class="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider"
                >
                  Status
                </th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-200">
              <tr v-for="task in tasks" :key="task.id">
                <td class="px-6 py-4 text-sm text-gray-900">{{ task.name }}</td>
                <td class="px-6 py-4 text-sm text-gray-900">{{ task.description }}</td>
                <td class="px-6 py-4 text-sm text-gray-900">
                  {{ new Date(task.updatedAt).toLocaleDateString() }}
                </td>
                <td class="px-6 py-4 text-sm text-gray-900">{{ task.userEmail }}</td>
                <td class="px-6 py-4 text-sm">
                  <span
                    :class="{
                      'bg-green-200 text-green-700': task.status === 'Complété',
                      'bg-yellow-200 text-yellow-700': task.status === 'En cours',
                      'bg-red-200 text-red-700': task.status === 'En attente'
                    }"
                    class="relative inline-block px-3 py-1 font-semibold leading-tight rounded-full"
                  >
                    <span aria-hidden class="absolute inset-0 rounded-full opacity-50"></span>
                    <span class="relative">{{ task.status }}</span>
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>
