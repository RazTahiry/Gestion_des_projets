<script>
import { login } from '../services/auth_api'

export default {
  data() {
    return {
      formData: {
        email: '',
        password: ''
      },
      errorMessage: ''
    }
  },
  methods: {
    async submitForm() {
      try {
        const response = await login(this.formData)
        if (response.status === 200) {
          const { user, token } = response.data
          const { id, role } = user
          localStorage.setItem('authToken', token)
          localStorage.setItem('userRole', role)
          localStorage.setItem('id', id)
          this.errorMessage = ''

          if (role === 'admin') {
            this.$router.push('/admin')
          } else if (role === 'user') {
            this.$router.push({ name: 'home', params: { userId: id } })
          } else {
            this.$router.push('/login')
          }
        }
      } catch (error) {
        if (error.response && (error.response.status === 401 || error.response.status === 404)) {
          this.errorMessage = 'Email ou mot de passe incorrect'
          setTimeout(() => {
            this.errorMessage = ''
          }, 3000)
        } else {
          console.error(error)
        }
      }
    }
  }
}
</script>

<template>
  <div class="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-sm">
      <img class="mx-auto h-12 w-auto" src="../assets/logo.svg" alt="Your Company" />
      <h2 class="mt-6 text-center text-3xl font-extrabold leading-9 tracking-tight text-gray-900">
        Connexion
      </h2>
    </div>

    <div class="mt-6 sm:mx-auto sm:w-full sm:max-w-sm">
      <div v-if="errorMessage" class="text-sm text-center text-red-600 mb-3">
        {{ errorMessage }}
      </div>
      <form
        @submit.prevent="submitForm"
        class="space-y-8 bg-white p-8 rounded-lg shadow-lg"
        action="#"
        method="POST"
      >
        <div>
          <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
          <div class="mt-2">
            <input
              id="email"
              v-model="formData.email"
              name="email"
              type="email"
              autocomplete="email"
              required
              class="block w-full rounded-lg border-gray-300 bg-gray-100 p-3 text-gray-900 shadow-sm placeholder:text-gray-500 focus:ring-2 focus:ring-indigo-500 sm:text-sm"
            />
          </div>
        </div>

        <div>
          <label for="password" class="block text-sm font-medium text-gray-700">Mot de passe</label>
          <div class="mt-2">
            <input
              id="password"
              v-model="formData.password"
              name="password"
              type="password"
              autocomplete="current-password"
              required
              class="block w-full rounded-lg border-gray-300 bg-gray-100 p-3 text-gray-900 shadow-sm placeholder:text-gray-500 focus:ring-2 focus:ring-indigo-500 sm:text-sm"
            />
          </div>
        </div>

        <div>
          <button
            type="submit"
            class="flex w-full justify-center rounded-lg bg-indigo-600 px-4 py-3 text-sm font-semibold leading-6 text-white shadow-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            Se Connecter
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
