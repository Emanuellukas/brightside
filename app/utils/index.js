export const startSunriseAnimation = () => {
	console.log('teste sunrise')
}

export const formatedDate = (pubDate) => {
  const date = new Date(pubDate)
  if (!isNaN(date)) {
    return date.toLocaleDateString('pt-BR', { day: '2-digit', month: 'short', year: 'numeric' });
  }
}