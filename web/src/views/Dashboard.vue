<template>
  <div class="dashboard-container">
    <Sidebar />
    <div class="dashboard-view">
      <div class="header">
        <h1>Dashboard User</h1>
        <div class="user-info">
          <span>{{ name }}</span>
          <i class="fas fa-user-circle"></i>
        </div>
      </div>
      <div class="overview">
        <div class="info-card" v-for="(info, index) in infoCards" :key="index">
          <div class="info-card-icon" :style="{ backgroundColor: info.color }">
            <i :class="info.icon"></i>
          </div>
          <div class="info-card-content">
            <h3>{{ info.value }}</h3>
            <p>{{ info.label }}</p>
          </div>
        </div>
      </div>
      <div class="charts">
        <div class="widget bar-chart">
          <canvas id="totalPacientesChart"></canvas>
          <div class="info">
            <h3>Total Pacientes</h3>
            <span>{{ infoCards[0].value }}</span>
            <p>Gráfico de total de pacientes por dia</p>
          </div>
        </div>
        <div class="widget bar-chart">
          <canvas id="transportesRealizadosChart"></canvas>
          <div class="info">
            <h3>Transportes Realizados</h3>
            <span>{{ infoCards[2].value }}</span>
            <p>Gráfico de transportes realizados por dia</p>
          </div>
        </div>
        <div class="widget line-chart">
          <canvas id="solicitacoesRecusadasChart"></canvas>
          <div class="info">
            <h3>Solicitações Recusadas</h3>
            <span>{{ solicitacoesRecusadas }}</span>
            <p>Gráfico de solicitações recusadas por dia</p>
          </div>
        </div>
      </div>
      <div class="patient-list-widget">
        <h2>Rastreamento de Pacientes</h2>
        <div class="patient-list">
          <div class="filters">
            <input type="text" v-model="searchName" @input="filterPatients" placeholder="Buscar por nome" />
            <input type="text" v-model="searchLocation" @input="filterPatients" placeholder="Buscar por setor" />
            <select v-model="selectedUrgency" @change="filterPatients">
              <option value="">Todos</option>
              <option value="Não Urgente">Não Urgente</option>
              <option value="Pouco Urgente">Pouco Urgente</option>
              <option value="Urgente">Urgente</option>
              <option value="Muito Urgente">Muito Urgente</option>
              <option value="Emergência Absoluta">Emergência Absoluta</option>
              <option value="Maior Urgência">Maior Urgência</option>
            </select>
            <select v-model="selectedStatus" @change="filterPatients">
              <option value="">Todos</option>
              <option value="Aguardando transporte">Aguardando transporte</option>
              <option value="Em transporte">Em transporte</option>
              <option value="Chegou ao destino">Chegou ao destino</option>
            </select>
          </div>
          <table>
            <thead>
              <tr>
                <th>Nome</th>
                <th>Status</th>
                <th>Localização</th>
                <th>Urgência</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="patient in paginatedPatients" :key="patient.id">
                <td>{{ patient.patient_name }}</td>
                <td>{{ patient.status }}</td>
                <td>{{ patient.destination_point }}</td>
                <td :class="getUrgencyClass(patient.priority)">{{ patient.priority }}</td>
              </tr>
            </tbody>
          </table>
          <div class="pagination-controls">
            <button @click="prevPage" :disabled="currentPage === 1">Anterior</button>
            <button @click="nextPage" :disabled="currentPage === totalPages">Próximo</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Chart, registerables } from 'chart.js';
import Sidebar from '@/components/sidebar.vue';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';

Chart.register(...registerables);

export default {
  name: 'Dashboard',
  components: {
    Sidebar,
  },
  data() {
    return {
      name: '',
      infoCards: [
        { value: 0, label: 'Total Pacientes', icon: 'fas fa-user', color: '#28a745' },
        { value: 0, label: 'Pacientes Urgentes', icon: 'fas fa-exclamation-circle', color: '#dc3545' },
        { value: 0, label: 'Transportes Realizados', icon: 'fas fa-bed', color: '#6f42c1' },
        { value: 0, label: 'Aguardando Transporte', icon: 'fas fa-clock', color: '#007bff' },
      ],
      solicitacoesRecusadas: 0,
      patients: [],
      searchName: '',
      searchLocation: '',
      selectedUrgency: '',
      selectedStatus: '',
      currentPage: 1,
      itemsPerPage: 13,
      filteredPatients: [],
    };
  },
  created() {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken = jwtDecode(token);
      this.name = decodedToken.name || 'Usuário';
      this.role = decodedToken.role || 'Desconhecido';
    } else {
      console.log('Nenhum token encontrado no localStorage');
    }
    this.fetchPatients();
  },
  computed: {
    paginatedPatients() {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      return this.filteredPatients.slice(start, end);
    },
    totalPages() {
      return Math.ceil(this.filteredPatients.length / this.itemsPerPage);
    },
  },
  mounted() {
    this.fetchPatients();
  },
  methods: {
    async fetchPatients() {
      try {
        const response = await axios.get('http://localhost:3333/transport-requests');
        this.patients = response.data;
        this.updateInfoCards();
        this.updateCharts();
        this.filterPatients();
      } catch (error) {
        console.error('Erro ao buscar pacientes:', error);
      }
    },
    updateInfoCards() {
      const totalPacientes = this.patients.length;
      const pacientesUrgentes = this.patients.filter(patient => ['Urgente', 'Muito Urgente', 'Emergência Absoluta'].includes(patient.priority)).length;
      const transportesRealizados = this.patients.filter(patient => patient.status === 'Chegou ao destino').length;
      const aguardandoTransporte = this.patients.filter(patient => patient.status === 'Aguardando transporte').length;
      const solicitacoesRecusadas = this.patients.filter(patient => patient.request_status === 'Negado').length;

      this.infoCards[0].value = totalPacientes;
      this.infoCards[1].value = pacientesUrgentes;
      this.infoCards[2].value = transportesRealizados;
      this.infoCards[3].value = aguardandoTransporte;
      this.solicitacoesRecusadas = solicitacoesRecusadas;
    },
    updateCharts() {
      const days = Array.from(new Set(this.patients.map(patient => new Date(patient.created_at).toLocaleDateString()))).sort();

      const totalPacientesData = days.map(day => {
        return this.patients.filter(patient => new Date(patient.created_at).toLocaleDateString() === day).length;
      });

      const transportesRealizadosData = days.map(day => {
        return this.patients.filter(patient => new Date(patient.created_at).toLocaleDateString() === day && patient.status === 'Chegou ao destino').length;
      });

      const solicitacoesRecusadasData = days.map(day => {
        return this.patients.filter(patient => new Date(patient.created_at).toLocaleDateString() === day && patient.request_status === 'Negado').length;
      });

      this.renderChart('totalPacientesChart', days, totalPacientesData, 'Total Pacientes');
      this.renderChart('transportesRealizadosChart', days, transportesRealizadosData, 'Transportes Realizados');
      this.renderChart('solicitacoesRecusadasChart', days, solicitacoesRecusadasData, 'Solicitações Recusadas');
    },
    renderChart(canvasId, labels, data, label) {
      const ctx = document.getElementById(canvasId).getContext('2d');
      new Chart(ctx, {
        type: 'bar',
        data: {
          labels: labels,
          datasets: [{
            label: label,
            data: data,
            backgroundColor: 'rgba(54, 162, 235, 0.2)',
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 1,
          }],
        },
        options: {
          plugins: {
            legend: { display: false },
          },
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        },
      });
    },
    getUrgencyClass(urgency) {
      switch (urgency) {
        case 'Não Urgente':
          return 'urgency-low';
        case 'Pouco Urgente':
          return 'urgency-medium';
        case 'Urgente':
          return 'urgency-high';
        case 'Muito Urgente':
          return 'urgency-very-high';
        case 'Emergência Absoluta':
          return 'urgency-critical';
        default:
          return '';
      }
    },
    filterPatients() {
      this.filteredPatients = this.patients
        .filter(patient => {
          return (
            (!this.selectedUrgency || patient.priority === this.selectedUrgency || this.selectedUrgency === "Maior Urgência") &&
            (!this.selectedStatus || patient.status === this.selectedStatus) &&
            (!this.searchName || patient.patient_name.toLowerCase().includes(this.searchName.toLowerCase())) &&
            (!this.searchLocation || patient.destination_point.toLowerCase().includes(this.searchLocation.toLowerCase()))
          );
        })
        .sort((a, b) => {
          if (this.selectedUrgency === "Maior Urgência") {
            return this.compareUrgency(b.priority, a.priority);
          } else {
            return this.compareUrgency(a.priority, b.priority);
          }
        });
      this.currentPage = 1; // Reset to first page after filtering
    },
    compareUrgency(a, b) {
      const urgencyOrder = ['Não Urgente', 'Pouco Urgente', 'Urgente', 'Muito Urgente', 'Emergência Absoluta'];
      return urgencyOrder.indexOf(a) - urgencyOrder.indexOf(b);
    },
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
      }
    },
    prevPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
      }
    },
  },
};
</script>

<style scoped>
.dashboard-container {
  display: flex;
  height: 100vh;
  overflow: hidden;
}

.dashboard-view {
  padding: 20px;
  flex: 1;
  background-color: #f8f9fa;
  color: #343a40;
  overflow-y: auto;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.header h1 {
  font-size: 1.5em;
}

.header .user-info {
  display: flex;
  align-items: center;
}

.header .user-info span {
  margin-right: 10px;
}

.overview {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
}

.info-card {
  background: white;
  padding: 20px;
  border-radius: 10px;
  flex: 1;
  margin: 0 10px;
  display: flex;
  align-items: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.info-card-icon {
  padding: 15px;
  border-radius: 10px;
  margin-right: 15px;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
}

.info-card-content h3 {
  font-size: 1.5em;
  margin: 0;
}

.info-card-content p {
  margin: 5px 0 0;
  font-size: 0.9em;
  color: #6c757d;
}

.charts {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
}

.widget {
  background: white;
  padding: 20px;
  border-radius: 10px;
  flex: 1;
  margin: 0 10px;
  text-align: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  position: relative;
}

.widget h3 {
  font-size: 2em;
  margin: 10px 0;
}

.widget p,
.widget span {
  font-size: 0.8em;
}

.widget .info {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.bar-chart canvas,
.line-chart canvas {
  width: 100%;
  height: 200px;
}

.filters {
  display: flex;
  justify-content: flex-start;
  gap: 20px;
  margin-bottom: 20px;
  padding: 10px;
  background: white;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.filters select,
.filters input {
  padding: 10px;
  font-size: 1em;
  border-radius: 5px;
  border: 1px solid #ccc;
}

.patient-list-widget {
  background: white;
  padding: 20px;
  border-radius: 10px;
  margin: 0 10px;
  text-align: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.patient-list-widget h2 {
  text-align: left;
}

.patient-list table {
  width: 100%;
  border-collapse: collapse;
}

.patient-list th,
.patient-list td {
  padding: 15px;
  text-align: left;
  border-bottom: 1px solid #dee2e6;
}

.pagination-controls {
  display: flex;
  justify-content: space-between;
  padding: 10px;
}

.pagination-controls button {
  padding: 10px;
  font-size: 1em;
  border: none;
  border-radius: 5px;
  background-color: #007bff;
  color: white;
  cursor: pointer;
}

.pagination-controls button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

.urgency-low {
  color: darkblue;
  text-shadow: 1px 1px 0 #000;
}

.urgency-medium {
  color: green;
  text-shadow: 1px 1px 0 #000;
}

.urgency-high {
  color: yellow;
  text-shadow: 1px 1px 0 #000;
}

.urgency-very-high {
  color: orange;
  text-shadow: 1px 1px 0 #000;
}

.urgency-critical {
  color: red;
  text-shadow: 1px 1px 0 #000;
}
</style>
