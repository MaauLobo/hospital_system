<template>
  <div class="dashboard-container">
    <Sidebar />
    <div class="dashboard-content">
      <div class="overview">
        <h1>Rastreamento de Pacientes</h1>
        <div class="cards-container">
          <div class="card" v-for="patient in patients" :key="patient.id">
            <div class="card-header">
              <h2>{{ patient.name }}</h2>
              <span :class="getStatusClass(patient.status)" class="status-indicator"></span>
            </div>
            <div class="card-body">
              <p>Status: {{ patient.status }}</p>
              <p>Localização: {{ patient.location }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Sidebar from '@/components/sidebar.vue';

export default {
  name: 'Dashboard',
  components: {
    Sidebar,
  },
  data() {
    return {
      patients: [
        { id: 1, name: 'João Silva', status: 'Aguardando transporte', location: 'Setor A' },
        { id: 2, name: 'Maria Oliveira', status: 'Em transporte', location: 'Setor B' },
        { id: 3, name: 'Ana Santos', status: 'Chegou ao destino', location: 'Setor C' },
        { id: 4, name: 'Carlos Mendes', status: 'Aguardando transporte', location: 'Setor D' },
        { id: 5, name: 'Laura Lima', status: 'Em transporte', location: 'Setor E' },
        { id: 6, name: 'Rafael Souza', status: 'Chegou ao destino', location: 'Setor F' },
        { id: 7, name: 'Beatriz Fernandes', status: 'Aguardando transporte', location: 'Setor G' },
        { id: 8, name: 'Gustavo Alves', status: 'Em transporte', location: 'Setor H' },
        { id: 9, name: 'Fernanda Costa', status: 'Chegou ao destino', location: 'Setor I' },
        { id: 10, name: 'Pedro Rocha', status: 'Aguardando transporte', location: 'Setor J' },
        { id: 11, name: 'Mariana Pereira', status: 'Em transporte', location: 'Setor K' },
        { id: 12, name: 'Lucas Martins', status: 'Chegou ao destino', location: 'Setor L' },
        { id: 13, name: 'Aline Silva', status: 'Aguardando transporte', location: 'Setor M' }
      ],
    };
  },
  methods: {
    getStatusClass(status) {
      switch (status) {
        case 'Aguardando transporte':
          return 'status-waiting';
        case 'Em transporte':
          return 'status-transporting';
        case 'Chegou ao destino':
          return 'status-arrived';
        default:
          return '';
      }
    },
  },
};
</script>

<style scoped>
.dashboard-container {
  display: flex;
}

.dashboard-content {
  padding: 20px;
  flex: 1;
  display: flex;
  flex-direction: column;
}

.overview h1 {
  margin-bottom: 20px;
  font-size: 2em;
  color: #4385A8;
}

.cards-container {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}

.card {
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 20px;
  width: 100%;
  max-width: 300px;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.status-indicator {
  width: 15px;
  height: 15px;
  border-radius: 50%;
}

.status-waiting {
  background-color: red;
}

.status-transporting {
  background-color: yellow;
}

.status-arrived {
  background-color: green;
}

.card-body p {
  margin: 5px 0;
}
</style>
