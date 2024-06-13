<template>
  <div class="login-form">
    <img src="@/assets/logo-prosel1.png" alt="Logo do Sistema" class="logo" />
    <h2>LOGIN</h2>
    <form @submit.prevent="handleLogin">
      <div class="input-group">
        <input type="text" v-model="username" id="username" placeholder="Usuário" />
      </div>
      <div class="input-group">
        <input :type="showPassword ? 'text' : 'password'" v-model="password" id="password" placeholder="Senha" />
        <span class="password-toggle" @click="togglePasswordVisibility">
          <i :class="showPassword ? 'fas fa-eye-slash' : 'fas fa-eye'"></i>
        </span>
      </div>
      <div class="actions">
        <div class="remember-me">
          <!-- Checkbox para lembrar-me pode ser adicionado aqui -->
        </div>
      </div>
      <button type="submit"><span>LOGIN</span></button>
    </form>
  </div>
</template>

<script>
import axios from 'axios';
import Swal from 'sweetalert2';

export default {
  name: 'LoginForm',
  data() {
    return {
      username: '',
      password: '',
      showPassword: false
    };
  },
  methods: {
    togglePasswordVisibility() {
      this.showPassword = !this.showPassword;
    },
    async handleLogin() {
      try {
        console.log(`Tentando login com username: ${this.username} e password: ${this.password}`);
        const response = await axios.post('https://api-hospital-8shg.onrender.com/login', {
          username: this.username,
          password: this.password
        });

        if (response.data.authenticated) {
          localStorage.setItem('token', response.data.token);
          Swal.fire({
            toast: true,
            position: 'top-right',
            icon: 'success',
            title: 'Login efetuado com sucesso!',
            showConfirmButton: false,
            timer: 1500,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.addEventListener('mouseenter', Swal.stopTimer);
              toast.addEventListener('mouseleave', Swal.resumeTimer);
            }
          }).then(() => {
            this.$router.push({ name: 'dashboard' });
          });
        } else {
          Swal.fire({
            toast: true,
            position: 'top-right',
            icon: 'error',
            title: 'Credenciais inválidas',
            text: 'Por favor, verifique suas credenciais e tente novamente.',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.addEventListener('mouseenter', Swal.stopTimer);
              toast.addEventListener('mouseleave', Swal.resumeTimer);
            }
          });
        }
      } catch (error) {
        console.error('Erro durante o login:', error);
        Swal.fire({
          toast: true,
          position: 'top-right',
          icon: 'error',
          title: 'Dados Incorretos',
          text: 'Verifique suas  credencias.',
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer);
            toast.addEventListener('mouseleave', Swal.resumeTimer);
          }
        });
      }
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

.logo {
  width: 100px;
  height: auto;
  margin-bottom: 10px;
}

h2 {
  font-size: 2em;
  margin-bottom: 20px;
  color: rgb(0, 0, 0); /* Mudar a cor do texto do título para branco */
}

.input-group {
  position: relative;
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

.password-toggle {
  position: absolute;
  top: 50%;
  right: 10px;
  transform: translateY(-50%);
  cursor: pointer;
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
  color: inherit; 
}
</style>
