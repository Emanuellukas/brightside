<template>
  <div class="p-5 rounded-3xl bg-yellow-100">
    <p class="text-sm mb-3">
      {{publishedAt}}
    </p>
    <div class="rounded-md py-3 flex justify-between">
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
      <a :href="url" target="_blank" class="rounded-full text-white bg-slate-900 px-3 py-1">
        Conferir
      </a>
    </div>
    <p class="conteudo font-semibold truncate md:text-clip hover:text-clip">
      {{ title }}
    </p>
    <div class="flex gap-3 justify-end mt-5">
      <button>like</button>
      <button>save</button>
      <button>share</button>
    </div>
    <slot/>
  </div>
</template>
<script setup lang="js">
const props = defineProps({
  content: Object
})

const { author, url, title, publishedAt } = props.content

const published = new Date(publishedAt)
</script>