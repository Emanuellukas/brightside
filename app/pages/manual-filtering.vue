<template>
  <FeedNewsFeed v-if="!state.loading && state.articles[0]" :news="state" />
</template>

<script setup>
const { state, getServerRssNews } = useNews()

onMounted(() => {
  try {
    getServerRssNews({ category: 'world', length: 10 })
  } catch(e) {
    console.error('Erro ao pegar Rss', e)
  }
});
</script>

<style scoped>
</style>
