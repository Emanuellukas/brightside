import useNews from "../composables/useNews";

export const startSunriseAnimation = () => {
	console.log('teste sunrise')
}

// URL do XML
const xmlUrl = 'https://www.gazetadopovo.com.br/feed/rss/ideias.xml';
const errorMessage = 'Erro ao buscar XML de notícias.';

// Função para converter XML em JSON
export const  xmlToJson = (xml) => {
  const obj = {};
  if (xml.nodeType === 1) { // Elemento
    if (xml.attributes.length > 0) {
      obj["@attributes"] = {};
      for (let j = 0; j < xml.attributes.length; j++) {
        const attribute = xml.attributes.item(j);
        obj["@attributes"][attribute.nodeName] = attribute.nodeValue;
      }
    }
  } else if (xml.nodeType === 3) { // Texto
    obj.nodeValue = xml.nodeValue;
  }

  // Processar elementos filhos
  if (xml.hasChildNodes()) {
    for (let i = 0; i < xml.childNodes.length; i++) {
      const item = xml.childNodes.item(i);
      const nodeName = item.nodeName;
      if (typeof (obj[nodeName]) === "undefined") {
        obj[nodeName] = xmlToJson(item);
      } else {
        if (typeof (obj[nodeName].push) === "undefined") {
          const old = obj[nodeName];
          obj[nodeName] = [];
          obj[nodeName].push(old);
        }
        obj[nodeName].push(xmlToJson(item));
      }
    }
  }
  return obj;
}

export const getRssNews = async () => {
	fetch(xmlUrl)
  .then(response => response.text())
  .then(xmlString => {
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(xmlString, "text/xml");
    const jsonResult = xmlToJson(xmlDoc);
    console.log(JSON.stringify(jsonResult, null, 2));
		useNews().value = jsonResult;
  })
  .catch(error => {
		alert(errorMessage, error)
		console.error(errorMessage, error)
	});
}