<script setup>
import { onMounted } from "vue"
import { useTablaStore } from "../store/store.js"

const store = useTablaStore()

onMounted(() => {
  store.obtenerTablaAPI()
})
</script>

<template>
  <div class="table-container mt-4">
    <h3>Lista Tabla</h3>
    <div class="table-responsive">
      <table class="table text-center">
        <thead>
          <tr>
            <th scope="col">Nombre</th>
            <th scope="col">País</th>
            <th scope="col">Edad</th>
            <th scope="col">Ver +</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(lista, index) in store.obtenerTabla" :key="index">
            <td scope="row">{{ lista.nombre }}</td>
            <td>{{ lista.pais }}</td>
            <td>{{ lista.edad }}</td>
            <td><router-link :to="`/ver/${lista.id}`">Ver + </router-link></td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style lang="css" scoped></style>
