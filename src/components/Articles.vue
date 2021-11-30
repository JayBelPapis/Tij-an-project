<template>
  <!--Version du component article (qui sera appelé en view Home.vue) lorsqu'on est pas connecté (Qui propose donc des fonctionnalités limités)-->
  <div class="container">
    <div class="container-article">
      <div class="container-entete">
        <div class="container-id">
          <p class="identite">
            {{ nomArticle.toUpperCase() }} {{ prenomArticle }}
          </p>
          <p class="date">{{ dateArticle }}</p>
        </div>
      </div>
      <div class="container-decription">
        <div class="container-titre">
          <p>{{ titleArticle }}</p>
        </div>
        <div
          class="container-content"
          style="overflow-y: scroll; height: 250px"
        >
          <p>{{ contentArticle }}</p>
        </div>
      </div>
    </div>
    <div class="container-photos">
      <img :src="imageUrl" class="btn btn-success" />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    nomArticle: String,
    prenomArticle: String,
    dateArticle: String,
    titleArticle: String,
    contentArticle: String,
    imageUrl: String,
  },
  data() {
    return {
      arrayPosts: [],
    };
  },
};
</script>
<style>
.container {
  display: flex;
  margin-left: auto;
  margin-right: auto;
  background-color: white;
  width: 80%;
  padding: 40px;
  font-family: "Montserrat", sans-serif;
  margin-top: 30px;
}
.container-article {
  text-align: left;
  width: 135vh;
  color: #415e64;
  font-weight: 300;
}
::-webkit-scrollbar {
  width: 10px;
}
::-webkit-scrollbar-track {
  background: #f1f1f1;
}
::-webkit-scrollbar-thumb {
  background: #4a696e;
}
::-webkit-scrollbar-thumb:hover {
  background: #679299;
}
img.btn.btn-success {
  width: 265px;
  height: 390px;
  object-fit: cover;
}
.container-entete {
  background-color: #eeeeee;
  display: flex;
  margin-right: 40px;
}
.photo-profile img {
  width: 80px;
  border-radius: 50%;
}
.container-id {
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 20px;
}
.identite {
  font-weight: 600;
  margin: 0;
  cursor: pointer;
}
.date {
  font-size: 13px;
  margin: 0;
}
.container-decription {
  font-size: 14px;
  padding: 20px 40px 20px 0px;
}
.container-titre {
  text-transform: uppercase;
  text-decoration: underline;
  margin-left: 80px;
  font-weight: bold;
}
</style>
