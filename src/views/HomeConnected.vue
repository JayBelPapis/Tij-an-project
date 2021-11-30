<template>
  <!-- condition d'affichage si connecté ou pas "if"-->
  <div v-if="token">
    <NavbarConnected buttonName="DECONNECTER" />
    <!--Implémentation d'une NavBar qui permet de chercher et filter les articles par le titre-->
    <div class="search-bar">
      <label for="search">Où voulez-vous voyager?</label><br />
      <input type="search" v-model="searchInput" @keyup.enter="filterInput" />
    </div>
    <CreatePost />
    <div class="article">
      <!--Appel du composant ArticlesConnected avec une boucle v-for et ses props, qui permet, cette fois, à l'utilisateur de voir les coms, likes, photos-->
      <ArticlesConnected
        v-for="(element, index) in filterInput"
        :key="index"
        :nomArticle="element.lastname"
        :prenomArticle="element.firstname"
        :dateArticle="element.date"
        :titleArticle="element.title"
        :contentArticle="element.content"
        :postId="element._id"
        :comments="element.comments"
        :likes="element.likes"
        :userId="element.userId"
        :commentsLikes="element.comments.likes"
        :imageUrl="element.imageUrl"
      />
    </div>
  </div>

  <!-- Suite condition "else"-->
  <div v-else>
    <Navbar buttonName="SE CONNECTER" />
    <MessageErreur />
  </div>

  <Footer />
</template>

<script>
// Importation des composants
import ArticlesConnected from "../components/ArticlesConnected.vue";
import Footer from "../components/Footer.vue";
import NavbarConnected from "../components/NavbarConnected.vue";
import CreatePost from "../components/CreatePost.vue";
import Navbar from "../components/Navbar.vue";
import MessageErreur from "../components/MessageErreur.vue";

export default {
  props: {
    userId: String,
  },

  components: {
    Footer: Footer,
    NavbarConnected: NavbarConnected,
    ArticlesConnected: ArticlesConnected,
    CreatePost: CreatePost,
    Navbar: Navbar,
    MessageErreur: MessageErreur,
  },
  data() {
    return {
      arrayPosts: [],
      token: true,
      searchInput: "",
    };
  },

    async mounted(){
        //requete pour afficher les posts
        const url = "https://dw-s3-nice-tijean.osc-fr1.scalingo.io/posts?limit=10"

    const response = await fetch(url);
    const dataPosts = await response.json();
    this.arrayPosts = dataPosts.posts;
    console.log("coucou", this.arrayPosts);

    // recupération du token dans le local storage
    const token = localStorage.getItem("userToken");
    this.token = token;
    console.log(token);
  },
  computed: {
    //fonction pour barre de recherche
    filterInput() {
      return this.arrayPosts.filter((element) => {
        return element.title
          .toLowerCase()
          .includes(this.searchInput.toLowerCase());
      });
    },
  },
};
</script>

<style>
textarea {
  resize: none;
  width: 400px;
  height: 250px;
}
.search-bar {
  position: fixed;
  top: 30px;
  right: 5%;
  text-align: center;
  font-family: "Montserrat", sans-serif;
  font-weight: 800;
  color: white;
}

.search-bar input {
  margin-top: 5px;
}
</style>