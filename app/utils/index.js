import useNews from "../composables/useNews";

export const startSunriseAnimation = () => {
	console.log('teste sunrise')
}

export const formatedDate = (pubDate) => {
  const date = new Date(pubDate)
  if (!isNaN(date)) {
    return date.toLocaleDateString('pt-BR', { day: '2-digit', month: 'short', year: 'numeric' });
  }
}

const setThemeBasedOnTime = () => {
  //todo: criar metodo que define o tema da aplicação baseado no horário
}