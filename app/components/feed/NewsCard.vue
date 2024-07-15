<template>
  <li class="p-7 rounded-3xl bg-yellow-100 shadow-xl border-[#FFF176] mb-4">
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
      <a :href="url" target="_blank" class="rounded-full text-white bg-slate-900 px-3 py-1">
        Conferir
      </a>
    </div>
    <h2 class="conteudo md:text-clip hover:text-clip">
      {{ title }}
    </h2>
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

const { author, url, title, publishedAt } = props.content

const published = new Date(publishedAt)
</script>