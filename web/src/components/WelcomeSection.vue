<template>
  <div class="welcome-section">
    <img src="@/assets/doctors-animate.svg" alt="Doctors Illustration" />
    <h2>Bem Vindo ao Prosel !</h2>
    <p>Sistema de Macas  projetado para revolucionar a maneira como as demandas e chamados são administrados e gerenciados em ambientes hospitalares.</p>
  </div>
</template>

<script>
export default {
  name: 'WelcomeSection',
};
</script>

<style scoped>
.welcome-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  text-align: center;
  background: linear-gradient(to right, #4385A8, #136692); /* Gradiente de fundo */
  color: white;
}

img {
  max-width: 100%;
  height: auto;
  margin-bottom: 10px; /* Diminua o espaço inferior */
}

h2 {
  font-size: 2em; /* Aumentar tamanho da fonte */
  margin-bottom: 10px;
}

p {
  font-size: 1em;
  margin-bottom: 20px;
}
</style>
