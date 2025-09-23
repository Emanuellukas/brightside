<template>
  <div class="flex mt-6 justify-center items-center overflow-hidden feed w-full md:w-1/4 mx-auto">
    <ul id="list-track" :class="`${state.currentCategory === 'gnews' ? 'h-[63vh]' : 'h-[70vh]'}`">
      <AnimatePresence>
        <MotionFeedNewsCard
          :key="article.guid || article.link || article.title || index"
          v-for="(article, index) in articles"
          class="relative"
          :content="article"
          :source="source"
          :initial="getInitial(index)"
          :animate="getAnimate(index)"
          :drag="'x'"
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

const { state } = useNews()

const props = defineProps({
  news: Object
})

const { removeArticle } = useNews()

const source = props.news?.source
const articles = ref(props.news?.articles)
const lastDragOffsetX = ref(0)

// Constants to avoid magic numbers
const DRAG_DISMISS_THRESHOLD = 100
const ANIMATION_DURATION_SECONDS = .5
const STACK_MAX_ROTATE_DEGREES = 8
const STACK_BASE_ROTATE_DEGREES = 2
const STACK_STEP_X_PIXELS = 8
const STACK_MAX_X_PIXELS = 48
const STACK_STEP_Y_PIXELS = 10
const STACK_MAX_Y_PIXELS = 80
const DRAG_VELOCITY_THRESHOLD = 800 // px/s aproximado

function computeStackOffsets(index) {
  if (index === 0) {
    return { x: 0, y: 0, rotate: 0 }
  }
  const rotate = Math.min(STACK_MAX_ROTATE_DEGREES, STACK_BASE_ROTATE_DEGREES + index)
  const x = Math.min(STACK_MAX_X_PIXELS, index * STACK_STEP_X_PIXELS)
  const y = Math.min(STACK_MAX_Y_PIXELS, index * STACK_STEP_Y_PIXELS)
  return { x, y, rotate }
}

function getInitial(index) {
  const { x, y, rotate } = computeStackOffsets(index)
  return { scale: 0, x, y, rotate, opacity: 1 }
}

function getAnimate(index) {
  const { x, y, rotate } = computeStackOffsets(index)
  return { scale: 1, x, y, rotate, opacity: 1, transition: { duration: ANIMATION_DURATION_SECONDS } }
}

async function handleDragEnd(info, index) {
  const offsetX = info?.offset?.x ?? 0
  const velocityX = info?.velocity?.x ?? 0
  lastDragOffsetX.value = offsetX
  const reachedDistance = Math.abs(offsetX) > DRAG_DISMISS_THRESHOLD
  const reachedVelocity = Math.abs(velocityX) > DRAG_VELOCITY_THRESHOLD
  if (reachedDistance || reachedVelocity) {
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
