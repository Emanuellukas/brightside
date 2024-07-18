<template>
  <li :class="'p-6 rounded-3xl bg-yellow-100 shadow-xl border-[#FFF176] mb-4 h-[58vh]'">
    <p class="text-sm font-semibold mb-3">
      {{new Date(publishedAt).toLocaleDateString('pt-BR')}}
    </p>
    <div class="rounded-md py-3 flex justify-between mb-3">
      <div class="flex gap-4">
        <div class="inline-block h-8 w-8 rounded-full ring-4 ring-white">
          <img src="../../assets/images/flower-icon-2048x2048-gydxzqnj.png" alt="">
        </div>
        <div class="flex flex-col">
          <span class="text-[.6rem] text-gray-300">
            Publicado por
          </span>
          <span class="font-bold text-[.8rem] truncate">
            {{ author }}
          </span>
        </div>
      </div>
      <a :href="url" target="_blank" class="rounded-full font-bold text-slate-900 border-2 border-slate-900 px-3 py-1 hover:bg-orange-400 hover:text-white">
        Conferir
      </a>
    </div>
    <img v-if="urlToImage" :src="urlToImage" class="rounded-lg mx-auto w-9/12 mb-3">
    <img v-else src="../../assets/images/logo.png" class="rounded-lg mx-auto w-9/12 mb-3">
    <h2 class="conteudo text-grayDark md:text-clip hover:text-clip font-semibold mb-2">
      {{ title }}
    </h2>
    <p class="text-grayDark truncate">
      {{ description }}
    </p>
    <div class="flex mt-auto gap-3 justify-end">
      <button>like</button>
      <button>save</button>
      <button>share</button>
    </div>
    <slot/>
  </li>
</template>
<script setup lang="js">
const props = defineProps({
  content: Object
})

const { author, url, title, publishedAt, urlToImage, description } = props.content
</script>