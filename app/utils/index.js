import useNews from "../composables/useNews";

export const startSunriseAnimation = () => {
	console.log('teste sunrise')
}

// URL do XML
const xmlUrl = 'https://www.gazetadopovo.com.br/feed/rss/ideias.xml';
const errorMessage = 'Erro ao buscar XML de notícias.';
let articleCount = 0;
const articlesArray = []

// Função para converter XML em JSON
export const  xmlToJson = (xml) => {
  const obj = {};

	// Processar elementos filhos
  if (xml.hasChildNodes()) {
    for (let i = 0; i < xml.childNodes.length; i++) {
      const item = xml.childNodes.item(i);
      const { nodeName } = item;

      if (typeof (obj[nodeName]) === "undefined") {
        obj[nodeName] = xmlToJson(item);
      } else {
        if (typeof (obj[nodeName].push) === "undefined") {
          const old = obj[nodeName];
          obj[nodeName] = [];
          obj[nodeName].push(old);
        }

        if (nodeName === 'item') {
					const article = xmlToJson(item)
					obj[nodeName].push(article)
					articlesArray.push(article)
					articleCount++
				} else obj[nodeName].push(xmlToJson(item))
      }
    }
  }

	switch(xml.nodeType) {
		case 1:
			if (xml.attributes.length > 0) {
				obj["@attributes"] = {};
				for (let j = 0; j < xml.attributes.length; j++) {
					const attribute = xml.attributes.item(j);
					obj["@attributes"][attribute.nodeName] = attribute.nodeValue;
				}
			}
			break;
		case 3:
			obj.nodeValue = xml.nodeValue;
			if (!articlesArray.length) break

			if (!['url', 'link'].includes(xml.parentNode.nodeName)) break

			articlesArray[articleCount].link = xml.parentNode.nodeName === 'link' ? xml.nodeValue : ''
			articlesArray[articleCount].urlToImage = xml.parentNode.nodeName === 'url' ? xml.nodeValue : undefined
		case 4:
			if (articlesArray.length) {
				if (xml.parentNode.nodeName === 'title')
					articlesArray[articleCount] = {...articlesArray[articleCount], title: xml.nodeValue}
	
				if (xml.parentNode.nodeName === 'description')
					articlesArray[articleCount] = {...articlesArray[articleCount], description: xml.nodeValue}
			}
			break;
	}

  return obj;
}

export const getRssNews = async () => {
	useNews().value.loading = true

	$fetch('/xmlRss', {params: { alou: true }})
  .then(xmlString => {
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(xmlString, "text/xml");
    xmlToJson(xmlDoc);
		useNews().value = {...useNews().value, articles: articlesArray, loading: false};
  })
  .catch(error => {
		alert(errorMessage, error)
		console.error(errorMessage, error)
	});
}