import { defineStore } from "pinia"

export const useTablaStore = defineStore("tabla", {
  state: () => ({
    tablaLista: [],
  }),
  getters: {
    obtenerTabla(state) {
      return state.tablaLista
    },
  },
  actions: {
    llenarTablaLista(valores) {
      this.tablaLista = valores
    },
    agregarItemTabla(object) {
      this.tablaLista.push(object)
    },
    async obtenerTablaAPI() {
      await fetch("https://639a60473a5fbccb5265ab59.mockapi.io/clase-12")
        .then(resultado => resultado.json())
        .then(data => {
          this.tablaLista = data
        })
    },
  },
})
