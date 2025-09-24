<template>
  <li :class="'p-6 rounded-3xl bg-yellowSoft dark:bg-secondary-light border-2 border-yellow-600 dark:border-secondary-dark mb-0 h-[95%] w-[95%] relative'">
    <div class="px-2 py-0 text-white text-lg font-bold rounded-full inline-block mr-2" :style="{ backgroundColor: state.currentCategory.color }">
      <Icon :name="state.currentCategory.icon" class="-mb-1"/>
    </div>
    <span class="text-sm font-semibold mb-3 px-2 py-1 bg-secondary dark:bg-primary-light text-white rounded-full inline-block">
      {{ formatedDate(pubDate) }}
    </span>
    <div class="rounded-md py-3 flex justify-between mb-3">
      <div class="flex gap-4">
        <div class="inline-flex h-8 w-8 rounded-full ring-4 ring-white">
          <img v-if="!source.image?.url" src="../../assets/images/flower-icon-2048x2048-gydxzqnj.png" alt="Fonte padrão">
          <img v-else :src="source.image?.url" :alt="`Logo de ${source?.title ?? 'fonte'}`" class="min-w-full">
        </div>
        <div class="flex flex-col">
          <span class="text-[.6rem] text-gray-700">
            Fonte
          </span>
          <span class="font-bold text-[.8rem] truncate w-5/6">
            {{ truncatedSourceTitle }}
          </span>
        </div>
      </div>
      <a :href="link" target="_blank"
        class="rounded-full flex font-bold text-white bg-secondary dark:bg-primary-light border-2 border-slate-900 dark:border-primary-light px-3 py-1 hover:bg-slate-600 hover:text-slate-300">
        Ler →
      </a>
    </div>
    <h2 @click="openArticle" class="conteudo text-grayDark dark:text-sky-900 md:text-clip hover:text-clip font-semibold mb-2">
      {{ title }}
    </h2>
    <p @click="openArticle" class="text-grayDark dark:text-sky-800 description" v-html="shortDescription(description)" />
    <slot/>
  </li>
</template>
<script setup lang="js">
const props = defineProps({
  content: Object,
  source: Object
})

const { link, title, pubDate, description } = props.content
const { shortDescription, state, formatedDate } = useNews()

const SOURCE_TITLE_MAX_LENGTH = 20

const truncatedSourceTitle = computed(() => {
  const text = props.source?.title ?? ''
  return text.length > SOURCE_TITLE_MAX_LENGTH
    ? text.slice(0, SOURCE_TITLE_MAX_LENGTH)
    : text
})

const openArticle = () => {
  window.open(link, '_blank')
}

</script>
<style scoped>
.description img {
  border-radius: .75rem;
}
</style>
