<template>
  <Navbar buttonName="SE CONNECTER / S'INSCRIRE" />
  <div class="container-connexion">
    <div class="connexion">
      <label for="id">IDENTIFIANT</label><br />
      <input type="email" v-model="email" name="id" class="input-text" /><br />

      <label for="password">MOT DE PASSE</label><br />
      <input
        type="password"
        v-model="password"
        name="password"
        class="input-text"
        @keyup.enter="btnConnexion"
      /><br />

      <div class="rememberme-container">
        <div class="checkbox"><input type="checkbox" id="checkbox" /></div>
        <br />
        <div class="rememberme-text"><p>SE SOUVENIR DE MOI</p></div>
      </div>
      <p class="error-message">{{ messageError }}</p>
      <router-link to="/seconnecter"
        ><button @click="btnConnexion">CONNEXION</button></router-link
      ><br />

      <router-link to="/formulaire-inscription"
        ><p class="register-text">
          Je n'ai pas de compte / S'inscrire
        </p></router-link
      >
    </div>
  </div>

  <Footer />
</template>

<script>
//importation de la NavBar et du Footer depuis les components
import Navbar from "../components/Navbar.vue";
import Footer from "../components/Footer.vue";

export default {
  data() {
    //initialisation des éléments suivants:
    return {
      email: "",
      password: "",
      messageError: "",
      token: "",
      status: "",
    };
  },

  //déclaration des components importés préalablement
  components: {
    Navbar: Navbar,
    Footer: Footer,
  },

  //création de la methode asynchrone liée au bouton de connexion
  methods: {
    async btnConnexion() {
      const url = "https://dw-s3-nice-tijean.osc-fr1.scalingo.io/login";
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: this.email,
          password: this.password,
        }),
      };

      const response = await fetch(url, options);
      const dataLogin = await response.json();

      console.log("data AAH", dataLogin);

      this.messageError = dataLogin.message;
      //recuperation du token
      this.token = dataLogin.token;
      //stockage du token
      localStorage.setItem("userToken", this.token);
      console.log(this.token);
      this.status = dataLogin.success;
      localStorage.setItem("successStatuts", this.status);

      //condition IF le compte est bien reconnu comme connecté (dataLogin.success=true)
      if (this.status == true) {
        this.$router.push({ name: "HomeConnected" });
        return;
      }
    },
  },
};
</script>

<style scoped>
.container-connexion {
  text-align: left;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
  margin: 8% auto 100px auto;
  height: 100%;
  width: 500px;
  box-shadow: 4px 8px 16px 10px rgba(175, 175, 175, 0.75);
  padding: 50px;
  color: #405e63;
  font-weight: 400;
}
.input-text {
  padding: 5px;
  width: 480px;
  height: 30px;
  border: none;
  margin: 10px 0;
  outline: none;
}
label {
  margin-left: 10px;
}

.rememberme-container {
  display: flex;
}
.rememberme-text p {
  margin: 0;
  padding-left: 15px;
  color: white;
  letter-spacing: 2px;
  font-size: 13px;
}
.connexion button {
  display: block;
  margin: 20px auto 0 auto;
  margin-right: auto;
  margin-left: auto;
  pointer-events: auto;
  background-color: white;
  border: none;
  color: 405e63;
  padding: 5px 80px;
  color: #405e63;
  font-family: "Montserrat", sans-serif;
  font-weight: 600;
}

a {
  text-decoration: none;
}
.register-text {
  text-align: center;
  color: #405e63;
  margin-top: -15px;
  font-size: 14px;
}
.error-message {
  text-align: center;
  font-size: 12px;
  color: red;
}
</style>