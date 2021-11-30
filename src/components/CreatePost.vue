<template>
  <div class="container-create-input">
    <div class="input">
      <input
        type="text"
        name="title"
        id="title"
        placeholder="Votre titre ici..."
        v-model="title"
      /><br />
    </div>
  </div>
  <div class="container">
    <div class="container-create-textarea">
      <textarea
        name="description"
        id="description"
        v-model="content"
        placeholder="Ecrivez votre nouveau post..."
      ></textarea
      ><br />
      <div class="inputFile">
        <input
          type="file"
          @change="downloadPicture"
          class="custom-file-input"
        />
      </div>
    </div>
  </div>
  <div class="container-btn">
    <button @click="btnSend">ENVOYER</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      title: "",
      content: "",
      imageUrl: null,
    };
  },
  methods: {
    async btnSend() {

      const usertoken = localStorage.getItem("userToken");
      console.log("LS TOKEN", usertoken);

      const url = "https://dw-s3-nice-tijean.osc-fr1.scalingo.io/post";
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "bearer " + usertoken,
        },
        body: JSON.stringify({
          title: this.title,
          content: this.content,
          image: this.imageUrl,
        }),
      };

      const response = await fetch(url, options);
      const dataPosts = await response.json();
      console.log("dataPosts", dataPosts);
      this.content = "";
      this.title = "";
      window.location.reload();

    },
    downloadPicture(e) {
      const imagePost = e.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(imagePost);
      reader.onload = (e) => {
        this.imageUrl = e.target.result;
        console.log("ok", this.imageUrl);
      };

    },
  },
};
</script>

<style scoped>
.container {
  flex-direction: column;
  display: flex;
  justify-content: center;
  padding: 0;
  width: 80%;
  padding: 15px 40px;
}
.container-create {
  margin-left: auto;
  margin-right: auto;
}
.container-create-input {
  margin-top: 30px;
  display: flex;
  justify-content: center;
}

.input {
  width: 100%;
  display: flex;
  justify-content: center;
}

.input input {
  width: 50%;
  height: 30px;
  padding-left: 20px;
  border: none;
  outline: none;
  font-family: "Montserrat", sans-serif;
}

.container-btn button {
  display: block;
  margin: 20px auto 0 auto;
  margin-right: auto;
  margin-left: auto;
  pointer-events: auto;
  background-color: #415e64;
  border: none;
  color: 405e63;
  padding: 10px 80px;
  color: #cad2c5;
  font-family: "Montserrat", sans-serif;
  font-weight: 400;
  letter-spacing: 2px;
}

.container-create-textarea textarea {
  display: block;
  pointer-events: auto;
  background-color: white;
  border: none;
  outline: none;
  color: #405e63;
  font-family: "Montserrat", sans-serif;
  font-weight: 400;
}
textarea#description {
  width: 98%;
}

.input-file {
  display: flex;
}

.custom-file-input::-webkit-file-upload-button {
  visibility: hidden;
}
.custom-file-input::before {
  content: "SELECTIONNER VOTRE PHOTO";
  display: inline-block;
  background-color: #cad2c5;
  border: none;
  border-radius: 3px;
  padding: 10px 10px;
  outline: none;
  cursor: pointer;
  font-weight: 700;
  font-size: 10pt;
  color: #405e63;
  font-family: "Montserrat", sans-serif;
  font-weight: 400;
  
}
.custom-file-input:hover::before {
  border-color: black;
}
.custom-file-input:active::before {
  background: -webkit-linear-gradient(top, #e3e3e3, #f9f9f9);
}
</style>