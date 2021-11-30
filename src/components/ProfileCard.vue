<template>
  <div class="profileCard">
    <div class="profilePicture">
      <img :src="profilePicture" />
    </div>
    <!--Component qui s'affiche dans la page de profil et qui récupère en GET les infos telles que le pseudo, la bio du détenteur du profil, sa photo de profil, etc-->
    <div class="profileContent">
      <div class="pseudo-travellerType">
        <h2 class="affichagePseudo">{{ pseudo.toUpperCase() }}</h2>
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
</template>

<script>
export default {
  data() {
    return {
      prenom: "",
      nom: "",
      description: "",
      visitedCountry: "",
      travellerType: "",
      pseudo: "",
      profilePicture: "",
    };
  },
  //récuperation du token au montage et des différentes infos à afficher sur la card
  async mounted() {
    const usertoken = localStorage.getItem("userToken");
    console.log(usertoken);

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
    console.log("oulah2", data);
    this.prenom = data.firstname;
    this.nom = data.lastname;
    this.description = data.description;
    this.travellerType = data.travellerType;
    this.visitedCountry = data.visitedCountry;
    this.pseudo = data.pseudo;
    this.profilePicture = data.profilePicture;
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
}

.profilePicture img {
  width: 250px;
  height: 250px;
  object-fit: cover;
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
</style>
