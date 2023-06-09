<template>
  <div class="container">
    <img class="superpose" src="./assets/book.gif" alt="Image 1" />
    <img class="superpose" src="./assets/openbook.png" alt="Image 2" />
  </div>
  <Affichage
    title="Librairie"
    description="Voici le contenu de la librairie :"
    :recherche="motcle"
  >
  </Affichage>
</template>

<script setup>
import { ref } from "vue";
import Affichage from "./components/Affichage.vue";
const images = ref(["./assets/book.gif", "./assets/book.gif"]);
const motcle = ref("");
function handler(texte) {
  console.log(texte);
  motcle.value = texte;
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
@keyframes imageAnimation {
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

img:nth-of-type(1) {
  animation: imageAnimation 5s infinite;
}

img:nth-of-type(2) {
  animation: imageAnimation 5s infinite;
  animation-delay: 2.5s;
}
.container {
  position: relative;
}
.superpose {
  position: absolute;
  top: 100%;
  left: 75%;
}
</style>
