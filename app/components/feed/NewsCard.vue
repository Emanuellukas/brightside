<template>
  <li :class="'p-6 rounded-3xl bg-yellowSoft shadow-xl border-[#FFF176] mb-4 h-[58vh]'">
    <p class="text-sm font-semibold mb-3">
      {{formatedDate(pubDate)}}
    </p>
    <div class="rounded-md py-3 flex justify-between mb-3">
      <div class="flex gap-4">
        <div class="inline-block h-8 w-8 rounded-full ring-4 ring-white">
          <img v-if="!source.image?.url" src="../../assets/images/flower-icon-2048x2048-gydxzqnj.png" alt="">
          <img v-else :src="source.image?.url" alt="">
        </div>
        <div class="flex flex-col">
          <span class="text-[.6rem] text-gray-700">
            Publicado por
          </span>
          <span class="font-bold text-[.8rem] truncate w-5/6">
            {{ source?.title.slice(0, 20) }}
          </span>
        </div>
      </div>
      <a :href="link" target="_blank"
        class="rounded-full flex font-bold text-white bg-slate-900 border-2 border-slate-900 px-3 py-1 hover:bg-slate-600 hover:text-slate-300">
        Ler →
      </a>
    </div>
    <h2 class="conteudo text-grayDark md:text-clip hover:text-clip font-semibold mb-2">
      {{ title }}
    </h2>
    <p class="text-grayDark description" v-html="description" />
    <div class="flex mt-auto gap-3 justify-end">
      <button>👍</button>
      <button>💾</button>
      <button>🔗</button>
    </div>
    <slot/>
  </li>
</template>
<script setup lang="js">
const props = defineProps({
  content: Object,
  source: Object
})

const { link, title, pubDate, urlToImage, description } = props.content

</script>
<style scoped>
.description img {
  border-radius: .75rem;
}
</style>
