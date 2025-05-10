<template>
  <div class="absolute flex items-center stroke-current bottom-[-2rem] left-[50%] text-white w-11/12 justify-between" 
    style="transform: translate(-50%, -50%); ">
    <FooterButton @click="getFeedNews()" class="bg-primary border-solid hover:text-yellow-700 hover:bg-secondary
      w-1/3 rounded-tl-full rounded-tr-none">
      <div class="flex justify-center">
        <nuxt-icon name="sun"/>
      </div>
    </FooterButton>
    <FooterButton class="bg-primary w-1/3 rounded-none hover:bg-secondary hover:text-yellow-700">
      <div class="flex justify-center">
        <nuxt-icon name="search"/>
      </div>
    </FooterButton>
    <FooterButton class="bg-primary w-1/3 rounded-tr-full rounded-tl-none hover:bg-secondary hover:text-yellow-700">
      <div class="flex justify-center">
        <nuxt-icon name="bookmark-o"/>
      </div>
    </FooterButton>
  </div>
</template>
<script setup lang="js">
const news = useNews().value

const getFeedNews = async () => {
  news.loading = true

  startSunriseAnimation()
  getServerRssNews('games') 
}
</script>