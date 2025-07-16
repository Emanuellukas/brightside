<template>
  <div class="flex mt-6 justify-center items-center overflow-hidden feed">
    <ul id="list-track" class="h-[70vh]">
      <AnimatePresence>
        <MotionFeedNewsCard
          :key="index"
          v-for="(article, index) in articles"
          class="relative"
          :content="article"
          :source="source"
          :initial="{ scale: 0, x: 0, y: 0, rotate: 0 }"
          :animate="{ scale: 1, transition: { duration: .5 } }"
          :drag="true"
          :dragConstraints="{top: 0, bottom: 0, left: 0, right: 0 }"
          :whileDrag="{ scale: 1.05, opacity: .9 }"
          :onDragEnd="(_, info) => handleDragEnd(info, index)"
          :exit="{ opacity: 0, transition: { duration: .6 } }"
        />
      </AnimatePresence>
    </ul>
  </div>
</template>

<script setup lang="js">
import { AnimatePresence, motion, time } from "motion-v"
import FeedNewsCard from "../feed/NewsCard"
const MotionFeedNewsCard = motion.create(FeedNewsCard)

const props = defineProps({
  news: Object
})

const { removeArticle } = useNews()	

const source = props.news?.source
const articles = ref(props.news?.articles)
const offsetX = ref(0)

async function handleDragEnd(event, index) {
  offsetX.value = event.offset.x
  if (Math.abs(offsetX.value) > 100) {
    console.log('remove article', event, offsetX.value)
    await removeArticle(index)
  }
}
</script>

<style lang="scss" scoped>
.feed {
  z-index: 1;
}

html:has(.like){
  background: green;
}

#list-track {
  position: relative;
  width: 100%;
}

#list-track li {
  position: absolute;
  top: 0;
  left: 0;
}
</style>
