<template>
  <div class="flex mt-6 justify-center items-center overflow-hidden feed">
    <ul id="list-track" class="">
      <MotionFeedNewsCard
        :key="index"
        v-for="(article, index) in articles"
        class="relative"
        :content="article"
        :source="source"
        :initial="{ scale: 1, x: 0, y: 0, rotate: 0 }"
        :animate="{ scale: 1 }"
        :drag="true"
        :dragConstraints="{top: 0, bottom: 0, left: 0, right: 0 }"
        :whileDrag="{ scale: 1.05 }"
        :onDragEnd="(_, info) => handleDragEnd(info, index)"
      />
    </ul>
  </div>
</template>

<script setup lang="js">
import { onMounted, ref } from 'vue'
import { motion } from "motion-v"
import FeedNewsCard from "../feed/NewsCard"

const MotionFeedNewsCard = motion.create(FeedNewsCard)

const props = defineProps({
  news: Object
})

const source = props.news?.source
const articles = props.news?.articles.filter(value => {
  return value.title.length
})

function handleDragEnd(event, index) {
  console.log('event', event, index)
  // const offsetX = event.offset.x
  // console.log('teste', Math.abs(offsetX))
  // if (Math.abs(offsetX) > 40) {
  //   articles.value.splice(index, 1)
  // }
}
</script>

<style scoped>
.feed {
  z-index: 1;
}

html:has(.like){
  background: green;
}

#list-track {
  position: relative;
  width: 100%;
  height: 70vh; /* ajuste conforme seu container */
}

#list-track > * {
  position: absolute;
  top: 0;
  left: 0;
}
</style>
