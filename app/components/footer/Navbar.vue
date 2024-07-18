<template>
  <div class="absolute flex items-center mx-auto stroke-current bottom-[-2rem] left-[50%] text-white w-10/12 justify-between" 
    style="transform: translate(-50%, -50%); ">
    <FooterButton @click="getFeedNews()" class="bg-primary hover:bg-yellowSoft w-1/3 rounded-tl-full rounded-tr-none">
      <div class="flex justify-center">
        <nuxt-icon name="sun"/>
      </div>
    </FooterButton>
    <FooterButton class="bg-primary w-1/3 rounded-none hover:bg-yellowSoft">
      <div class="flex justify-center">
        <nuxt-icon name="search"/>
      </div>
    </FooterButton>
    <FooterButton class="bg-primary w-1/3 rounded-tr-full rounded-tl-none hover:bg-yellowSoft">
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
  
  const response = await $fetch('/home')
  console.log('response', response)
  news.articles = response.articles.length ? response.articles : [
    {
      source: {
      id: "google-news-br",
      name: "Google News (Brasil)"
      },
      author: "G1",
      title: "Rejeitado no clube de tiro e vítima de bullying na escola: o que se sabe sobre Thomas Matthew Crooks, que tentou matar Trump - G1",
      description: null,
      url: "https://news.google.com/rss/articles/CBMiigFodHRwczovL2cxLmdsb2JvLmNvbS9tdW5kby9lbGVpY29lcy1ub3MtZXVhLzIwMjQvbm90aWNpYS8yMDI0LzA3LzE1L28tcXVlLXNlLXNhYmUtc29icmUtdGhvbWFzLW1hdHRoZXctY3Jvb2tzLXF1ZS10ZW50b3UtbWF0YXItdHJ1bXAuZ2h0bWzSAZUBaHR0cHM6Ly9nMS5nbG9iby5jb20vZ29vZ2xlL2FtcC9tdW5kby9lbGVpY29lcy1ub3MtZXVhLzIwMjQvbm90aWNpYS8yMDI0LzA3LzE1L28tcXVlLXNlLXNhYmUtc29icmUtdGhvbWFzLW1hdHRoZXctY3Jvb2tzLXF1ZS10ZW50b3UtbWF0YXItdHJ1bXAuZ2h0bWw?oc=5",
      urlToImage: null,
      publishedAt: "2024-07-15T04:39:20+00:00",
      content: null
    },
    {
      source: {
      id: "bbc-news",
      name: "BBC News"
      },
      author: "BBC News",
      title: "Covid: UK cases rise by 31,117 - BBC News",
      description: "The number of new cases in the UK has risen by 31,117 in the latest daily figures.",
      url: "https://www.bbc.co.uk/news/uk-62470845",
      urlToImage: "https://ichef.bbci.co.uk/news/1024/branded_news/1A6C/production/_120780468_gettyimages-1234579495.jpg",
      publishedAt: "2024-07-15T04:39:20+00:00",
      content: null
    },
    {
      source: {
      id: "cnn",
      name: "CNN"
      },
      author: "CNN",
      title: "Tokyo Olympics: US gymnast Simone Biles withdraws from individual all-around competition - CNN",
      description: "US gymnast Simone Biles has withdrawn from the individual all-around competition at the Tokyo 2020 Olympics to focus on her mental health.",
      url: "https://www.cnn.com/2021/07/28/sport/simone-biles-tokyo-olympics-gymnastics-intl/index.html",
      urlToImage: "https://cdn.cnn.com/cnnnext/dam/assets/210727234221-01-simone-biles-0727-super-tease.jpg",
      publishedAt: "2024-07-15T04:39:20+00:00",
      content: null
    },
    {
      source: {
      id: "techcrunch",
      name: "TechCrunch"
      },
      author: "TechCrunch",
      title: "Tesla’s solar and energy storage business rakes in $810M, finally exceeds cost of revenue - TechCrunch",
      description: "Tesla’s primary source of revenue comes from the sale of its electric vehicles, but its latest quarterly earnings report showed growth in its energy storage and solar business.",
      url: "https://techcrunch.com/2021/07/26/teslas-solar-and-energy-storage-business-rakes-in-810m-finally-exceeds-cost-of-revenue/",
      urlToImage: "https://techcrunch.com/wp-content/uploads/2021/07/tesla-energy.jpg?w=600",
      publishedAt: "2024-07-15T04:39:20+00:00",
      content: null
    },
    {
      source: {
      id: "the-verge",
      name: "The Verge"
      },
      author: "The Verge",
      title: "Apple’s MagSafe Battery Pack is now available to buy - The Verge",
      description: "Apple’s MagSafe Battery Pack is now available to buy for $99 - The Verge",
      url: "https://www.theverge.com/2021/7/20/22584388/apple-magsafe-battery-pack-iphone-12-mini-pro-max",
      urlToImage: "https://cdn.vox-cdn.com/thumbor/7z4w3z3XZ3q6Y0Q4vZ0J0XZ9Z4A=/0x0:2040x1360/fit-in/1200x630/cdn.vox-cdn.com/uploads/chorus_asset/file/22747709/vpavic_210720_4693_0015.jpg",
      publishedAt: "2024-07-15T04:39:20+00:00",
      content: null
    }
  ]
  news.loading = false
}
</script>