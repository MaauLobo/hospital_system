<template>
  <div v-if="show" class="modal-overlay" @click.self="closeModal">
    <div class="modal-content">
      <span class="close-button" @click="closeModal">&times;</span>
      <h2>Histórico de Incidentes</h2>
      <div class="filters">
        <input type="text" v-model="searchPatient" placeholder="Buscar por nome do paciente" />
        <input type="text" v-model="searchMaqueiro" placeholder="Buscar por nome do maqueiro" />
        <input type="date" v-model="searchDate" placeholder="Buscar por data" />
      </div>
      <div class="table-container">
        <table>
          <thead>
            <tr>
              <th>Nome do Paciente</th>
              <th>Nome do Maqueiro</th>
              <th>Descrição</th>
              <th>Data</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="incident in filteredIncidents" :key="incident.id">
              <td>{{ incident.patient_name }}</td>
              <td>{{ incident.maqueiro_name }}</td>
              <td>{{ incident.descricao }}</td>
              <td>{{ formatDate(incident.dataHora) }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'HistoricIncident',
  props: {
    show: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      incidents: [],
      searchPatient: '',
      searchMaqueiro: '',
      searchDate: ''
    };
  },
  computed: {
    filteredIncidents() {
      return this.incidents.filter(incident => {
        const patientMatch = incident.patient_name.toLowerCase().includes(this.searchPatient.toLowerCase());
        const maqueiroMatch = incident.maqueiro_name.toLowerCase().includes(this.searchMaqueiro.toLowerCase());
        const dateMatch = this.searchDate ? incident.dataHora.startsWith(this.searchDate) : true;
        return patientMatch && maqueiroMatch && dateMatch;
      });
    }
  },
  methods: {
    async fetchIncidents() {
      try {
        const response = await axios.get('http://localhost:3333/incidents');
        this.incidents = response.data;
      } catch (error) {
        console.error('Erro ao buscar histórico de incidentes:', error);
      }
    },
    closeModal() {
      this.$emit('close');
    },
    formatDate(dateTime) {
      const date = new Date(dateTime);
      const day = String(date.getDate()).padStart(2, '0');
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const year = date.getFullYear();
      const hours = String(date.getHours()).padStart(2, '0');
      const minutes = String(date.getMinutes()).padStart(2, '0');
      return `${day}/${month}/${year} ${hours}:${minutes}`;
    }
  },
  watch: {
    show(newVal) {
      if (newVal) {
        this.fetchIncidents();
      }
    }
  }
};
</script>

<style scoped>
.modal-overlay {
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
  background: #fff;
  padding: 20px;
  border-radius: 8px;
  width: 80%;
  max-width: 900px;
  position: relative;
}

.close-button {
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 1.5em;
  cursor: pointer;
}

.filters {
  display: flex;
  gap: 10px;
  margin-bottom: 10px;
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
</style>
