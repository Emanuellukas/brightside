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
      <button 
        :id="cat.slug" 
        :class="`leading-none mb-2 rounded-lg dark:text-primary text-md px-2 py-1 h-auto mx-2 flex items-center gap-2 ${activeCategory(cat.slug)}`" 
        :key="index" 
        v-for="(cat, index) in categorias" 
        @click="setCategory(cat.slug)"
        :style="{borderColor: cat.color}"
      >
        <Icon :name="cat.icon" class="w-4 h-4" :style="{color: cat.color}" />
        {{ cat.name }}
      </button>
    </nav>
    <HeaderSearchBar v-if="state.currentCategory === 'gnews'"/>
  </div>
</template>
<script setup lang="js">
const { FEED_CATEGORIES } = useConstants()
const { state, getServerRssNews, selectCategory } = useNews()

const date = new Date()
const pad2 = (n) => n.toString().padStart(2, '0')
const clock = ref({ hour: pad2(date.getHours()), minutes: pad2(date.getMinutes()) })

const categorias = Object.keys(FEED_CATEGORIES).map(key => ({
  name: FEED_CATEGORIES[key].name,
  slug: key,
  color: FEED_CATEGORIES[key].color,
  icon: FEED_CATEGORIES[key].icon
}))

const activeCategory = (slug) => {
  return state.value.currentCategory === slug ? 'animate-pulse bg-primary dark:bg-slate-900 font-bold' : 'border-2 border-primary'
}

const setCategory = (slug) => {
  selectCategory(slug)

  if(slug !== 'gnews')
    return getServerRssNews(slug)
}
</script>
<style scoped>
.logo {
  animation-duration: 90s;
}

.header {
  backdrop-filter: blur(1rem);
}
</style>