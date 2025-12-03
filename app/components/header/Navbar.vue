<template>
  <div>
    <div class="p-2 bg-primary-dark dark:bg-sky-900 rounded-b-xl header mb-3 flex items-center justify-between">
      <div class="text-2xl text-white p-1 rounded-full w-3/12 md:w-1/12">
        <img src="../../assets/images/logo.png" alt="logo" class="logo">
      </div>
      <div class="flex items-center text-white w-4/12 lg:w-1/12 text-md">
        <Icon name="line-md:rotate-270" class="ml-auto mr-2 font-bold text-2xl border border-white cursor-pointer" @click="clearLocalStorage()"/>
        <Icon name="mdi-light:clock" class="ml-auto mr-2"/>
        <p class="mb-0 mr-2 text-lg" v-if="clock">
          {{ `${clock.hour}:${clock.minutes}` }}
        </p>
        <!-- <button class="rounded-lg text-3xl text-primary-light dark:text-primary-dark">
          <Icon name="line-md:menu" />
        </button> -->
      </div>
    </div>
    <nav class="flex gap-4 text-white px-2 overflow-x-auto overflow-y-hidden md:justify-center">
      <a :href="`#${cat.slug}`"
        :id="cat.slug" 
        :class="`leading-none mb-2 rounded-lg text-md px-2 py-1 lg:px-4 lg:py-3 h-auto mx-2 flex items-center gap-2 ${activeCategoryClasses(cat.slug)}`" 
        :key="index" 
        v-for="(cat, index) in activeCategories" 
        @click="setCategory(cat.slug)"
        :style="activeCategoryStyle(cat.slug)"
      >
        <Icon :name="cat.icon" class="w-4 h-4" :style="{color: cat.color}" />
        {{ cat.name }}
      </a>
    </nav>
    <HeaderSearchBar v-if="state.currentCategory.slug === 'gnews'"/>
  </div>
</template>
<script setup lang="js">
const { FEED_CATEGORIES, getActiveCategories } = useCategories()
const { state, getServerRssNews, selectCategory, clearLocalStorage } = useNews()

const date = new Date()
const pad2 = (n) => n.toString().padStart(2, '0')
const clock = ref({ hour: pad2(date.getHours()), minutes: pad2(date.getMinutes()) })

const activeCategories = Object.keys(getActiveCategories()).map(key => ({
  name: FEED_CATEGORIES[key].name,
  slug: key,
  color: FEED_CATEGORIES[key].color,
  icon: FEED_CATEGORIES[key].icon
}))

const activeCategoryStyle = (slug) => {
  const { color } = FEED_CATEGORIES[slug]

  if(slug === state.value.currentCategory.slug) {
    return {
      borderColor: 'inherit',
      color
    }
  }

  return {
    borderColor: color,
    color,
  }
}

const activeCategoryClasses = (slug) => {
  return state.value.currentCategory.slug === slug ? 'animate-pulse bg-primary dark:bg-slate-900 font-bold' : 'border-2 bg-inherit dark:bg-slate-700'
}

const setCategory = (slug) => {
  selectCategory(slug)

  if(slug !== 'gnews')
    return getServerRssNews({ category: slug })
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