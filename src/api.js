const API_URL =
  "https://api.github.com/repos/italia/covid19-opendata-vaccini/contents/";
const VACCINI_SUMMARY_PATH = "dati/vaccini-summary-latest.json";
const SOGGETTI_GUARITI_PATH = "dati/soggetti-guariti.json";
const ANAGRAFICA_SUMMARY_PATH = "dati/anagrafica-vaccini-summary-latest.json";
const ULTIMO_AGGIORNAMENTO = "dati/last-update-dataset.json";

const readFile = async (url) => {
  let result = null;
  const response = await fetch(url);
  const json = await response.json();
  if (json.content) {
    result = JSON.parse(atob(json.content)).data;
    // i file opendata sui vaccini di github sono in base 64,
    // quindi col metodo atob lo converto da base64 a stringa
    // e poi lo converto in json con json.parse e di questo json andiamo a prendere solo i .data
  }
  return result;
};

export default {
  API_URL,
  VACCINI_SUMMARY_PATH,
  SOGGETTI_GUARITI_PATH,
  ANAGRAFICA_SUMMARY_PATH,
  ULTIMO_AGGIORNAMENTO,
  readFile,
};
