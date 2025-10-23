<template>
  <div class="relative w-full h-full overflow-hidden">
    <NuxtImg
      :src="`/backgrounds/${useTheme().currentBackgroundTheme}.png`"
      alt="Brightside background"
      class="absolute inset-0 w-full h-full object-cover z-0"
      format="png"
    />

    <div class="relative z-10">
      <div :class="['main', { dark: isNight }]">
        <HeaderNavbar/>
        <div class="container px-4 mx-auto">
          <UtilsLoader :isNight="isNight" v-if="state.loading"/>
          <slot />
        </div>
        <FooterNavbar/>
      </div>
    </div>
  </div>
</template>
<script setup>
const { state } = useNews()

const isNight = computed(() => {
  const { currentBackgroundTheme }	 = useTheme()
  return (currentBackgroundTheme === 'night' || currentBackgroundTheme === 'evening')
})
</script>