<template>
<Navbar
    buttonName="SE CONNECTER"/>
  <div class="container-form">
    <form>
      <div class="container-nomprenom">
        <div class="container-prenom">
          <label for="prenom">PRENOM*</label><br />
          <input
            id="prenom "
            type="text"
            v-model="prenomLog"
            placeholder="Votre prenom"
            required
          /><br />
        </div>
        <div class="container-nom">
            <label for="nom">NOM*</label><br />
          <input
            id="nom"
            type="text"
            v-model="nomLog"
            placeholder="Votre nom"
            required
          /><br />
        </div>
      </div>

      <label for="email">ADRESSE MAIL*</label><br />
      <input
        id="email"
        type="mail"
        v-model="emailLog"
        placeholder="Votre adresse mail"
        required
      /><br />

      <label for="pseudo">PSEUDO*</label><br />
      <input
        id="pseudo"
        type="text"
        v-model="pseudoLog"
        placeholder="Votre pseudo"
        required
      /><br />

      <label for="password">MOT DE PASSE (Doit contenir 8 caracteres minimum)</label><br />
      <input
        id="password"
        type="password"
        v-model="passwordLog"
        placeholder="Votre mot de passe"
        :class="passwordValidity ? `valid` : `notValid`"
        required
      /><br />

      <label for="dateDeNaissance">DATE DE NAISSANCE</label>
      <input
        type="date"
        id="dateDeNaissance"
        v-model="birth"
        :class="birthValidity ? `valid` : `notValid`"
      />

      <p>SEXE</p>
      <select v-model="sexeLog">
        <option disabled value="">Sexe</option>
        <option>Masculin</option>
        <option>Feminin</option></select
      ><br />
      <p>Ajoutez votre photo de profil :</p>

      <input type="file" accept="image/*" @change="downloadImage"/>

      <p class="error-message">{{messageError}}</p>
      <router-link to="seconnecter">
        <button @click="btnLogin">S'INSCRIRE</button>
      </router-link>
    </form>
  </div>
  <Footer/>

</template>

<script>
// importation composants
import Navbar from "../components/Navbar.vue";
import Footer from "../components/Footer.vue";

export default {
  data() {
    return {
      prenomLog: "",
      nomLog: "",
      emailLog: "",
      pseudoLog: "",
      passwordLog: "",
      birth: "",
      sexeLog: "",
      messageError: "",
      selectedFile: null,
      profilePicture: null,
    };
  },
  components: {
    Navbar: Navbar,
    Footer: Footer,
  },
  computed: {
    // password >8 caractères
    passwordValidity() {
      return this.passwordLog.length >= 8 && this.passwordLog.length <= 16;
    },

    // age > 18
    birthValidity() {
      const currentDate = new Date();
      let customerDate = new Date(this.birth);
      customerDate = new Date(
        customerDate.getFullYear() + 18,
        customerDate.getMonth(),
        customerDate.getDay()
      );
      return currentDate >= customerDate;
    },
  },

  methods: {
    async btnLogin() {
      //requete pour créer un utilisateur
      const url = "https://dw-s3-nice-tijean.osc-fr1.scalingo.io/register";
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstname: this.prenomLog,
          lastname: this.nomLog,
          email: this.emailLog,
          pseudo: this.pseudoLog,
          password: this.passwordLog,
          datedenaissance: this.birthdayLog,
          gender: this.sexeLog,
          profilePicture: this.profilePicture
        }),
      };

      const response = await fetch(url, options);
      const dataLogin = await response.json();
      console.log(dataLogin);

      this.messageError = dataLogin.message;
    },

    // encodage photo de profile base 64
    downloadImage(e){
      const image = e.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(image);
      reader.onload = (e) => {
        this.profilePicture = e.target.result;
        console.log(this.profilePicture);
      };
    },

  },
};

</script>

<style scoped>
.valid {
  border: grey solid 1px;
  border-radius: 2px;
}
.notValid {
  border: red solid 2px;
}


.container-form{
  display: flex;
  justify-content: center;
  margin: 0 auto 100px auto;
  width: 650px;
  box-shadow: 4px 8px 16px 10px rgba(175,175,175,0.75);
  padding: 50px;
  color: #405e63;
  background-color: #cad2c5;
}
input{
  padding: 5px;
  width: 582px;
  height: 30px;
  border: none;
  margin: 10px 0;
  outline: none;
}

label{
  margin-left: 10px;
}

.container-nomprenom{
  display: flex;
}

.container-nom{
    margin-left: 10px;
}

.container-nom input, .container-prenom input{
  width: 280px;
}
button{
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
  font-family: 'Montserrat', sans-serif;
  font-weight: 800;
}
.error-message{
  text-align: center;
  font-size: 12px;
  color: red;
}

</style>