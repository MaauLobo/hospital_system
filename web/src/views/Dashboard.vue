<template>
    <div class="dashboard-container">
      <Sidebar />
      <div class="dashboard-view">
        <div class="header">
          <h1>Dashboard User</h1>
          <div class="user-info">
            <span>Jonathan Doe</span>
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
            <canvas id="dataAChart"></canvas>
            <div class="info">
              <h3>A</h3>
              <span>68209</span>
              <p>Lorem ipsum dolor</p>
            </div>
          </div>
          <div class="widget bar-chart">
            <canvas id="dataBChart"></canvas>
            <div class="info">
              <h3>B</h3>
              <span>27393</span>
              <p>Lorem ipsum dolor</p>
            </div>
          </div>
          <div class="widget line-chart">
            <canvas id="overviewChart"></canvas>
          </div>
        </div>
        <div class="patient-list-widget">
          <h2>Rastreamento de Pacientes</h2>
          <div class="patient-list">
            <div class="filters">
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
                <tr v-for="patient in filteredPatients" :key="patient.id">
                  <td>{{ patient.name }}</td>
                  <td>{{ patient.status }}</td>
                  <td>{{ patient.location }}</td>
                  <td :class="getUrgencyClass(patient.urgency)">{{ patient.urgency }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { Chart, registerables } from 'chart.js';
  import Sidebar from '@/components/sidebar.vue';
  
  Chart.register(...registerables);
  
  export default {
    name: 'Dashboard',
    components: {
      Sidebar,
    },
    data() {
      return {
        infoCards: [
          { value: '89', label: 'Total Pacientes', icon: 'fas fa-user', color: '#28a745' },
          { value: '17', label: 'Pacientes Urgentes', icon: 'fas fa-exclamation-circle', color: '#dc3545' },
          { value: '55', label: 'Transportes Realizados', icon: 'fas fa-car', color: '#6f42c1' },
          { value: '40', label: 'Aguardando Transporte', icon: 'fas fa-clock', color: '#007bff' },
        ],
        patients: [
          { id: 1, name: 'João Silva', status: 'Aguardando transporte', location: 'Setor A', urgency: 'Emergência Absoluta' },
          { id: 2, name: 'Maria Oliveira', status: 'Em transporte', location: 'Setor B', urgency: 'Muito Urgente' },
          { id: 3, name: 'Ana Santos', status: 'Chegou ao destino', location: 'Setor C', urgency: 'Urgente' },
          { id: 4, name: 'Carlos Mendes', status: 'Aguardando transporte', location: 'Setor D', urgency: 'Pouco Urgente' },
          { id: 5, name: 'Laura Lima', status: 'Em transporte', location: 'Setor E', urgency: 'Não Urgente' },
          { id: 6, name: 'Rafael Souza', status: 'Chegou ao destino', location: 'Setor F', urgency: 'Pouco Urgente' },
          { id: 7, name: 'Beatriz Fernandes', status: 'Aguardando transporte', location: 'Setor G', urgency: 'Emergência Absoluta' },
          { id: 8, name: 'Gustavo Alves', status: 'Em transporte', location: 'Setor H', urgency: 'Muito Urgente' },
          { id: 9, name: 'Fernanda Costa', status: 'Chegou ao destino', location: 'Setor I', urgency: 'Urgente' },
          { id: 10, name: 'Pedro Rocha', status: 'Aguardando transporte', location: 'Setor J', urgency: 'Pouco Urgente' },
          { id: 11, name: 'Mariana Pereira', status: 'Em transporte', location: 'Setor K', urgency: 'Não Urgente' },
          { id: 12, name: 'Lucas Martins', status: 'Chegou ao destino', location: 'Setor L', urgency: 'Pouco Urgente' },
          { id: 13, name: 'Aline Silva', status: 'Aguardando transporte', location: 'Setor M', urgency: 'Emergência Absoluta' }
        ],
        selectedUrgency: '',
        selectedStatus: '',
        filteredPatients: [],
      };
    },
    mounted() {
      this.renderBarChart('dataAChart', [12, 19, 3, 5, 2]);
      this.renderBarChart('dataBChart', [2, 3, 20, 5, 1]);
      this.renderLineChart('overviewChart', [3, 2, 1, 5, 4]);
      this.filterPatients();
    },
    methods: {
      renderBarChart(canvasId, data) {
        const ctx = document.getElementById(canvasId).getContext('2d');
        new Chart(ctx, {
          type: 'bar',
          data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
            datasets: [{
              data,
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
      renderLineChart(canvasId, data) {
        const ctx = document.getElementById(canvasId).getContext('2d');
        new Chart(ctx, {
          type: 'line',
          data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
            datasets: [{
              data,
              backgroundColor: 'rgba(75, 192, 192, 0.2)',
              borderColor: 'rgba(75, 192, 192, 1)',
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
              (!this.selectedUrgency || patient.urgency === this.selectedUrgency || this.selectedUrgency === "Maior Urgência") &&
              (!this.selectedStatus || patient.status === this.selectedStatus)
            );
          })
          .sort((a, b) => {
            if (this.selectedUrgency === "Maior Urgência") {
              return this.compareUrgency(b.urgency, a.urgency);
            } else {
              return this.compareUrgency(a.urgency, b.urgency);
            }
          });
      },
      compareUrgency(a, b) {
        const urgencyOrder = ['Não Urgente', 'Pouco Urgente', 'Urgente', 'Muito Urgente', 'Emergência Absoluta'];
        return urgencyOrder.indexOf(a) - urgencyOrder.indexOf(b);
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
  
  .widget p, .widget span {
    font-size: 0.8em;
  }
  
  .widget .info {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  
  .bar-chart canvas, .line-chart canvas {
    width: 100%;
    height: 200px;
  }
  
  .filters {
    display: flex;
    justify-content: flex-start;
    gap: 20px;
    margin-bottom: 20px;
    padding: 10px;
    
  }
  
  .filters select {
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
  
  .patient-list table {
    width: 100%;
    border-collapse: collapse;
  }
  
  .patient-list th, .patient-list td {
    padding: 15px;
    text-align: left;
    border-bottom: 1px solid #dee2e6;
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
  