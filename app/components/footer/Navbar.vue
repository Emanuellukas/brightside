<template>
  <div class="absolute flex items-center stroke-current bottom-[-1rem] left-[50%] text-white w-11/12 md:w-1/4 justify-between" 
    style="transform: translate(-50%, -50%); ">
    <FooterButton @click="selectCategory('gnews')" class="bg-primary dark:bg-sky-900 dark:text-primary-dark border-solid hover:text-yellow-700 hover:bg-secondary
      w-1/3 rounded-l-full rounded-tr-none">
      <div class="flex justify-center">
        <Icon name="line-md:search-twotone" />
      </div>
    </FooterButton>
    <FooterButton @click="getFeedNews('world')" class="bg-primary dark:bg-sky-900 dark:text-primary-dark w-1/3 rounded-none hover:bg-secondary hover:text-yellow-700">
      <div class="flex justify-center">
        <Icon name="line-md:sun-rising-loop"/>
      </div>
    </FooterButton>
    <FooterButton @click="getFeedNews('adrenaline')" class="bg-primary dark:bg-sky-900 dark:text-primary-dark w-1/3 rounded-r-full rounded-tl-none hover:bg-secondary hover:text-yellow-700">
      <div class="flex justify-center">
        <Icon name="game-icons:console-controller"/>
      </div>
    </FooterButton>
  </div>
</template>
<script setup lang="js">

const { getServerRssNews, selectCategory } = useNews() 

const getFeedNews = async (category) => {
  startSunriseAnimation()
  getServerRssNews(category)
}

//todo: criar metodo que salva os favoritos no localStorage
//todo: mini visualização do conteúdo caso a clique no card
</script>