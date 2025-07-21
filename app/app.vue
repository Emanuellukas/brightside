<template>
  <div>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>
<script setup>
useSeoMeta({
  title: 'Brightside',
  ogTitle: 'Brightside',
  description: 'Um portal destinado a divulgar notícias que farão seu dia melhor.',
  ogDescription: 'Um portal destinado a divulgar notícias que farão seu dia melhor.',
  ogImage: 'https://example.com/image.png',
  twitterCard: 'summary_large_image',
})
</script>
