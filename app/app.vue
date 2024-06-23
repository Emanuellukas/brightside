<template>
  <div class="bg-[#131313]">
    <HeaderNavbar/>
    <div class="container px-7 py-4 mx-auto">
      <FeedNewsFeed :news="news"/>
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

let loading = false;
let news = {}

const init = async () => {
  loading = true
  news = await $fetch('/home')
  loading = false
}

init()
</script>
<style>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@100..900&family=Playwrite+AU+VIC:wght@100..400&display=swap');

/* font-family: "Playwrite AU VIC", cursive;*/

html {
  background: #111111;
  font-family: "Inter", sans-serif;
  font-optical-sizing: auto;
  font-weight: 400;
  font-style: normal;
}
.nuxt-icon svg {
  margin-bottom: 0;
}
</style>
