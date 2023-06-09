<template>
  <form @submit.prevent="$emit('submit', text)">
    <label for="recherche">Recherche d'un livre par son titre : </label>
    <input
      class="boutonRecherche"
      type="text"
      id="recherche"
      v-model="text"
      required
    />
    <input type="submit" value="Rechercher" class="boutonRecherche" />
  </form>
</template>

<script setup>
import { ref } from "vue";
const text = ref("");
</script>
