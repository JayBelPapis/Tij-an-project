<template>
  <!-- Condition si co ou pas 'if'-->
  <div v-if="token">
    <NavbarConnected buttonName="SE DECONNECTER" />
    <div class="container-edit">
      <form class="editProfil">
        <div class="container-nomprenom">
          <div class="container-prenom">
            <label for="prenom" class="uppercase"> prénom* </label><br />
            <input type="text" v-model="prenom" id="prenom" required /><br />
          </div>

          <div class="container-nom">
            <label for="nom" class="uppercase"> nom* </label><br />
            <input type="text" v-model="nom" id="nom" required /><br />
          </div>
        </div>

        <label for="email"> ADRESSE MAIL* </label><br />
        <input type="email" id="email" v-model="email" required /><br />

        <label for="pseudo" class="uppercase"> Pseudo* </label><br />
        <input type="text" v-model="pseudo" id="pseudo" required /><br />

        <label for="password">
          <span class="uppercase">mot de passe*</span> (doit contenir 8
          caractères minimum) : </label
        ><br />
        <input
          id="password"
          type="password"
          v-model="password"
          :class="passwordValidity ? `validforPassword` : `notValidforPassword`"
          required
        /><br />

        <label for="date" class="uppercase"> date de naissance* </label><br />
        <input type="date" v-model="date" id="date" required /><br />

        <label for="gender" class="uppercase"> sexe* </label><br />
        <select name="gender" id="gender" v-model="gender" required>
          <option value="Homme">Homme</option>
          <option value="Femme">Femme</option>
        </select>

        <label for="profilPic" class="uppercase"> choisir ma photo </label
        ><br />
        <input type="file" accept="image/*" @change="downloadImage" />

        <h2 class="uppercase">- rajouter plus d'infos -</h2>

        <label for="description">
          <span class="uppercase">description</span> (maximum 500 caractères) </label
        ><br />
        <textarea
          name="description"
          id="description"
          v-model="description"
          cols="30"
          rows="10"
          maxlength="500"
        ></textarea
        ><br />

        <label for="visitedCountry" class="uppercase">
          pays déjà visité(s) </label
        ><br />
        <input v-model="visitedCountry" type="text" id="visitedCountry" /><br />

        <label for="travellerType" class="uppercase"> type de voyageur </label>
        <select name="travellerType" id="travellerType" v-model="travellerType">
          <option value="Backpacker">Backpacker</option>
          <option value="NormalTourist">Voyageur basique</option>
          <option value="All-In">Voyageur All-In</option>
        </select>

        <!--Evement au clique pour actualiser profil-->
        <button @click="updateClick" class="uppercase">Actualiser</button>
        <!-- Condition qui affiche que le profile maj ok -->
        <div class="message-update" v-show="update == true">
          Votre profile a bien été mis à jour
        </div>
      </form>
    </div>
  </div>

  <!--Suite condition 'else'-->
  <div v-else>
    <Navbar buttonName="SE CONNECTER" />
    <p class="message-erreur">
      OH OH... VOUS DEVEZ ÊTRE CONNECTE POUR ACCEDER A CETTE PAGE
    </p>
  </div>
  <Footer />
</template>

<script>
// appel des composants
import NavbarConnected from "../components/NavbarConnected.vue";
import Footer from "../components/Footer.vue";
import Navbar from "../components/Navbar.vue";

export default {
  components: {
    NavbarConnected: NavbarConnected,
    Footer: Footer,
    Navbar: Navbar,
  },

  data() {
    return {
      token: true,
      nom: "",
      prenom: "",
      pseudo: "",
      password: "",
      email: "",
      date: "",
      gender: "",
      description: "",
      visitedCountry: "",
      travellerType: "",
      age: "",
      profilePicture: null,
      update: false,
    };
  },
  computed: {
    // forcer password a plus de 8 caractère
    passwordValidity() {
      return this.password.length >= 8 && this.password.length <= 16;
    },
  },

  async mounted() {
    // recupération token dans local storage
    const usertoken = localStorage.getItem("userToken");
    console.log(usertoken);
    this.token = usertoken;

    //requete information utilisateur
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + usertoken,
      },
    };

    const url = "https://dw-s3-nice-tijean.osc-fr1.scalingo.io/user";
    const response = await fetch(url, options);
    var data = await response.json();
    console.log("oulah", data);

    //recupération d'information pour les datas
    this.prenom = data.firstname;
    this.nom = data.lastname;
    this.email = data.email;
    this.pseudo = data.pseudo;
    this.description = data.description;
    this.gender = data.gender;
    this.visitedCountry = data.visitedCountry;
    this.travellerType = data.travellerType;
    this.profilePicture = data.profilePicture;
    this.age = data.age;
  },

  methods: {
    async updateClick() {
      //evenement au clique pour update profile utilisateur
      const usertoken = localStorage.getItem("userToken");
      const options = {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + usertoken,
        },
        body: JSON.stringify({
          firstname: this.prenom,
          lastname: this.nom,
          email: this.email,
          pseudo: this.pseudo,
          description: this.description,
          gender: this.gender,
          visitedCountry: this.visitedCountry,
          travellerType: this.travellerType,
          age: this.age,
          profilePicture: this.profilePicture,
        }),
      };

      const url = "https://dw-s3-nice-tijean.osc-fr1.scalingo.io/user";
      const response = await fetch(url, options);
      const data = await response.json();
      console.log("update", data);
      this.update = data.success;
      console.log(this.update);
    },

    //encodage image base 64
    downloadImage(e) {
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
.validforPassword {
  border: grey solid 1px;
  border-radius: 2px;
}
.notValidforPassword {
  border: red solid 2px;
}

.uppercase {
  text-transform: uppercase;
}

.no-deco {
  text-decoration: none;
  color: black;
}

.container-edit {
  display: flex;
  justify-content: center;
  margin: 0 auto 100px auto;
  width: 650px;
  box-shadow: 4px 8px 16px 10px rgba(175, 175, 175, 0.75);
  padding: 50px;
  color: #405e63;
  background-color: #cad2c5;
}
input {
  padding: 5px;
  width: 582px;
  height: 30px;
  border: none;
  margin: 10px 0;
  outline: none;
}

textarea {
  padding: 5px;
  width: 582px;
  height: 160px;
  border: none;
  margin: 10px 0;
  outline: none;
}

label {
  margin-left: 10px;
}

.container-nomprenom {
  display: flex;
}

.container-nom {
  margin-left: 10px;
}

.container-nom input,
.container-prenom input {
  width: 280px;
}
button {
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
  font-weight: 800;
}
.error-message {
  text-align: center;
  font-size: 12px;
  color: red;
}

.message-update {
  text-align: center;
  font-weight: 400;
  color: red;
  font-size: 13px;
}
</style>
