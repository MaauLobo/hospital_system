<template>
  <div class="transport-request-container">
    <Sidebar />
    <div class="transport-request-form">
      <h2>Solicitação de Transporte de Paciente</h2>
      <form @submit.prevent="submitRequest">
        <div class="input-group">
          <label for="patientName">Nome do Paciente:</label>
          <div class="input-icon">
            <i class="fas fa-user"></i>
            <input type="text" id="patientName" v-model="patientName" required />
          </div>
        </div>
        <div class="input-group">
          <label for="status">Status:</label>
          <div class="input-icon">
            <i class="fas fa-info-circle"></i>
            <select id="status" v-model="status" required>
              <option value="Aguardando transporte">Aguardando transporte</option>
              <option value="Em transporte">Em transporte</option>
              <option value="Chegou ao destino">Chegou ao destino</option>
            </select>
          </div>
        </div>
        <div class="input-group">
          <label for="priority">Prioridade:</label>
          <div class="input-icon">
            <i class="fas fa-exclamation-triangle"></i>
            <select id="priority" v-model="priority" required>
              <option value="Não Urgente">Não Urgente</option>
              <option value="Pouco Urgente">Pouco Urgente</option>
              <option value="Urgente">Urgente</option>
              <option value="Muito Urgente">Muito Urgente</option>
              <option value="Emergência Absoluta">Emergência Absoluta</option>
            </select>
          </div>
        </div>
        <div class="input-group">
          <label for="startPoint">Ponto Inicial:</label>
          <div class="input-icon">
            <i class="fas fa-map-marker-alt"></i>
            <input type="text" id="startPoint" v-model="startPoint" required />
          </div>
        </div>
        <div class="input-group">
          <label for="endPoint">Ponto Final:</label>
          <div class="input-icon">
            <i class="fas fa-map-marker-alt"></i>
            <input type="text" id="endPoint" v-model="endPoint" required />
          </div>
        </div>
        <div class="input-group">
          <label for="date">Data:</label>
          <div class="input-icon">
            <i class="fas fa-calendar-alt"></i>
            <input type="text" id="date" v-model="date" disabled />
          </div>
        </div>
        <button type="submit">Enviar Solicitação</button>
      </form>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import Sidebar from '@/components/sidebar.vue';
import Swal from 'sweetalert2';

export default {
  name: 'TransportRequestForm',
  components: {
    Sidebar,
  },
  data() {
    return {
      patientName: '',
      status: 'Aguardando transporte',
      priority: 'Não Urgente',
      startPoint: '',
      endPoint: '',
      date: new Date().toLocaleString()
    };
  },
  methods: {
    async submitRequest() {
      const requestData = {
        patient_name: this.patientName,
        status: this.status,
        priority: this.priority,
        initial_point: this.startPoint,
        destination_point: this.endPoint,
        data: this.date,
        maqueiro_id: 1 // Substitua pelo ID do maqueiro atual
      };

      try {
        const response = await axios.post('http://localhost:3333/transport-requests', requestData);
        if (response.status === 201) {
          Swal.fire({
            icon: 'success',
            title: 'Solicitação enviada com sucesso!',
            showConfirmButton: false,
            timer: 1500
          });
          this.clearForm();
        }
      } catch (error) {
        console.error('Erro ao enviar a solicitação:', error);
        Swal.fire({
          icon: 'error',
          title: 'Erro ao enviar a solicitação',
          text: 'Tente novamente mais tarde.'
        });
      }
    },
    clearForm() {
      this.patientName = '';
      this.status = 'Aguardando transporte';
      this.priority = 'Não Urgente';
      this.startPoint = '';
      this.endPoint = '';
    }
  }
};
</script>

<style scoped>
@import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css');

.transport-request-container {
  display: flex;
}

.transport-request-form {
  flex: 1;
  padding: 40px;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-left: 70px;
  max-width: 700px;
  margin: 40px auto;
}

h2 {
  text-align: center;
  margin-bottom: 20px;
  font-size: 2em;
  color: #333;
}

.input-group {
  margin-bottom: 20px;
}

.input-group label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
  color: #555;
}

.input-icon {
  display: flex;
  align-items: center;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #f9f9f9;
}

.input-icon i {
  padding: 10px;
  color: #007bff;
}

.input-icon input,
.input-icon select {
  flex: 1;
  padding: 10px;
  border: none;
  border-radius: 0 5px 5px 0;
  font-size: 1em;
  background-color: #f9f9f9;
  transition: border-color 0.3s ease;
}

.input-icon input:focus,
.input-icon select:focus {
  border-color: #007bff;
  outline: none;
}

button {
  width: 100%;
  padding: 15px;
  font-size: 1.2em;
  color: #fff;
  background-color: #007bff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  margin-top: 20px;
}

button:hover {
  background-color: #0056b3;
}

@media (max-width: 768px) {
  .transport-request-form {
    padding: 20px;
    margin: 20px;
  }

  h2 {
    font-size: 1.5em;
  }

  button {
    font-size: 1em;
  }
}
</style>
