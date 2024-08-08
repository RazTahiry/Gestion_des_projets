<script setup>
import { ref, onMounted } from 'vue'
import { getTasks, createTask, updateTask, deleteTask } from '../services/task_api'
import { getUser } from '../services/user_api'
import TaskModal from './TaskModal.vue'

const tasks = ref([])
const showModal = ref(false)
const selectedTask = ref(null)
const isEditing = ref(false)

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
  } catch (error) {
    console.error('Error fetching tasks or users:', error)
  }
}

// Function to handle task creation or editing
const saveTask = async (formData) => {
  try {
    if (isEditing.value && selectedTask.value) {
      await updateTask(selectedTask.value.Pid_person, selectedTask.value.id, formData)
    } else {
      await createTask(formData.Pid_person, formData)
    }
    fetchTasks()
    closeModal()
  } catch (error) {
    console.error('Error saving task:', error)
  }
}

const addTask = () => {
  selectedTask.value = null
  isEditing.value = false
  showModal.value = true
}

const editTask = (task) => {
  selectedTask.value = task
  isEditing.value = true
  showModal.value = true
}

// Function to close the modal
const closeModal = () => {
  showModal.value = false
}

// Function to delete a task
const removeTask = async (userId, taskId) => {
  try {
    await deleteTask(userId, taskId)
    fetchTasks()
  } catch (error) {
    console.error('Error deleting task:', error)
  }
}

// Appel de la fonction au montage du composant
onMounted(() => {
  fetchTasks()
})
</script>

<template>
  <div>
    <div class="bg-white p-6 rounded-lg shadow-lg">
      <div class="mb-6 flex justify-between items-center">
        <h2 class="text-2xl font-semibold text-gray-800">Gestion des Tâches</h2>
        <button
          @click="addTask"
          class="bg-indigo-600 text-white py-2 px-4 rounded-lg shadow hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          Ajouter une Tâche
        </button>
      </div>

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
                Description
              </th>
              <th
                class="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider"
              >
                Status
              </th>
              <th
                class="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider"
              >
                Assigné à
              </th>
              <th
                class="px-6 py-3 text-right text-sm font-medium text-gray-500 uppercase tracking-wider"
              >
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="task in tasks" :key="task.id" class="bg-white border-b hover:bg-gray-50">
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ task.name }}</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {{ task.description }}
              </td>
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
              <td class="px-6 py-4 text-sm text-gray-900">{{ task.userEmail }}</td>
              <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <button
                  @click="editTask(task)"
                  class="text-indigo-600 hover:text-indigo-900 focus:outline-none"
                >
                  Éditer
                </button>
                <button
                  @click="removeTask(task.Pid_person, task.id)"
                  class="text-red-600 hover:text-red-900 focus:outline-none ml-4"
                >
                  Supprimer
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Modal for Adding/Editing Task -->
      <task-modal
        v-if="showModal"
        :task="selectedTask"
        :is-editing="isEditing"
        @save="saveTask"
        @close="closeModal"
      />
    </div>
  </div>
</template>
