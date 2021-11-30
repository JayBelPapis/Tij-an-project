<template>
  <!--Component appelé en cas de tentative d'accès à une section non autorisé (Qui requiert une connexion) par un utilisateur non connecté-->
  <p class="message-erreur">
    OH OH... VOUS DEVEZ ÊTRE CONNECTE POUR ACCEDER A CETTE PAGE
  </p>
</template>

<script>
export default {};
</script>

<style scoped>
.message-erreur {
  background-color: white;
  height: 150px;
  width: 800px;
  display: flex;
  margin-left: auto;
  margin-right: auto;
  align-items: center;
  justify-content: center;
  color: red;
  margin-bottom: 500px;
}
</style>