<template>
  <div>
    <HeaderNavbar/>
    <div class="container px-7 py-4 mx-auto">
      <FeedNewsFeed v-if="!news.loading && news.articles[0]" :news="news"/>
      <div v-if="news.loading">Carregando</div>
      <div class="text-red-500 px-8 text-lg" v-if="!news.articles[0]">
        Talvez eu esteja tendo um problema com o google news
      </div>
    </div>
    <FooterNavbar/>
  </div>
</template>
<script setup lang="js">
useSeoMeta({
  title: 'Brightside',
  ogTitle: 'Brightside',
  description: 'Um portal destinado a divulgar notícias que farão seu dia melhor.',
  ogDescription: 'Um portal destinado a divulgar notícias que farão seu dia melhor.',
  ogImage: 'https://example.com/image.png',
  twitterCard: 'summary_large_image',
})

const news = useNews().value

</script>
<style>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@100..900&family=Playwrite+AU+VIC:wght@100..400&display=swap');

/* font-family: "Playwrite AU VIC", cursive;*/

html {
  background: #81D4FA;
  font-family: "Inter", sans-serif;
  font-optical-sizing: auto;
  font-weight: 400;
  font-style: normal;
  transition: all 0.3s;
}
.nuxt-icon svg {
  margin-bottom: 0;
}

.curtain {
  width: 100px;
  height: 150px;
  position: relative;
  overflow: hidden;
}

svg {
  width: 100%;
  height: 100%;
  fill: #555;
  transition: transform 0.5s;
}

.curtain:hover svg {
  transform: translateY(-50%);
}

</style>
