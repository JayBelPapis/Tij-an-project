<template>
  <div v-if="token">
    <NavbarConnected buttonName="SE DECONNECTER" />
    <div class="fullProfilePage">
      <!--Mise en place des components ProfileCard (qui résume brièvement les infos du profil) et CreatePost (qui permet d'ajouter du contenu a sa page) -->
      <ProfileCard></ProfileCard>
      <CreatePost></CreatePost>
      <!--Mise en place du component ArticlesConnected avec une boucle v-for et ses props-->
      <ArticlesConnected
        v-for="(element, index) in arrayPosts"
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
        :imageUrl="element.imageUrl"
      />
    </div>
  </div>
  <div v-else>
    <Navbar buttonName="SE CONNECTER" />
    <MessageErreur />
  </div>
  <Footer />
</template>


<script>
import NavbarConnected from "../components/NavbarConnected.vue";
import Navbar from "../components/Navbar.vue";
import Footer from "../components/Footer.vue";

import ProfileCard from "../components/ProfileCard.vue";
import CreatePost from "../components/CreatePost.vue";
import ArticlesConnected from "../components/ArticlesConnected.vue";
import MessageErreur from "../components/MessageErreur.vue";

export default {
  props: {
    userId: String,
  },
  data() {
    return {
      token: true,
      id: "",
      arrayPosts: [],
    };
  },
  components: {
    ProfileCard: ProfileCard,
    CreatePost: CreatePost,
    NavbarConnected: NavbarConnected,
    Navbar: Navbar,
    Footer: Footer,
    ArticlesConnected: ArticlesConnected,
    MessageErreur: MessageErreur,
  },
  async mounted() {
    //requete pour recuperer posts au montage de la page
    const url = "https://dw-s3-nice-tijean.osc-fr1.scalingo.io/posts";

    const response = await fetch(url);
    const dataPosts = await response.json();
    console.log("POST", dataPosts);
    this.arrayPosts = dataPosts.posts;

    console.log("coucou", this.arrayPosts);

    const userToken = localStorage.getItem("userToken");
    this.token = userToken;
  },
};
</script>

<style scoped>
</style>
