import { defineStore } from "pinia";
import Bandas from "src/services/bandas";

export const useBandasStore = defineStore("bandas", {
  state: () => ({
    bandas: [],
  }),
  actions: {
    async getBandas() {
      this.bandas = await Bandas.getBandas();
    },
  },
});
