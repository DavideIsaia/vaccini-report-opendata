<template>
  <div>
    <AppJumbotron />
    <section class="section is-centered">
      <div class="box">
        <h1 class="title is-3 has-text-centered">Totale Nazionale</h1>
        <b-taglist attached class="is-centered">
          <div>
            <b-tag type="is-large is-light">Vaccini Consegnati</b-tag>
            <b-tag type="is-large is-info">{{ totVacciniCons }}</b-tag>
          </div>
          <div>
            <b-tag type="is-large is-light">Vaccini Somministrati</b-tag>
            <b-tag type="is-large is-info">{{ totVacciniSomm }}</b-tag>
          </div>
          <div>
            <b-tag type="is-large is-light">Guariti Non Vaccinati</b-tag>
            <b-tag type="is-large is-success">{{ totGuaritiSenzaSomm }}</b-tag>
          </div>
          <div>
            <b-tag type="is-large is-light">Guariti con 1 o 2 dosi</b-tag>
            <b-tag type="is-large is-success">{{ totGuaritiPostSomm }}</b-tag>
          </div>
          <div>
            <b-tag type="is-large is-light">Guariti con Dose Booster</b-tag>
            <b-tag type="is-large is-success">{{
              totGuaritiPostBooster
            }}</b-tag>
          </div>
        </b-taglist>
      </div>
    </section>
    <main class="section is-centered">
      <div class="box">
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
            label="% Somministrazioni/Dosi Consegnate"
            sortable
            centered
            v-slot="props"
          >
            <span
              v-if="props.row.percentuale_somministrazione < 88"
              class="tag is-medium is-danger"
            >
              {{ props.row.percentuale_somministrazione }}%
            </span>
            <span
              v-else-if="
                props.row.percentuale_somministrazione >= 88 &&
                props.row.percentuale_somministrazione < 92
              "
              class="tag is-medium is-warning"
            >
              {{ props.row.percentuale_somministrazione }}%
            </span>
            <span v-else class="tag is-medium is-success">
              {{ props.row.percentuale_somministrazione }}%
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
                  <b-tag type="is-medium is-black"
                    >Guariti con dose Booster</b-tag
                  >
                  <b-tag type="is-medium is-info">{{
                    info[props.row.reg].guariti_post_1booster.toLocaleString()
                  }}</b-tag>
                  <b-tag type="is-medium is-black"
                    >Guariti dopo 1 o 2 somministrazioni</b-tag
                  >
                  <b-tag type="is-medium is-info">{{
                    info[props.row.reg].guariti_post_somm.toLocaleString()
                  }}</b-tag>
                  <b-tag type="is-medium is-black">Guariti non vaccinati</b-tag>
                  <b-tag type="is-medium is-info">{{
                    info[props.row.reg].guariti_senza_somm.toLocaleString()
                  }}</b-tag>
                </b-taglist>
              </div>
            </article>
          </template>
        </b-table>
      </div>
    </main>
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
      soggettiGuaritiDataSet: [],
      anagraficaDataSet: [],
      ultimoAggiornamento: [],
      isLoading: false,
      info: {},
    };
  },
  computed: {
    totVacciniCons() {
      return this.vacciniDataSet
        .reduce((accum, summary) => accum + summary.dosi_consegnate, 0)
        .toLocaleString();
    },
    totVacciniSomm() {
      return this.vacciniDataSet
        .reduce((accum, summary) => accum + summary.dosi_somministrate, 0)
        .toLocaleString();
    },
    totGuaritiSenzaSomm() {
      return this.soggettiGuaritiDataSet
        .reduce((accum, summary) => accum + summary.guariti_senza_somm, 0)
        .toLocaleString();
    },
    totGuaritiPostSomm() {
      return this.soggettiGuaritiDataSet
        .reduce((accum, summary) => accum + summary.guariti_post_somm, 0)
        .toLocaleString();
    },
    totGuaritiPostBooster() {
      return this.soggettiGuaritiDataSet
        .reduce((accum, summary) => accum + summary.guariti_post_1booster, 0)
        .toLocaleString();
    },
  },
  mounted() {
    this.loadData();
  },
  methods: {
    // aggiungiamo await in tutte le chiamate per evitare che rimangano delle promise
    async loadData() {
      this.isLoading = true;
      this.vacciniDataSet = await api.readFile(
        `${api.API_URL}${api.VACCINI_SUMMARY_PATH}`
      );
      this.soggettiGuaritiDataSet = await api.readFile(
        `${api.API_URL}${api.SOGGETTI_GUARITI_PATH}`
      );
      this.anagraficaDataSet = await api.readFile(
        `${api.API_URL}${api.ANAGRAFICA_SUMMARY_PATH}`
      );
      this.ultimoAggiornamento = await api.readFile(
        `${api.API_URL}${api.ULTIMO_AGGIORNAMENTO}`
      );
      this.isLoading = false;
      this.elaborateData();
    },
    // accorpiamo i dati per ogni regione, perchè sono suddivisi per fasce di età
    elaborateData() {
      this.vacciniDataSet.map((summary) => {
        this.info[summary.reg] = {
          eta: 0,
          guariti_post_1booster: 0,
          guariti_post_somm: 0,
          guariti_senza_somm: 0,
        };
        this.soggettiGuaritiDataSet
          .filter((item) => item.area == summary.area)
          .map((item) => {
            const singleObj = this.info[summary.reg];
            singleObj.eta += item.eta;
            singleObj.guariti_post_1booster += item.guariti_post_1booster;
            singleObj.guariti_post_somm += item.guariti_post_somm;
            singleObj.guariti_senza_somm += item.guariti_senza_somm;
          });
      });
    },
  },
};
</script>

<style lang="scss">
.image {
  margin-bottom: 2rem;
}
</style>
