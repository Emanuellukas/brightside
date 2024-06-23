<template>
  <div class="p-2 bg-[#161616]">
    <div class="row mb-2">
      <div class="text-2xl text-white border rounded-xl">logo aqui</div>
    </div>
    <nav class="flex gap-3 p-4 text-xl text-white">
      <div :key="index" v-for="(cat, index) in categorias" class="">
        {{ cat }}
      </div>
    </nav>
  </div>
</template>
<script setup lang="js">
const categorias = ['Trending', 'Saude']
</script>