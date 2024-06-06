<!-- src/components/UserOptionsModal.vue -->
<template>
    <div class="user-options-modal" v-if="show">
      <ul>
        <li @click="navigateTo('register')">
          <i class="fas fa-user-plus"></i> Cadastrar Usuário
        </li>
        <li @click="navigateTo('list')">
          <i class="fas fa-list"></i> Listar Usuários
        </li>
      </ul>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      show: {
        type: Boolean,
        required: true
      }
    },
    methods: {
      navigateTo(page) {
        this.$emit('navigate', page);
      }
    }
  };
  </script>
  
  <style scoped>
  .user-options-modal {
    position: absolute;
    top: 100%;
    right: 0;
    background: #fff;
    border: 1px solid #ccc;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    border-radius: 8px;
    z-index: 1000;
    width: 220px;
  }
  
  .user-options-modal ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }
  
  .user-options-modal li {
    padding: 12px 15px;
    cursor: pointer;
    display: flex;
    align-items: center;
    transition: background 0.3s, color 0.3s;
  }
  
  .user-options-modal li i {
    margin-right: 10px;
  }
  
  .user-options-modal li:hover {
    background: #f8f9fa;
    color: #007bff;
  }
  
  .user-options-modal li:last-child {
    border-bottom: none;
  }
  </style>
  