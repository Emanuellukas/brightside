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
    <nav class="flex lg:block gap-4 text-white px-2 overflow-x-auto overflow-y-hidden">
      <button :class="`leading-none mb-4 rounded-lg dark:text-primary text-lg font-bold px-2 py-1 h-auto mx-2 ${activeCategory(cat.slug)}`" :key="index" v-for="(cat, index) in categorias" @click="setCategory(cat.slug)">
        {{ cat.name }}
      </button>
    </nav>
    <form v-if="state.currentCategory === 'gnews'" @submit.prevent="searchNews" class="flex items-center justify-center mt-4">
      <input type="text" v-model="search" placeholder="Pesquisar" class="rounded-lg dark:text-primary text-lg font-bold px-2 py-2 h-auto mx-2 w-full" />
      <button type="submit" class="flex items-center rounded-lg dark:text-primary border-2 border-primary-dark dark:border-primary-light text-xl font-bold px-2 py-2 h-auto mr-2">
        <Icon name="line-md:search-twotone" />
      </button>
    </form>
  </div>
</template>
<script setup lang="js">
const { state, getServerRssNews, selectCategory } = useNews()
const search = ref('')

const categorias = [
  {name: 'Boas Notícias', slug: 'sonoticiaboa'},
  {name: 'Mundo', slug: 'world'},
  {name: 'Tecnologia', slug: 'technology'},
  {name: 'Games', slug: 'games'},
  {name: 'Ciência', slug: 'science'},
  {name: 'Linux', slug: 'linux'},
  {name: 'Google News', slug: 'gnews'},
]

const activeCategory = (slug) => {
  return state.value.currentCategory === slug ? 'animate-pulse' : ''
}

const setCategory = (slug) => {
  selectCategory(slug)

  if(slug !== 'gnews')
    return getServerRssNews(slug)
}

const searchNews = () => {
  getServerRssNews('gnews', 20, search.value)
}

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