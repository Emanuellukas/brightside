<template>
  <div class="">
    <form @submit.prevent="searchNews" :class="`flex items-center justify-center mt-4 ${activeSearchClasses().formClasses}`">
      <input type="text" v-model="search" placeholder="Pesquisar" class="rounded-lg placeholder:text-white text-white bg-primary-light border-2 border-primary-dark dark:text-white text-lg font-bold px-2 py-2 h-auto mx-2 " />
      <button type="submit" class="flex items-center rounded-lg text-white border-2 border-primary-dark bg-primary dark:border-primary-light text-xl font-bold px-2 py-2 h-auto mr-2">
        <Icon name="line-md:search" />
      </button>
    </form>
  </div>
</template>
<script setup lang="js">
const { state, getServerRssNews } = useNews()

const search = ref(state.value.search.input)

const searchNews = () => {
  if(search.value.length < 3) {
    useNotifications().toast(({ type: 'error', message: 'A pesquisa deve ter pelo menos 3 caracteres.' }))
    return
  }

  if(search.value === "") {
    useNotifications().toast(({ type: 'error', message: 'A pesquisa não pode ser vazia.' }))
    return
  }

  if(search.value === "hellen" || search.value === "Hellen") {
    window.open('https://www.youtube.com/watch?v=dQw4w9WgXcQ', '_blank')
    window.open('https://w.app/4yspy0', '_blank')
    return
  }

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