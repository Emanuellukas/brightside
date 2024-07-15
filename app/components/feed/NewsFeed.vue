<template>
  <div class="flex mt-14 justify-center items-center overflow-hidden">
    <ul id="list-stack" class=" *:h-3/5 *:rounded-xl *:overflow-hidden *:shadow-2xl *:absolute">
      <FeedNewsCard :key="index" v-for="(article, index) in articles" class="relative card-aspect" :content="article" />
    </ul>
  </div>
</template>

<script setup lang="js">
import { onMounted, ref } from 'vue'

const props = defineProps({
  news: Object
})

const articles = props.news?.articles

const list = ref(null)
const threshold = 400

// Card constructor
let count = 4
function createAndAppendCard() {
  // Create the 'li' element
  const listItem = document.createElement("li")
  listItem.className = "card-aspect"

  // Create the inner 'div' element
  const div = document.createElement("div")
  div.className = "aspect-square w-full p-4 overflow-hidden"

  // Create the 'h1' element
  const h1 = document.createElement("h1")
  h1.textContent = `Item ${count}`

  // Append the 'div' and 'h1' to the 'li'
  listItem.appendChild(div)
  listItem.appendChild(h1)

  // Find the 'ul' element and append the 'li' to it
  list.value.appendChild(listItem)
  startDrag(listItem)
  count++
}

// Adjust element style based on drag
function handleMove(element, startX, currentX) {
  const shiftX = currentX - startX
  const rotation = shiftX / 10 // Rotation based on drag distance

  // Apply transformation
  element.style.transform = `translateX(calc(-50% + ${shiftX}px)) rotate(${rotation}deg)`

  // Change background color based on drag distance
  // if (shiftX < -150) {
  //   root.style.backgroundColor = "var(--dislike)"
  //   svgs[0].style.transform = "translateX(-50%) scale(2)"
  // } else if (shiftX > 150) {
  //   root.style.backgroundColor = "var(--like)"
  //   svgs[1].style.transform = "translateX(-50%) scale(2)"
  // } else {
  //   root.style.backgroundColor = "var(--bg)"
  //   svgs[0].style.transform = "translateX(-50%) scale(1)"
  //   svgs[1].style.transform = "translateX(-50%) scale(1)"
  // }

  // Check if the element should be removed based on drag distance
  if (Math.abs(shiftX) > threshold && !element.flaggedForRemoval) {
    element.style.transition =
      "transform var(--easing-time) cubic-bezier(0.175, 0.885, 0.32, 1.275)" // Only apply transition when removing
    element.flaggedForRemoval = true

    element.remove() // Remove the element from DOM
    // createAndAppendCard()
  }
}

// Handle the start of a drag
function startDrag(element) {
  let startX

  const onMouseMove = (e) => handleMove(element, startX, e.pageX)

  const onMouseUp = () => {
    document.removeEventListener("mousemove", onMouseMove)
    document.removeEventListener("mouseup", onMouseUp)
    // Reset transition and transform if not removed
    if (!element.flaggedForRemoval) {
      element.style.transition =
        "transform var(--easing-time) cubic-bezier(0.175, 0.885, 0.32, 1.275)"
      element.style.transform = ""
    }
  }

  const onMouseDown = (e) => {
    startX = e.pageX
    element.style.transition = "none" // No transition during drag
    element.flaggedForRemoval = false // Reset removal flag
    document.addEventListener("mousemove", onMouseMove)
    document.addEventListener("mouseup", onMouseUp)
  }

  element.addEventListener("mousedown", onMouseDown)
}

// Add draggable functionality to all list elements
onMounted(() => {
  const elements = document.querySelectorAll('.card-aspect');
  elements.forEach((element) => startDrag(element))
})
</script>

<style scoped>
:root {
  --bg: #131313;
  --dislike: #f43f5e;
  --like: #22d3ee;
  --easing-time: 250ms;
}

svg{transition: transform 150ms cubic-bezier(0.175, 0.885, 0.32, 1.275); }

html:has(.like){
  background: green;
}
.card-aspect {
  aspect-ratio:9/15;
}
#list-stack {
  transition: transform 300ms ease-in-out;
}
#list-stack img {
  user-select: none;
}
#list-stack li {
  z-index: -10;
  cursor: pointer;
  user-select: none;
  display: none;
  flex-direction: column;
  transform: translateX(-50%);
  transition: transform 250ms cubic-bezier(0.175, 0.885, 0.32, 1.275);
}
#list-stack li:nth-child(1) {
  display: flex;
  transform: translateX(-50%) scale(1);
  z-index: 0;
}
#list-stack li:nth-child(2) {
  display: flex;
  z-index: -2;
  transform: perspective(1200px) translateX(-50%) translateZ(10em) rotateX(5deg)
    rotateZ(-10deg) scale(0.9);
  filter: brightness(90%);
}
#list-stack li:nth-child(3) {
  display: flex;
  z-index: -4;
  transform: perspective(1200px) translateX(calc(-50% - 1em)) translateZ(5em)
    rotateZ(-20deg) rotateX(5deg) scale(0.9);
  filter: brightness(80%);
}


.card {
  position: fixed;
  top: 10rem;
  animation: card-entry 0.5s ease-in-out;
  height: calc(60vh - 20px); /* 60% of viewport height minus 20px */
}

@keyframes card-entry {
  0% {
    opacity: 0;
    transform: translateY(100%);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
