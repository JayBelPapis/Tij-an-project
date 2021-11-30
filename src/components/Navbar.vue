<template>
  <!--NavBar lorsqu'on est pas connecté qui propose des fonctionnalités réduites mais importantes comme la possibilité d'accéder à la page de connexion/création de compte-->
  <div id="nav">
    <img src="../assets/logo.png" />
    <div class="boutons">
      <div class="btn-home">
        <router-link to="/"> HOME </router-link>
      </div>
      <div class="btn-co">
        <router-link to="/seconnecter">
          {{ buttonName }}
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
};
</script>

<style>
#nav {
  display: flex;
  flex-direction: row;
  background-image: url("../assets/bg-navbar.jpg");
  background-size: cover;
  position: fixed;
  top: 0;
  height: 100px;
  width: 100%;
}

#nav img {
  left: 0;
  margin-left: 40px;
  display: flex;
  width: 200px;
  position: absolute;
  top: 20px;
}

#nav a {
  background-color: #cad2c5;
  padding: 10px 40px;
  font-weight: 200;
  text-decoration: none;
  color: #405e63;
  width: 250px;
}

#nav a.router-link-exact-active {
  border-top: 4px solid white;
}
.boutons {
  margin: 71px 5px 5px 280px;
  display: flex;
}

.btn-home,
.btn-co,
.btn-edit,
.btn-profile {
  margin-left: 10px;
}

@media screen and (min-width: 200px) and (max-width: 640px) {
  #nav img {
    display: none;
  }
  #nav {
    background-image: url("../assets/bg-navbar-mob.jpg");
  }
  .boutons {
    margin: 71px 5px 5px 20px;
  }
}
</style>