<template>
  <div class="login-form">
    <h2>LOGIN</h2>
    <form @submit.prevent="handleLogin">
      <div class="input-group">
        <input type="text" id="username" placeholder="Usuário" />
      </div>
      <div class="input-group">
        <input type="password" id="password" placeholder="Senha" />
      </div>
      <div class="actions">
        <div class="remember-me">
        </div>
      </div>
      <button type="submit"><span>LOGIN</span></button>
    </form>
  </div>
</template>

<script>
export default {
  name: 'LoginForm',
  methods: {
    handleLogin() {
      // Aqui você pode adicionar a lógica de autenticação
      // Se a autenticação for bem-sucedida, redirecione para a rota "home"
      this.$router.push({ name: 'dashboard' });
    }
  }
};
</script>

<style scoped>
.login-form {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px;
  text-align: center;
}

h2 {
  font-size: 2em;
  margin-bottom: 20px;
  color: rgb(0, 0, 0); /* Mudar a cor do texto do título para branco */
}

.input-group {
  width: 100%;
  margin-bottom: 20px;
}

.input-group input {
  width: 100%;
  padding: 10px;
  font-size: 1em;
  border: none;
  border-radius: 5px;
  background-color: #D9D9D9; /* Cor de fundo cinza */
}

.actions {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-bottom: 20px;
}

.actions .remember-me {
  display: flex;
  align-items: center;
}

.actions .remember-me input {
  margin-right: 5px;
}

.actions a {
  font-size: 0.9em;
  color: #00796b;
  text-decoration: none;
}

button {
  position: relative;
  padding: 10px 20px;
  font-size: 1em;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  width: 100%;
  overflow: hidden;
  transition: color 0.4s ease, background 0.4s ease;
}

button::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(to right, #4385A8, #136692);
  z-index: 0;
  transition: transform 0.4s ease, background 0.4s ease;
  transform: scaleX(1);
  transform-origin: left;
}

button:hover::before {
  transform: scaleX(0);
  transform-origin: left;
}

button:hover {
  color: #136692;
  background: none;
  border: 2px solid #136692;
}

button span {
  position: relative;
  z-index: 1;
  color: inherit; /* Permite a mudança de cor no hover */
}
</style>
