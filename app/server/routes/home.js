export default defineEventHandler((event) => {
  console.log('asdasd', process.env.GN_URL)
  return new Promise( async (res, reject) => {
    try {
      let data = await $fetch(process.env.GN_URL + 'top-headlines?sortBy=relevancy&language=pt&apiKey=' + process.env.GN_KEY)
      res(data)
    } catch (error) {
      reject(error)
    }
  })
})
  