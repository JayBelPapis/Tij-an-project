<template>
  <!--Compteur de like qui sera declaré dans les articles, qui met une class selon une condition rempli ou non -->
  <div class="likeCounter">
    <img
      src="../assets/like.png"
      class="likeButton"
      alt="like"
      @click="likeCounter"
      :class="likeButton ? 'likeClick' : 'notClick'"
      v-on:click="clicked = 1"
    />
    <p>{{ LikeNumber }} likes</p>
  </div>
</template>

<script>
export default {
  props: {
    postId: String,
    initialLikeNumber: Number,
    like: String,
  },
  data: function () {
    return {
      LikeNumber: this.initialLikeNumber,
      clicked: false,
    };
  },

  computed: {
    likeButton() {
      return this.LikeNumber > "0";
    },
  },

  //methods qui permettra de liker un article.
  methods: {
    async likeCounter() {
      const usertoken = localStorage.getItem("userToken");
      const url = "https://dw-s3-nice-tijean.osc-fr1.scalingo.io/post/like";

      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + usertoken,
        },

        body: JSON.stringify({
          postId: this.postId,
        }),
      };

      const response = await fetch(url, options);
      const data = await response.json();
      console.log("LikeNumber", data);

      //Si on est connecté (data.success=true) le compteur ajoute +1
      if (data.success) {
        this.LikeNumber++;
      }
    },
  },
};
</script>

<style>
.likeButton {
  cursor: pointer;
  width: 25px;
  height: 25px;
  margin: 10px;
}

.likebutton :active {
  width: 30px;
  height: 30px;
}

.likeCounter {
  display: flex;
  flex-direction: row;
}

.likeClick {
  background-color: rgb(185, 0, 0);
}

.notClick {
  background-color: white;
}
</style>
