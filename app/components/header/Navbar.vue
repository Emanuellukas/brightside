<template>
  <div>
    <div class="p-2 bg-primary-dark dark:bg-sky-900 rounded-b-xl header mb-3 md:mb-0">
      <div class="row mb-1 flex items-center justify-between">
        <div class="text-2xl text-white p-1 rounded-full w-3/12 md:w-1/12">
          <img src="../../assets/images/logo.png" alt="logo" class="logo">
        </div>
        <button class="w-2/12 rounded-lg text-primary-light dark:text-primary-dark text-3xl">
          <Icon name="line-md:menu" />
        </button>
      </div>
    </div>
    <nav class="lg:flex gap-4  text-white px-2 max-h-12 overflow-x-auto overflow-y-hidden">
      <button class="rounded-lg dark:text-primary-dark text-2xl font-bold px-2 py-1 h-auto mx-2 animate-pulse" >
        Trending
      </button>
      <button class="rounded-lg dark:text-primary text-xl font-bold px-2 py-1 h-auto mx-2" :key="index" v-for="(cat, index) in categorias">
        {{ cat }}
      </button>
    </nav>
  </div>
</template>
<script setup lang="js">
const categorias = ['Saude']
//todo: ajustar categorias de acordo com o estado da aplicação
</script>
<style scoped>
.logo {
  animation-duration: 90s;
}

.header {
  backdrop-filter: blur(1rem);
}
</style>