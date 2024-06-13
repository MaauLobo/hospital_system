<template>
    <div v-if="show" class="list-users-modal">
      <div class="modal-content">
        <span class="close" @click="closeModal">&times;</span>
        <h2>Usuários Cadastrados</h2>
        <div class="table-container">
          <table>
            <thead>
              <tr>
                <th>Username</th>
                <th>Name</th>
                <th>Role</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="user in users" :key="user.id">
                <td>{{ user.username }}</td>
                <td>{{ user.name }}</td>
                <td>{{ user.role }}</td>
                <td class="actions">
                  <button @click="editUser(user)" class="edit-button">
                    <i class="fas fa-pencil-alt"></i>
                  </button>
                  <button @click="confirmDeleteUser(user.id)" class="delete-button">
                    <i class="fas fa-trash-alt"></i>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div v-if="editingUser" class="edit-user-form">
          <h3>Editar Usuário</h3>
          <form @submit.prevent="updateUser">
            <div class="form-group">
              <label for="username">Username:</label>
              <input type="text" id="username" v-model="editingUser.username" required />
            </div>
            <div class="form-group">
              <label for="name">Name:</label>
              <input type="text" id="name" v-model="editingUser.name" required />
            </div>
            <div class="form-group">
              <label for="role">Role:</label>
              <select id="role" v-model="editingUser.role" required>
                <option value="Admin">Admin</option>
                <option value="Maqueiro">Maqueiro</option>
              </select>
            </div>
            <button type="submit">Salvar</button>
          </form>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  import Swal from 'sweetalert2';
  
  export default {
    name: 'ListUsers',
    props: {
      show: {
        type: Boolean,
        required: true
      }
    },
    data() {
      return {
        users: [],
        editingUser: null,
      };
    },
    methods: {
      async fetchUsers() {
        try {
          const response = await axios.get('http://localhost:3333/users');
          this.users = response.data;
        } catch (error) {
          console.error('Erro ao buscar usuários:', error);
        }
      },
      closeModal() {
        this.$emit('close');
      },
      editUser(user) {
        this.editingUser = { ...user };
      },
      async updateUser() {
        try {
          await axios.put(`http://localhost:3333/users/${this.editingUser.id}`, this.editingUser);
          Swal.fire({
            toast: true,
            position: 'top-right',
            icon: 'success',
            title: 'Usuário atualizado com sucesso!',
            showConfirmButton: false,
            timer: 1500,
            timerProgressBar: true
          });
          this.editingUser = null;
          this.fetchUsers();
        } catch (error) {
          console.error('Erro ao atualizar usuário:', error);
          Swal.fire({
            toast: true,
            position: 'top-right',
            icon: 'error',
            title: 'Erro ao atualizar usuário',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true
          });
        }
      },
      confirmDeleteUser(userId) {
        Swal.fire({
          title: 'Tem certeza?',
          text: 'Você não poderá reverter isso!',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#d33',
          cancelButtonColor: '#3085d6',
          confirmButtonText: 'Sim, deletar!',
          cancelButtonText: 'Cancelar'
        }).then(async (result) => {
          if (result.isConfirmed) {
            this.deleteUser(userId);
          }
        });
      },
      async deleteUser(userId) {
        try {
          await axios.delete(`http://localhost:3333/users/${userId}`);
          Swal.fire({
            toast: true,
            position: 'top-right',
            icon: 'success',
            title: 'Usuário deletado com sucesso!',
            showConfirmButton: false,
            timer: 1500,
            timerProgressBar: true
          });
          this.fetchUsers();
        } catch (error) {
          console.error('Erro ao deletar usuário:', error);
          Swal.fire({
            toast: true,
            position: 'top-right',
            icon: 'error',
            title: 'Erro ao deletar usuário',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true
          });
        }
      }
    },
    watch: {
      show(newVal) {
        if (newVal) {
          this.fetchUsers();
        }
      }
    }
  };
  </script>
  
  <style scoped>
  .list-users-modal {
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
    width: 80%;
    max-width: 900px;
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
  
  .table-container {
    max-height: 400px;
    overflow-y: auto;
  }
  
  table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 20px;
  }
  
  th, td {
    padding: 10px;
    border: 1px solid #ddd;
    text-align: left;
  }
  
  th {
    background-color: #f4f4f4;
  }
  
  tbody tr:nth-child(even) {
    background-color: #f9f9f9;
  }
  
  .actions {
    display: flex;
    gap: 10px; /* Aumente o gap entre os botões */
  }
  
  .edit-button {
    background-color: #007bff; /* Azul */
    color: white;
    border: none;
    border-radius: 5px;
    padding: 5px;
    cursor: pointer;
  }
  
  .edit-button:hover {
    background-color: #0056b3;
  }
  
  .delete-button {
    background-color: #dc3545; /* Vermelho */
    color: white;
    border: none;
    border-radius: 5px;
    padding: 5px;
    cursor: pointer;
  }
  
  .delete-button:hover {
    background-color: #c82333;
  }
  
  .edit-user-form {
    margin-top: 20px;
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
  
  button[type="submit"] {
    background-color: #007bff;
    color: white;
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
  
  button[type="submit"]:hover {
    background-color: #0056b3;
  }
  </style>
  