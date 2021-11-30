<template>
  <<!--Component qui permet de saisir un commentaire sur un article et de l'afficher -->
  <div class="container-editcomment">
    <textarea
      placeholder="Ecrivez votre commentaire"
      v-model="textareaCom"
    ></textarea
    ><br />
    <<!--Appel de la method au clic qui permet de Poster un commentaire  -->
    <button @click="sendCom">ENVOYER</button>
  </div>
  <div class="container-commentaires">
    <p>fezfezfz</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      textareaCom: "",
      arrayPosts: [],
      arrayComments: [],
    };
  },

  //Création de la method liée au clic
  methods: {
    async sendCom() {
      const usertoken = localStorage.getItem("userToken");

      const url = "https://dw-s3-nice-tijean.osc-fr1.scalingo.io/post/comment";
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + usertoken,
        },
        body: JSON.stringify({
          postId: this.postId,
          content: this.textareaCom,
        }),
      };

      const response = await fetch(url, options);
      const data = await response.json();
      console.log("datacomm", data);
    },
  },
};
</script>

<style>
</style>