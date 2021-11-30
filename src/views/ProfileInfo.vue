<template>
  <NavbarConnected buttonName="SE DECONNECTER" />

  <div class="profileCard">
    <div class="profileContent">
      <div class="pseudo-travellerType">
        <h2 class="affichagePseudo">
          {{ firstname }} <span class="uppercase">{{ lastname }}</span>
        </h2>
        <p class="affichageTravellerTypeValue"></p>
      </div>
      <p class="description">
        {{ description }}
      </p>

      <p class="affichageVisitedCountry">
        <b>PAYS VISITE(S):</b> {{ visitedCountry }}<br />
        <b>TYPE DE VOYAGEUR:</b> {{ travellerType }}
      </p>
    </div>
  </div>

  <Footer />
</template>

<script>
//importation des components Footer et NavBarConnected (Car on accède à la section ProfileInfo seulement lorsqu'on est connectés)
import Footer from "../components/Footer.vue";
import NavbarConnected from "../components/NavbarConnected.vue";
export default {
  props: {
    userId: String,
  },

  // initialisation des éléments suivants dans les data properties
  data() {
    return {
      lastname: "",
      firstname: "",
      description: "",
      visitedCountry: "",
      travellerType: "",
    };
  },
  components: {
    NavbarConnected: NavbarConnected,
    Footer: Footer,
  },

  //au montage de la page, récuperation du token et des éléments ci-dessous
  async mounted() {
    const token = localStorage.getItem("userToken");
    console.log("tk", token);

    const url =
      "https://dw-s3-nice-tijean.osc-fr1.scalingo.io/user/" + this.userId;
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    };
    const response = await fetch(url, options);
    const data = await response.json();
    console.log("oups", data);
    this.firstname = data.firstname;
    this.lastname = data.lastname;
    this.description = data.description;
    this.visitedCountry = data.visitedCountry;
    this.travellerType = data.travellerType;
  },
};
</script>

<style scoped>
.profileCard {
  font-weight: 400;
  display: flex;
  width: 80%;
  padding: 20px 40px;
  background-color: white;
  justify-content: center;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 250px;
}

.profilePicture img {
  border-radius: 50%;
  display: flex;
}

.profilePicture {
  display: flex;
  justify-content: center;
  align-items: center;
}

.profileContent {
  display: flex;
  flex-direction: column;
  margin-left: 50px;
  justify-content: center;
}

.affichagePseudo {
  color: #415e64;
  margin-left: 40px;
}
.uppercase {
  text-transform: uppercase;
}
</style>