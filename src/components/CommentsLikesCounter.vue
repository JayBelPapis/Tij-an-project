<template>
  <div class="commentsLikesCounter">
    <!--EN CONSTRUCTION : BOUTON QUI POURRA PERMETTRE DE LIKER LES COMMENTAIRES LORSQUE L'API LE PERMETTRA-->
    <img
      src="../assets/like.png"
      class="likeButton"
      alt="like"
      @click="commentsLikesCounter"
    />
    <p>{{ commentsLikesNumber }} likes</p>
  </div>
</template>

<script>
export default {
  props: {
    postId: String,
    initialCommentsLikesNumber: Number,
    like: String,
  },
  data: function () {
    return {
      commentsLikesNumber: this.initialCommentsLikesNumber,
    };
  },

  methods: {
    async commentsLikesCounter() {
      const usertoken = localStorage.getItem("userToken");
      const url =
        "https://dw-s3-nice-tijean.osc-fr1.scalingo.io/post/comment/like";

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
      console.log("commentsLikesCounter", data);

      if (data.success) {
        this.commentsLikesNumber++;
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

.commentsLikesCounter {
  display: flex;
  flex-direction: row;
}
</style>
