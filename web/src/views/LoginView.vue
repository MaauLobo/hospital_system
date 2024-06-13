<template>
  <div class="container">
    <div class="login-box">
      <div class="login-container">
        <LoginForm />
      </div>
      <div class="welcome-container">
        <WelcomeSection />
      </div>
    </div>
  </div>
</template>

<script>
import LoginForm from '@/components/LoginForm.vue';
import WelcomeSection from '@/components/WelcomeSection.vue';

export default {
  name: 'LoginView',
  components: {
    LoginForm,
    WelcomeSection,
  },
};
</script>

<style>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f0f0f0;
}

.login-box {
  display: flex;
  width: 80%;
  max-width: 900px;
  background: white;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  overflow: hidden;
}

.login-container, .welcome-container {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
}

/* Estilos para dispositivos móveis */
@media (max-width: 768px) {
  .login-box {
    flex-direction: column;
    width: 90%;
    max-width: none;
  }

  .welcome-container {
    display: none; /* Ocultar a seção de boas-vindas em telas menores */
  }

  .login-container {
    width: 100%;
  }
}
</style>
