<template>
  <div class="p-2 bg-orange-300 rounded-b-xl">
    <div class="row mb-1 flex items-center">
      <div class="text-2xl text-white -mt-6 p-3 rounded-full w-4/12">
        <img src="../../assets/images/logo.png" alt="logo" class="">
      </div>
      <nav class="flex gap-4 text-xl text-white w-8/12 max-h-12 overflow-x-auto overflow-y-hidden">
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