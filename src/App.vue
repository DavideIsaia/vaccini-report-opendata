<template>
  <div>
    <h1 class="title is-1">Ciao</h1>
  </div>
</template>

<script>
// import HelloWorld from "./components/HelloWorld.vue";
import api from "./api";

export default {
  name: "App",
  components: {},
  data() {
    return {
      vacciniDataSet: [],
      somministrazioniDataSet: [],
      anagraficaDataSet: [],
      consegneDataSet: [],
    };
  },
  methods: {
    // aggiungiamo await in tutte le chiamate per evitare che rimangano delle promise
    async loadData() {
      this.vacciniDataSet = await api.readFile(
        `${api.API_URL}${api.VACCINI_SUMMARY_PATH}`
      );
      this.somministrazioniDataSet = await api.readFile(
        `${api.API_URL}${api.SOMMINISTRAZIONI_SUMMARY_PATH}`
      );
      this.anagraficaDataSet = await api.readFile(
        `${api.API_URL}${api.ANAGRAFICA_SUMMARY_PATH}`
      );
      this.consegneDataSet = await api.readFile(
        `${api.API_URL}${api.CONSEGNE_VACCINI_PATH}`
      );
    },
  },
  mounted() {
    this.loadData();
  },
};
</script>

<style lang="scss"></style>
