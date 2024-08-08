<template>
  <div
    class="relative min-h-screen bg-cover bg-center"
    style="background-image: url('/src/assets/images/landing-page-image.jpg')"
  >
    <div class="absolute inset-0 bg-black opacity-50"></div>
    <div
      class="relative z-10 flex flex-col justify-center items-center min-h-screen text-center text-white"
    >
      <img class="mb-10 h-32 w-auto" src="../assets/logo.svg" alt="Our Projects Logo" />
      <h1 class="text-4xl md:text-6xl font-extrabold mb-4">Bienvenue sur "e-Project"</h1>
      <p class="text-lg md:text-2xl mb-8">Gérez et suivez vos projets en toute simplicité.</p>
      <div class="flex gap-4">
        <router-link to="/login">
          <button
            class="px-6 py-3 text-base font-medium text-white bg-indigo-600 rounded-md shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            Se connecter
          </button>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup></script>

<style scoped>
body {
  margin: 0;
  font-family: 'Inter', sans-serif;
}
</style>
