<script setup>
import { reactive, computed } from "vue"
import { useVuelidate } from "@vuelidate/core"
import { useTablaStore } from "../store/store.js"
import {
  required,
  minLength,
  maxLength,
  sameAs,
  helpers,
} from "@vuelidate/validators"

const store = useTablaStore()

//----------------
// Validación
//----------------
const state = reactive({
  nombre: "",
  checked: false,
  pais: "",
  edad: 18,
  comentarios: "",
})

const mensajes = {
  required: "Este campo no puede estar vacío",
  minlenght: "Debes ingresar al menos 4 caracteres",
  sameas: "Debes hacer click en el CheckBox",
  maxlenght: "Los comentarios no deben superar los 30 caracteres",
}

const rules = {
  nombre: {
    required: helpers.withMessage(mensajes.required, required),
    minLength: helpers.withMessage(mensajes.minlenght, minLength(4)),
  },
  checked: { sameAs: helpers.withMessage(mensajes.sameas, sameAs(true)) },
  pais: { required: helpers.withMessage(mensajes.required, required) },
  edad: { required: helpers.withMessage(mensajes.required, required) },
  comentarios: {
    required: helpers.withMessage(mensajes.required, required),
    maxLength: helpers.withMessage(mensajes.maxlenght, maxLength(30)),
  },
}

const v$ = useVuelidate(rules, state)

//----------------
// Methods
//----------------
function siguienteFocus(event) {
  event.preventDefault()

  const inputs = Array.from(
    event.target.form.querySelectorAll("input, textarea, select, button")
  )
  const index = inputs.indexOf(event.target)

  if (index < inputs.length) {
    inputs[index + 1].focus()
  }

  return false
}

function obtenerClassEstado(field) {
  if (!field) return ""

  if (field.$dirty) {
    return !field.$invalid ? "is-valid" : "is-invalid"
  }

  return ""
}

async function enviarFomulario() {
  const resultado = await this.v$.$validate()

  if (resultado) {
    const valores = {
      id: 0,
      nombre: this.v$.nombre.$model,
      checked: this.v$.checked.$model,
      pais: this.v$.pais.$model,
      edad: this.v$.edad.$model,
      comentarios: this.v$.comentarios.$model,
    }

    const response = await fetch(
      "https://639a60473a5fbccb5265ab59.mockapi.io/clase-12",
      {
        method: "POST",
        mode: "cors",
        cache: "no-cache",
        credentials: "same-origin",
        headers: {
          "Content-Type": "application/json",
        },
        redirect: "follow",
        referrerPolicy: "no-referrer",
        body: JSON.stringify(valores),
      }
    )
      .then(res => res.json())
      .catch(error => console.error("Error:", error))
      .then(response => {
        store.agregarItemTabla(response)

        this.v$.nombre.$model = ""
        this.v$.checked.$model = false
        this.v$.pais.$model = ""
        this.v$.edad.$model = 18
        this.v$.comentarios.$model = ""
        this.v$.$reset()
      })
  }
}

//----------------
// Computeds
//----------------
const countCaracteres = computed(() => {
  return state.comentarios.length
})
</script>
<template>
  <h3>Proyecto Clase 15 - Vue3</h3>
  <hr />
  <form>
    <div class="form-group required-field mb-3">
      <label>Nombre</label>
      <input
        v-model="v$.nombre.$model"
        type="text"
        class="form-control"
        :class="obtenerClassEstado(v$.nombre)"
        @blur="v$.nombre.$touch()"
        @keydown.enter="siguienteFocus"
      />
      <p
        class="text-danger"
        v-for="error of v$.nombre.$errors"
        :key="error.$uid"
      >
        {{ error.$message }}
      </p>
    </div>
    <div class="form-group required-field mb-3">
      <input
        v-model="v$.checked.$model"
        class="form-check-input"
        type="checkbox"
        :class="obtenerClassEstado(v$.checked)"
        @change="v$.checked.$touch()"
        @blur="v$.checked.$touch()"
        @keydown.enter="siguienteFocus"
      />
      <label class="px-2"> Este Checkbox es Obligatorio</label>
      <p
        class="text-danger"
        v-for="error of v$.checked.$errors"
        :key="error.$uid"
      >
        {{ error.$message }}
      </p>
    </div>
    <div class="form-group required-field mb-3">
      <label>País</label>
      <select
        v-model="v$.pais.$model"
        class="form-select"
        :class="obtenerClassEstado(v$.pais)"
        @blur="v$.pais.$touch()"
        @keydown.enter="siguienteFocus"
      >
        <option value="" selected>Selecciona un País...</option>
        <option value="Argentina">Argentina</option>
        <option value="Perú">Perú</option>
        <option value="Uruguay">Uruguay</option>
      </select>
      <p class="text-danger" v-for="error of v$.pais.$errors" :key="error.$uid">
        {{ error.$message }}
      </p>
    </div>
    <div class="form-group required-field mb-3">
      <label>Edad</label>
      <input
        v-model="v$.edad.$model"
        type="number"
        class="form-control"
        min="0"
        max="100"
        :class="obtenerClassEstado(v$.edad)"
        @blur="v$.edad.$touch()"
        @keydown.enter="siguienteFocus"
      />
      <p class="text-danger" v-for="error of v$.edad.$errors" :key="error.$uid">
        {{ error.$message }}
      </p>
    </div>
    <div auto-label class="form-group mb-3">
      <label>Comentarios</label>
      <textarea
        v-model="v$.comentarios.$model"
        class="form-control"
        :class="obtenerClassEstado(v$.comentarios)"
        rows="3"
        @blur="v$.comentarios.$touch()"
      ></textarea>
      <small class="form-text text-muted"
        >{{ countCaracteres }} / 30 máximo</small
      >
      <p
        class="text-danger"
        v-for="error of v$.comentarios.$errors"
        :key="error.$uid"
      >
        {{ error.$message }}
      </p>
    </div>
    <button
      type="submit"
      class="btn btn-primary fw-bold"
      @click.prevent="enviarFomulario()"
    >
      Ingresar a la Lista
    </button>
  </form>
</template>

<style scoped>
</style>
