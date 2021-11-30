<template>
  <!--Création du component Footer qui ne changera pas selon la connexion ou non-->
  <div class="footer">
    <p class="footer-info">NOUS CONTACTER</p>
    <p class="copyright">&copy; 2021 - ALL RIGHT RESERVED</p>
  </div>
</template>

<script>
export default {};
</script>

<style>
.footer {
  background: #405e63;
  width: 100%;
  height: 80px;
  color: #cad2c5;
  letter-spacing: 2px;
}

.copyright {
  font-size: 10px;
  text-align: center;
  float: center;
}

.footer-info {
  text-align: right;
  margin-right: 40px;
}
</style>