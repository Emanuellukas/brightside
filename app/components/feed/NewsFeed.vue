<template>
  <div class="flex mt-6 justify-center items-center overflow-hidden feed w-full md:w-1/3 mx-auto">
    <ul id="list-track" :class="`${state.currentCategory.slug === 'gnews' ? 'h-[63vh]' : 'h-[70vh]'} relative w-full lg:w-3/4`">
      <AnimatePresence>
        <MotionFeedNewsCard
          :key="article.guid || article.link || article.title || index"
          v-for="(article, index) in articles"
          class="relative"
          :content="article"
          :source="source"
          :initial="getInitial(index)"
          :animate="getAnimate(index)"
          drag
          :dragConstraints="{ top: -200, bottom: 200, left: -200, right: 200 }"
          :whileDrag="{ scale: 1.05, opacity: .9 }"
          :onDragEnd="(_, info) => handleDragEnd(info, index)"
          :style="{ zIndex: articles.length - index }"
        />
      </AnimatePresence>
    </ul>
  </div>
</template>

<script setup lang="js">
import { AnimatePresence, motion } from "motion-v"
import FeedNewsCard from "../feed/NewsCard"
const MotionFeedNewsCard = motion.create(FeedNewsCard)

const { state, removeArticle } = useNews()

const props = defineProps({
  news: Object
})

const source = props.news?.source
const articles = ref(props.news?.articles)
const lastDragOffsetX = ref(0)
const lastDragOffsetY = ref(0)
const removingArticles = ref(new Set())

const feedAnimationParams = {
  lastDragOffsetX, lastDragOffsetY, removingArticles
}

const { getInitial, getAnimate, DRAG_DISMISS_THRESHOLD, DRAG_VELOCITY_THRESHOLD, EXIT_ANIMATION_DURATION_SECONDS } = useFeedAnimations(feedAnimationParams)

async function handleDragEnd(info, index) {
  const offsetX = info?.offset?.x ?? 0
  const offsetY = info?.offset?.y ?? 0
  const velocityX = info?.velocity?.x ?? 0
  lastDragOffsetX.value = offsetX
  lastDragOffsetY.value = offsetY
  const reachedXDistance = Math.abs(offsetX) > DRAG_DISMISS_THRESHOLD
  const reachedYDistance = Math.abs(offsetY) > DRAG_DISMISS_THRESHOLD
  const reachedVelocity = Math.abs(velocityX) > DRAG_VELOCITY_THRESHOLD
  
  if (reachedXDistance || reachedYDistance || reachedVelocity) {
    // Marca o cartão como sendo removido para iniciar a animação
    removingArticles.value.add(index)
    // Aguarda a animação de saída terminar
    await new Promise(resolve => setTimeout(resolve, EXIT_ANIMATION_DURATION_SECONDS * 1000))
    // Remove o artigo após a animação
    await removeArticle(index)
    // Remove do Set de cartões sendo removidos
    removingArticles.value.delete(index)
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

#list-track li {
  position: absolute;
  top: 0;
  left: 0;
}
</style>
