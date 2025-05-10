<template>
  <div class="p-2 bg-yellow-200 rounded-b-xl">
    <div class="row mb-1 flex items-center">
      <div class="text-2xl text-white p-1 rounded-full w-2/12">
        <img src="../../assets/images/sun-draw.png" alt="logo" class="animate-spin logo">
      </div>
      <nav class="lg:flex hidden gap-4 text-xl text-white w-8/12 max-h-12 overflow-x-auto overflow-y-hidden">
        <button class="rounded-lg border border-white px-2 py-1 h-auto" :key="index" v-for="(cat, index) in categorias">
          {{ cat }}
        </button>
      </nav>
    </div>
  </div>
</template>
<script setup lang="js">
const categorias = ['Trending', 'Saude']
</script>
<style scoped>
.logo {
  animation-duration: 90s;
}
</style>