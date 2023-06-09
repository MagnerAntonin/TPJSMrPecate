<template>
  <body>
    <h1>{{ title }}</h1>
    <h2>{{ description }}</h2>
    <BarreDeRecherche @submit="rechercherLivre"></BarreDeRecherche>
    <CreationLivre :url="url" @livreCree="rechercherLivre"></CreationLivre>
    <div class="contenuLibrairie">
      <ul class="livres">
        <li class="livre" v-for="livre in listeLivres" :key="[livre.id]">
          <h4>Titre : {{ livre.titre }}</h4>
          <p>Stock : {{ livre.qtestock }}</p>
          <p>Prix : {{ livre.prix }} €</p>
          <div class="boutons">
            <button
              @click="
                livre.qtestock == 1
                  ? deleteLivre(livre.id)
                  : retirerQuantiteLivre(livre)
              "
              class="boutonMoins"
            >
              <img src="../assets/moins.png" />
            </button>
            <button @click="ajouterQuantiteLivre(livre)" class="boutonPlus">
              <img src="../assets/plus.png" />
            </button>
          </div>
          <button @click="supprimerLivre(livre.id)" class="btn">
            Supprimer
          </button>
        </li>
      </ul>
    </div>
  </body>
</template>

<script setup>
import LivreDesc from "../LivreDesc.js";
import BarreDeRecherche from "./BarreDeRecherche.vue";
import CreationLivre from "./CreationLivre.vue";
import { watch } from "vue";
import { reactive, defineProps } from "vue";

// Déclaration des variables
const listeLivres = reactive([]);
const props = defineProps(["pcritere", "description", "title"]);
let url = "https://webmmi.iut-tlse3.fr/~pecatte/librairies/public/7/livres";
let tri = "titre"; // Option de tri par défaut

// Fonctions
function rechercherLivre(text) {
  if (text) {
    url =
      "https://webmmi.iut-tlse3.fr/~pecatte/librairies/public/7/livres?search=" +
      text;
  }
  const fetchOptions = { method: "GET" };
  fetch(url, fetchOptions)
    .then((response) => {
      return response.json();
    })
    .then((dataJSON) => {
      console.log(dataJSON);
      listeLivres.splice(0, listeLivres.length);
      dataJSON.forEach((livre) => {
        listeLivres.push(
          new LivreDesc(livre.id, livre.titre, livre.qtestock, livre.prix)
        );
      });
      trierLivres(); // Tri des livres après la recherche
      console.log(listeLivres);
    })
    .catch((error) => {
      console.log(error);
    });
}

function supprimerLivre(index) {
  url = "https://webmmi.iut-tlse3.fr/~pecatte/librairies/public/7/livres";
  const fetchOptions = { method: "DELETE" };
  fetch(url + "/" + index, fetchOptions)
    .then((response) => {
      return response.json();
    })
    .then((dataJSON) => {
      console.log(dataJSON);
      rechercherLivre();
    })
    .catch((error) => {
      console.log(error);
    });
}

function ajouterQuantiteLivre(livre) {
  let myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  const fetchOptions = {
    method: "PUT",
    headers: myHeaders,
    body: JSON.stringify({
      id: livre.id,
      titre: livre.titre,
      qtestock: livre.qtestock + 1,
      prix: livre.prix,
    }),
  };
  fetch(url, fetchOptions)
    .then((response) => {
      return response.json();
    })
    .then((dataJSON) => {
      console.log(dataJSON);
      rechercherLivre();
    })
    .catch((error) => {
      console.log(error);
    });
}

function retirerQuantiteLivre(livre) {
  let myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  const fetchOptions = {
    method: "PUT",
    headers: myHeaders,
    body: JSON.stringify({
      id: livre.id,
      titre: livre.titre,
      qtestock: livre.qtestock - 1,
      prix: livre.prix,
    }),
  };
  fetch(url, fetchOptions)
    .then((response) => {
      return response.json();
    })
    .then((dataJSON) => {
      console.log(dataJSON);
      rechercherLivre();
    })
    .catch((error) => {
      console.log(error);
    });
}

// Fonction pour trier les livres
function trierLivres() {
  if (tri === "titre") {
    listeLivres.sort((a, b) => a.titre.localeCompare(b.titre));
  } else if (tri === "prix") {
    listeLivres.sort((a, b) => a.prix - b.prix);
  }
}

// Appel initial de la fonction de recherche
rechercherLivre();

// Surveillance des changements de propriétés
watch(props, (newcritere) => {
  rechercherLivre(newcritere.text);
});
</script>


<style scoped>
/* Couleurs */
:root {
  --primary-color: #6200ee;
  --secondary-color: #03dac6;
  --background-color: #f5f5f5;
  --text-color: #212121;
}

/* Polices de caractères */
body {
  font-family: "Roboto", sans-serif;
}

h1,
h2,
h3,
h4,
h5,
h6 {
  font-family: "Montserrat", sans-serif;
}

/* Organisation en grille */
.livres {
  display: grid;
  grid-template-columns: repeat(3, minmax(20px, 1fr));
  grid-gap: 20px;
  padding: 20px;
  margin: 20px;
}

.livre {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
}

.livre img {
  width: 100%;
  height: auto;
}

.livre h4 {
  margin-top: 10px;
}

/* Effets de survol */
.livre:hover {
  transform: scale(1.05);
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
}

/* Icônes et boutons */
.boutonPlus,
.boutonMoins,
.btn {
  border: none;
  background-color: transparent;
  cursor: pointer;
  margin: 0 5px;
}
.boutons {
  display: flex;
}
.boutonPlus:hover,
.boutonMoins:hover,
.btn:hover {
  color: var(--primary-color);
}
</style>
