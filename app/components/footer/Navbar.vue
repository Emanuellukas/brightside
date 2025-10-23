<template>
  <div class="absolute flex items-center stroke-current bottom-[1rem] left-[50%] transform translate-x-[-50%] text-white w-11/12 md:w-1/4 justify-between">
    <FooterReturnArticle v-if="hasDismissedArticles()"/>
    <FooterButton @click="selectCategory(footerCategories.search)" class="bg-primary dark:bg-sky-900 dark:text-primary-dark border-solid hover:text-yellow-700 hover:bg-secondary
      w-1/3 rounded-l-full rounded-tr-none">
      <div class="flex justify-center">
        <Icon :name="FEED_CATEGORIES[footerCategories.search].icon" />
      </div>
    </FooterButton>
    <FooterButton @click="updateFeedNews(footerCategories.home)" class="bg-primary dark:bg-sky-900 dark:text-primary-dark w-1/3 rounded-none hover:bg-secondary hover:text-yellow-700">
      <div class="flex justify-center">
        <Icon :name="FEED_CATEGORIES[footerCategories.home].icon"/>
      </div>
    </FooterButton>
    <FooterButton @click="updateFeedNews(footerCategories.games)" class="bg-primary dark:bg-sky-900 dark:text-primary-dark w-1/3 rounded-r-full rounded-tl-none hover:bg-secondary hover:text-yellow-700">
      <div class="flex justify-center">
        <Icon :name="FEED_CATEGORIES[footerCategories.games].icon"/>
      </div>
    </FooterButton>
  </div>
</template>
<script setup lang="js">
const { FEED_CATEGORIES } = useCategories()
const { selectCategory, updateFeedNews, hasDismissedArticles } = useNews() 

const footerCategories = {
  search: 'gnews',
  home: 'sonoticiaboa', 
  games: 'adrenaline'
}

//todo: criar metodo que salva os favoritos no localStorage
//todo: mini visualização do conteúdo caso a clique no card
</script>