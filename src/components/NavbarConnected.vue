<template>
  <!--NavBar qui sera affichée lorsqu'on est connectée, et qui propose un menu de navigation plus adapté aux interactions (Accès au profil, à l'édition, la déconnection-->
  <div id="nav">
    <img src="../assets/logo.png" />
    <div class="boutons">
      <div class="btn-home">
        <router-link to="/connected"> HOME </router-link>
      </div>

      <div class="btn-profile">
        <router-link to="/profile"> PROFIL </router-link>
      </div>

      <div class="btn-edit">
        <router-link to="/edit-profile"> EDIT </router-link>
      </div>

      <div class="btn-co">
        <!--Appel de la method au clic, et redirection vers la page de connexion-->
        <router-link to="/seconnecter">
          <span @click="clearLs">{{ buttonName }}</span>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    buttonName: String,
  },

  //methods appelée au clic sur "Se deconnecter" qui permet d'effacer le token du local storage
  methods: {
    clearLs() {
      localStorage.removeItem("userToken");
    },
  },
};
</script>

<style scoped>
</style>