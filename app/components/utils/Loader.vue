<template>
  <div class="loader-container absolute stroke-current top-[20%] left-[50%] text-white justify-between" 
    style="z-index: -5;">
    <!-- <img src="../../assets/images/sun-draw.png" alt="logo" class="animate-spin loader blur-sm"> -->
    <Icon name='line-md:sun-rising-filled-loop' class='text-primary text-[15rem]' v-if="!isNight"/>
    <Icon name='line-md:sunny-filled-loop-to-moon-filled-transition' class='text-secondary text-[15rem] animate-pulse' v-else/>
  </div>
</template>
<script setup lang="js">
const props = defineProps({
  isNight: Boolean
})
</script>
<style scoped>

.loader-container {
  transform: translateX(-50%);
  z-index: -5;
}

.loader {
  animation-duration: 50s;
}
</style>