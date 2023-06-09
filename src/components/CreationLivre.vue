<template>
  <div class="creation-livre">
    <h3>Créer un nouveau livre</h3>
    <label>Titre : </label>
    <input type="text" v-model="titre" />
    <br />
    <label>Prix : </label>
    <input type="number" v-model="prix" step="0.01" min="0.01" />
    <br />
    <label>Quantité : </label>
    <input type="number" v-model="qtestock" min="1" />
    <br />
    <button @click="creerLivre">Créer</button>
  </div>
</template>

<script>
export default {
  props: {
    url: String,
  },
  emits: ["livre-cree"],
  data() {
    return {
      titre: "",
      prix: 0.01,
      qtestock: 1,
    };
  },
  methods: {
    creerLivre() {
      if (this.prix < 0) {
        alert("Le prix ne peut pas être négatif");
        return;
      }
      if (this.qtestock < 0) {
        alert("La quantité ne peut pas être négative");
        return;
      }
      if (!this.titre) {
        alert("Le titre est obligatoire");
        return;
      }
      let myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      const fetchOptions = {
        method: "POST",
        headers: myHeaders,
        body: JSON.stringify({
          titre: this.titre,
          qtestock: this.qtestock,
          prix: this.prix,
        }),
      };
      fetch(this.url, fetchOptions)
        .then((response) => {
          return response.json();
        })
        .then((dataJSON) => {
          console.log(dataJSON);
          this.$emit("livre-cree"); // Émission de l'événement personnalisé
          this.resetForm();
        })
        .catch((error) => {
          console.log(error);
        });
    },
    resetForm() {
      this.titre = "";
      this.prix = 0;
      this.qtestock = 0;
    },
  },
};
</script>

<style scoped>
.creation-livre {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.creation-livre label {
  font-size: 1.2rem;
}

.creation-livre input[type="text"],
.creation-livre input[type="number"] {
  padding: 0.5rem;
  margin-bottom: 1rem;
}

.creation-livre button {
  padding: 0.5rem 1rem;
  background-color: #4CAF50;
  color: white;
}
</style>