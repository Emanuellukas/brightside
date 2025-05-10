<template>
  <div class="loader-container absolute flex items-center mx-auto stroke-current bottom-[-2rem] left-[50%] text-white w-[70%] justify-between" 
    style="">
    <img src="../../assets/images/sun-draw.png" alt="logo" class="animate-spin loader blur-lg">
  </div>
</template>
<script setup lang="js">

</script>
<style scoped>

.loader-container {
  transform: translate(-50%, -150%);
  z-index: -5;
}
.loader {
  animation-duration: 50s;
}
</style>