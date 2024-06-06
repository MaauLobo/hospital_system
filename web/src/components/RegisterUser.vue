<!-- src/components/RegisterUser.vue -->
<template>
    <div v-if="show" class="register-user-modal">
      <div class="modal-content">
        <span class="close" @click="closeModal">&times;</span>
        <h2>Cadastrar Usuário</h2>
        <form @submit.prevent="registerUser">
          <div class="form-group">
            <label for="username">Username:</label>
            <input type="text" id="username" v-model="form.username" required />
          </div>
          <div class="form-group">
            <label for="password">Password:</label>
            <input type="password" id="password" v-model="form.password" required />
          </div>
          <div class="form-group">
            <label for="name">Name:</label>
            <input type="text" id="name" v-model="form.name" required />
          </div>
          <div class="form-group">
            <label for="role">Role:</label>
            <select id="role" v-model="form.role" required>
              <option value="Admin">Admin</option>
              <option value="Maqueiro">Maqueiro</option>
            </select>
          </div>
          <button type="submit">Cadastrar</button>
        </form>
      </div>
    </div>
</template>
  
<script>
import axios from 'axios';
import Swal from 'sweetalert2';

export default {
  name: 'RegisterUser',
  props: {
    show: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      form: {
        username: '',
        password: '',
        name: '',
        role: 'Admin',
        perms: 'admin'
      }
    };
  },
  watch: {
    'form.role'(newRole) {
      this.form.perms = newRole === 'Admin' ? 'admin' : 'user';
    }
  },
  methods: {
    closeModal() {
      this.$emit('close');
    },
    async registerUser() {
      try {
        await axios.post('http://localhost:3333/register', this.form);
        Swal.fire({
          toast: true,
          position: 'top-right',
          icon: 'success',
          title: 'Usuário cadastrado com sucesso!',
          showConfirmButton: false,
          timer: 1500,
          timerProgressBar: true
        });
        this.closeModal();
      } catch (error) {
        console.error('Erro ao cadastrar usuário:', error);
        Swal.fire({
          toast: true,
          position: 'top-right',
          icon: 'error',
          title: 'Erro ao cadastrar usuário',
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true
        });
      }
    }
  }
};
</script>
  
<style scoped>
.register-user-modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  background: white;
  padding: 20px;
  border-radius: 10px;
  width: 300px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  position: relative;
}

.close {
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 1.5em;
  cursor: pointer;
}

.form-group {
  margin-bottom: 15px;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
}

.form-group input,
.form-group select {
  width: 100%;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
}

button {
  background-color: #007bff;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

button:hover {
  background-color: #0056b3;
}
</style>
