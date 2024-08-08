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
          const { token } = response.data
          localStorage.setItem('authToken', token)
          this.errorMessage = ''
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
      <img
        class="mx-auto h-10 w-auto"
        src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
        alt="Your Company"
      />
      <h2 class="mt-5 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
        Connexion
      </h2>
    </div>

    <div class="mt-5 sm:mx-auto sm:w-full sm:max-w-sm">
      <div v-if="errorMessage" class="text-sm text-center text-red-600">
        {{ errorMessage }}
      </div>
      <form @submit.prevent="submitForm" class="space-y-6" action="#" method="POST">
        <div>
          <label for="email" class="block text-sm font-medium leading-6 text-gray-900">Email</label>
          <div class="mt-2">
            <input
              id="email"
              v-model="formData.email"
              name="email"
              type="email"
              autocomplete="email"
              required="true"
              class="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:outline-none sm:text-sm sm:leading-6"
            />
          </div>
        </div>

        <div>
          <div class="flex items-center justify-between">
            <label for="password" class="block text-sm font-medium leading-6 text-gray-900"
              >Mot de passe</label
            >
          </div>
          <div class="mt-2">
            <input
              id="password"
              v-model="formData.password"
              name="password"
              type="password"
              autocomplete="current-password"
              required="true"
              class="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:outline-none sm:text-sm sm:leading-6"
            />
          </div>
        </div>

        <div>
          <button
            type="submit"
            class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus:outline-none"
          >
            Se Connecter
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
