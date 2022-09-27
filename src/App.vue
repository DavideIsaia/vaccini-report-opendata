<template>
  <div>
    <AppJumbotron />
    <section>
      <h1 class="title has-text-centered is-3">Tabella Regioni</h1>
      <b-table
        :data="vacciniDataSet"
        :loading="isLoading"
        detailed
        :opened-detailed="[1]"
        :striped="true"
        detail-key="reg"
        default-sort="dosi_somministrate"
        default-sort-direction="desc"
      >
        <b-table-column field="reg" label="Regione" sortable v-slot="props">
          {{ props.row.reg }}
        </b-table-column>
        <b-table-column
          field="dosi_consegnate"
          label="Dosi Consegnate"
          sortable
          centered
          v-slot="props"
        >
          {{ props.row.dosi_consegnate.toLocaleString() }}
        </b-table-column>
        <b-table-column
          field="dosi_somministrate"
          label="Dosi Somministrate"
          sortable
          centered
          v-slot="props"
        >
          {{ props.row.dosi_somministrate.toLocaleString() }}
        </b-table-column>
        <b-table-column
          field="percentuale_somministrazione"
          label="% Somministrazioni"
          sortable
          centered
          v-slot="props"
        >
          <span
            v-if="props.row.percentuale_somministrazione < 88"
            class="tag is-medium is-danger"
          >
            {{ props.row.percentuale_somministrazione }}
          </span>
          <span
            v-else-if="
              props.row.percentuale_somministrazione >= 88 &&
              props.row.percentuale_somministrazione < 92
            "
            class="tag is-medium is-warning"
          >
            {{ props.row.percentuale_somministrazione }}
          </span>
          <span v-else class="tag is-medium is-success">
            {{ props.row.percentuale_somministrazione }}
          </span>
        </b-table-column>
        <template #detail="props">
          <article class="media">
            <figure class="media-left">
              <p class="image is-64x64">
                <img
                  :src="`/images/${props.row.area}.png`"
                  alt="Simbolo Regione"
                />
              </p>
            </figure>
            <div class="content">
              <b-taglist attached>
                <b-tag type="is-medium is-black">Prima Dose</b-tag>
                <b-tag type="is-medium is-info"></b-tag>
                <b-tag type="is-medium is-black">Seconda Dose</b-tag>
                <b-tag type="is-medium is-info"></b-tag>
              </b-taglist>
            </div>
          </article>
        </template>
      </b-table>
    </section>
    <AppFooter />
  </div>
</template>

<script>
import AppJumbotron from "./components/AppJumbotron.vue";
import AppFooter from "./components/AppFooter.vue";
import api from "./api";

export default {
  name: "App",
  components: {
    AppJumbotron,
    AppFooter,
  },
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
