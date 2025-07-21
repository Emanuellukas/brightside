<template>
  <div class="">
    <form @submit.prevent="searchNews" :class="`flex items-center justify-center mt-4 ${activeSearchClasses().formClasses}`">
      <input type="text" v-model="search" placeholder="Pesquisar" class="rounded-lg placeholder:text-white text-white bg-primary-light border-2 border-primary-dark dark:text-white text-lg font-bold px-2 py-2 h-auto mx-2 " />
      <button type="submit" class="flex items-center rounded-lg text-white dark:text-primary border-2 border-primary-dark bg-primary dark:border-primary-light text-xl font-bold px-2 py-2 h-auto mr-2">
        <Icon name="line-md:search" />
      </button>
    </form>
  </div>
</template>
<script setup lang="js">
const { state, getServerRssNews } = useNews()

const search = ref(state.value.search.input)

const searchNews = () => {
  getServerRssNews('gnews', 20, search.value)
}

const activeSearchClasses = () => {
  const searching = search.value.length
  const formClasses = searching ? 'text-slate-900 border-slate-900' : ''

  return {
    formClasses
  }
}
</script>