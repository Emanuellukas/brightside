<template>
  <button @click="returnArticle()" class="absolute bottom-[5rem] right-10 text-3xl leading-3 px-2 py-2 font-bold bg-primary dark:bg-secondary rounded-full border-solid border-r-2 dark:border-secondary-dark border-secondary-dark focus:border-0">
    <Icon name="line-md:rotate-270" class="dark:text-secondary-light text-primary-light mb-0" />
    <span class="font-light leading-3 text-sm absolute top-[-10px] left-[50%] transform translate-x-[-50%] bg-secondary-light dark:bg-primary-light px-3 py-2 rounded-full">
      {{ dismissed.length ?? '' }}
    </span>
  </button>
</template>
<script setup lang="js">
const { returnArticle, state } = useNews()
const { value: { dismissed } } = state
</script>