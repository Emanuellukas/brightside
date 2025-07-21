<template>
  <div>
    <div class="p-2 bg-primary-dark dark:bg-sky-900 rounded-b-xl header mb-3 md:mb-0 flex items-center justify-between">
      <div class="text-2xl text-white p-1 rounded-full w-3/12 md:w-1/12">
        <img src="../../assets/images/logo.png" alt="logo" class="logo">
      </div>
      <div class="flex items-center text-white w-4/12 text-md">
        <Icon name="mdi-light:clock" class="ml-auto mr-2"/>
        <p class="mb-0 mr-2 text-lg">
          {{ `${clock.hour}:${clock.minutes}` }}
        </p>
        <!-- <button class="rounded-lg text-3xl text-primary-light dark:text-primary-dark">
          <Icon name="line-md:menu" />
        </button> -->
      </div>
    </div>
    <nav class="flex lg:block gap-4 text-white px-2 overflow-x-auto overflow-y-hidden">
      <button :class="`leading-none mb-2 rounded-lg dark:text-primary text-md px-2 py-1 h-auto mx-2 ${activeCategory(cat.slug)}`" :key="index" v-for="(cat, index) in categorias" @click="setCategory(cat.slug)">
        {{ cat.name }}
      </button>
    </nav>
    <HeaderSearchBar v-if="state.currentCategory === 'gnews'"/>
  </div>
</template>
<script setup lang="js">
const { state, getServerRssNews, selectCategory } = useNews()

const date = new Date()
const pad2 = (n) => n.toString().padStart(2, '0')
const clock = ref({ hour: pad2(date.getHours()), minutes: pad2(date.getMinutes()) })

const categorias = [
  {name: 'Boas Notícias', slug: 'sonoticiaboa'},
  {name: 'Mundo', slug: 'world'},
  {name: 'Tecnologia', slug: 'technology'},
  {name: 'Games', slug: 'games'},
  {name: 'Ciência', slug: 'science'},
  {name: 'Google News', slug: 'gnews'},
]

const activeCategory = (slug) => {
  return state.value.currentCategory === slug ? 'animate-pulse bg-primary dark:bg-slate-900 font-bold' : 'border-2 border-primary'
}

const setCategory = (slug) => {
  selectCategory(slug)

  if(slug !== 'gnews')
    return getServerRssNews(slug)
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