<template>
  <FeedNewsFeed v-if="!state.loading && state.articles[0]" :news="state" />
</template>
<script setup lang="js">
import { onMounted } from 'vue'

const { state, getServerRssNews } = useNews()


onMounted(() => {
  try {
    getServerRssNews('sonoticiaboa')
  } catch(e) {
    console.error('Erro ao pegar Rss', e)
  }
});

useSeoMeta({
  title: 'Brightside',
  ogTitle: 'Brightside',
  description: 'Um portal destinado a divulgar notícias que farão seu dia melhor.',
  ogDescription: 'Um portal destinado a divulgar notícias que farão seu dia melhor.',
  ogImage: 'https://example.com/image.png',
  twitterCard: 'summary_large_image',
})

</script>
<style>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@100..900&family=Playwrite+AU+VIC:wght@100..400&display=swap');

/* font-family: "Playwrite AU VIC", cursive;*/

html {
  font-family: "Inter", sans-serif;
  font-optical-sizing: auto;
  font-weight: 400;
  font-style: normal;
  transition: all 0.3s;
  max-width: 100vw !important;
  min-height: 100vh;
  max-height: 100vh;
}


.main {
  min-height: 100vh;
  background-size: cover;
  background-position: center;
}

.nuxt-icon svg {
  margin-bottom: 0;
}

svg {
  width: 100%;
  height: 100%;
  fill: #555;
  transition: transform 0.5s;
}

</style>
