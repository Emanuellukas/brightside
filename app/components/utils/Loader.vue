<template>
  <div class="loader-container absolute stroke-current bottom-[-2rem] left-[50%] text-white justify-between" 
    style="transform: translate(-50%, -150%); z-index: -5;">
    <img src="../../assets/images/sun-draw.png" alt="logo" class="animate-spin loader blur-sm">
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