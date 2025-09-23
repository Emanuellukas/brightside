<template>
  <li :class="'p-6 rounded-3xl bg-yellowSoft dark:bg-secondary-light border-[#FFF176] mb-0 h-full relative'">
    <span class="text-sm font-semibold mb-3 px-2 py-1 bg-slate-600 text-white rounded-full inline-block mr-2">
      {{ state.currentCategory }}
    </span>
    <span class="text-sm font-semibold mb-3 px-2 py-1 bg-black dark:bg-primary-light text-white rounded-full inline-block">
      {{formatedDate(pubDate)}}
    </span>
    <div class="rounded-md py-3 flex justify-between mb-3">
      <div class="flex gap-4">
        <div class="inline-block h-8 w-8 rounded-full ring-4 ring-white">
          <img v-if="!source.image?.url" src="../../assets/images/flower-icon-2048x2048-gydxzqnj.png" alt="">
          <img v-else :src="source.image?.url" alt="" class="min-w-full">
        </div>
        <div class="flex flex-col">
          <span class="text-[.6rem] text-gray-700">
            Fonte
          </span>
          <span class="font-bold text-[.8rem] truncate w-5/6">
            {{ source?.title.slice(0, 20) }}
          </span>
        </div>
      </div>
      <a :href="link" target="_blank"
        class="rounded-full flex font-bold text-white bg-slate-900 dark:bg-primary-light border-2 border-slate-900 dark:border-primary-light px-3 py-1 hover:bg-slate-600 hover:text-slate-300">
        Ler →
      </a>
    </div>
    <h2 @click="handleClickCard" class="conteudo text-grayDark dark:text-sky-900 md:text-clip hover:text-clip font-semibold mb-2">
      {{ title }}
    </h2>
    <p @click="handleClickCard" class="text-grayDark dark:text-sky-800 description" v-html="shortDescription(description)" />
    <div class="absolute bottom-5 right-5 flex mt-auto gap-3 justify-end">
      <button class="text-slate-800 py-1 px-2 rounded-full hover:bg-slate-800 hover:text-white">
        <Icon name="icon-park-outline:thumbs-up"/>
      </button>
      <button class="text-slate-800 py-1 px-2 rounded-full hover:bg-slate-800 hover:text-white">
        <Icon name="icon-park-outline:share-one"/>
      </button>
    </div>
    <slot/>
  </li>
</template>
<script setup lang="js">
const props = defineProps({
  content: Object,
  source: Object
})

const { link, title, pubDate, description } = props.content
const { shortDescription, state } = useNews()

const handleClickCard = () => {
  window.open(link, '_blank')
}

</script>
<style scoped>
.description img {
  border-radius: .75rem;
}
</style>
