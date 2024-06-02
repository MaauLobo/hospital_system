<template>
    <div class="welcome-section">
      <img src="@/assets/doctors-animate.svg" alt="Doctors Illustration" />
      <h2>Olá, Doutor!</h2>
      <p>Administre e gerencie suas demandas e chamados com mais agilidade e eficiencia.</p>
      <button><span>CADASTRAR-SE</span></button>
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
  
  button {
    position: relative;
    padding: 10px 20px;
    font-size: 1em;
    color: #ffffff; /* Cor do texto */
    background: none; /* Sem fundo */
    border: 2px solid #ffffff; /* Borda */
    border-radius: 5px;
    cursor: pointer;
    overflow: hidden;
    transition: background-color 0.4s ease, color 0.4s ease;
  }
  
  button::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: #ffffff;
    z-index: 0;
    transform: scaleX(0);
    transform-origin: left;
    transition: transform 0.4s ease;
  }
  
  button:hover::before {
    transform: scaleX(1);
    transform-origin: left;
  }
  
  button:hover {
    color: #4385A8;
  }
  
  button span {
    position: relative;
    z-index: 1;
    color: inherit; /* Permite a mudança de cor no hover */
  }
  </style>
  