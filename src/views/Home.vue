<template>
  <Navbar buttonName="SE CONNECTER / S'INSCRIRE" />
  <div class="banner">
    <img src="../assets/banner.jpg" />
  </div>
  <!--Appel du composant Articles qui limite l'utlisateur non connecté à la simple vue du contenu sans les likes, les com, ou l'accès à l'agrandissement de l'image-->
  <Articles
    v-for="(element, index) in arrayPosts"
    :key="index"
    :nomArticle="element.lastname"
    :prenomArticle="element.firstname"
    :dateArticle="element.date"
    :titleArticle="element.title"
    :contentArticle="element.content"
    :imageUrl="element.imageUrl"
  />
  <Footer />
</template>

<script>
// Importation des composants
import Articles from "../components/Articles.vue";
import Navbar from "../components/Navbar.vue";
import Footer from "../components/Footer.vue";

export default {
  data() {
    return {
      // tableau des posts
      arrayPosts: [],
    };
  },
  components: {
    Footer: Footer,
    Articles: Articles,
    Navbar: Navbar,
  },
  async mounted() {
    // requete pour recevoir les posts
    const url = "https://dw-s3-nice-tijean.osc-fr1.scalingo.io/posts";

    const response = await fetch(url);
    const dataPosts = await response.json();
    console.log("POST", dataPosts);
    this.arrayPosts = dataPosts.posts;

    console.log(this.arrayPosts);
  },
};
</script>

<style scoped>
.banner img {
  width: 60%;
}
.banner {
  display: flex;
  justify-content: center;
  margin-left: auto;
  margin-right: auto;
}
</style>
