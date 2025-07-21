export default defineEventHandler((event) => {
  return new Promise( async (res, reject) => {
    try {
      let data = await $fetch(process.env.GN_URL + 'top-headlines?sortBy=relevancy&language=pt&apiKey=' + process.env.GN_KEY)
      res(data)
    } catch (error) {
      reject(error)
    }
  })
})
  