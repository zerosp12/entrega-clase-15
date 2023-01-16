<script setup>
import { reactive, computed, onBeforeMount } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useTablaStore } from "../store/store.js"

const route = useRoute()
const router = useRouter()
const store = useTablaStore()
let objetoView = reactive([])

const obtenerChecked = computed(() => {
    return objetoView.checked ? "Si" : "No"
})

onBeforeMount(() => {
    const id = route.params.id
    objetoView = store.obtenerTabla.find(x => x.id == id)
})
</script>

<template>
  <div class="table-responsive">
    <table class="table">
      <thead>
        <tr>
          <th scope="col">Parametro</th>
          <th scope="col">Valor</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td scope="row">Nombre:</td>
          <td>{{ objetoView.nombre }}</td>
        </tr>
        <tr>
          <td scope="row">Checked:</td>
          <td>{{ obtenerChecked }}</td>
        </tr>
        <tr>
          <td scope="row">País:</td>
          <td>{{ objetoView.pais }}</td>
        </tr>
        <tr>
          <td scope="row">Edad:</td>
          <td>{{ objetoView.edad }}</td>
        </tr>
        <tr>
          <td scope="row">Comentarios:</td>
          <td>{{ objetoView.comentarios }}</td>
        </tr>
      </tbody>
    </table>
    <button type="button" class="btn btn-warning" @click="router.go(-1)">
      Volver
    </button>
  </div>
</template>
