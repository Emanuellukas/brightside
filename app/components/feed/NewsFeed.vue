<template>
  <div class="container mx-auto">
    <FeedNewsCard :key="index" v-for="(article, index) in articles" class="max-h-[72vh] relative" :content="article" />
  </div>
</template>
<script setup lang="js">
const props = defineProps({
  news: Object
})

const articles = props.news.articles
console.log('da uma olhada', articles)
</script>