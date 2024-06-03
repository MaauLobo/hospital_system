<template>
    <div class="tracking-container">
      <Sidebar />
      <div class="tracking-view">
        <h1>Rastreamento de Pacientes</h1>
        <div class="selector-container">
          <button @click="prevPatient" :disabled="selectedPatientIndex === 0">⬅</button>
          <select v-model="selectedPatientId" @change="updateMap">
            <option v-for="patient in patients" :key="patient.id" :value="patient.id">
              {{ patient.name }} - {{ patient.status }}
            </option>
          </select>
          <button @click="nextPatient" :disabled="selectedPatientIndex === patients.length - 1">➡</button>
        </div>
        <div ref="map" class="map-container"></div>
      </div>
    </div>
  </template>
  
  <script>
  import L from 'leaflet';
  import Sidebar from '@/components/sidebar.vue';
  
  // Importa os ícones personalizados
  import 'leaflet/dist/leaflet.css';
  import iconUrl from 'leaflet/dist/images/marker-icon.png';
  import iconRetinaUrl from 'leaflet/dist/images/marker-icon-2x.png';
  import shadowUrl from 'leaflet/dist/images/marker-shadow.png';
  
  export default {
    name: 'TrackingView',
    components: {
      Sidebar,
    },
    data() {
      return {
        patients: [
          { id: 1, name: 'João Silva', status: 'Aguardando transporte', location: [-12.2597, -38.9664] },
          { id: 2, name: 'Maria Oliveira', status: 'Em transporte', location: [-12.2667, -38.9704] },
          { id: 3, name: 'Ana Santos', status: 'Chegou ao destino', location: [-12.2721, -38.9532] },
          { id: 4, name: 'Carlos Mendes', status: 'Aguardando transporte', location: [-12.2750, -38.9500] },
          { id: 5, name: 'Laura Lima', status: 'Em transporte', location: [-12.2800, -38.9600] },
          { id: 6, name: 'Rafael Souza', status: 'Chegou ao destino', location: [-12.2650, -38.9550] },
          { id: 7, name: 'Beatriz Fernandes', status: 'Aguardando transporte', location: [-12.2700, -38.9650] },
          { id: 8, name: 'Gustavo Alves', status: 'Em transporte', location: [-12.2600, -38.9700] },
          { id: 9, name: 'Fernanda Costa', status: 'Chegou ao destino', location: [-12.2550, -38.9600] },
          { id: 10, name: 'Pedro Rocha', status: 'Aguardando transporte', location: [-12.2500, -38.9750] },
          { id: 11, name: 'Mariana Pereira', status: 'Em transporte', location: [-12.2680, -38.9450] },
          { id: 12, name: 'Lucas Martins', status: 'Chegou ao destino', location: [-12.2725, -38.9400] },
          { id: 13, name: 'Aline Silva', status: 'Aguardando transporte', location: [-12.2805, -38.9555] }
        ],
        selectedPatientId: 1,
        selectedPatientIndex: 0,
        map: null,
        markers: [],
      };
    },
    mounted() {
      // Ajusta a localização inicial para o Hospital Clériston Andrade
      const initialLocation = [-12.2597, -38.9647];
  
      this.map = L.map(this.$refs.map).setView(initialLocation, 13);
  
      L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
}).addTo(this.map);
  
      const customIcon = L.icon({
        iconUrl,
        iconRetinaUrl,
        shadowUrl,
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41]
      });
  
      this.patients.forEach(patient => {
        const marker = L.marker(patient.location, { icon: customIcon }).addTo(this.map);
        marker.bindPopup(`<h3>${patient.name}</h3><p>${patient.status}</p>`);
        this.markers.push(marker);
      });
  
      this.updateMap();
    },
    methods: {
      updateMap() {
        const selectedPatient = this.patients.find(patient => patient.id === this.selectedPatientId);
        this.selectedPatientIndex = this.patients.indexOf(selectedPatient);
        if (selectedPatient) {
          this.map.setView(selectedPatient.location, 15);
          this.markers.forEach(marker => marker.closePopup());
          const selectedMarker = this.markers[this.selectedPatientIndex];
          selectedMarker.openPopup();
        }
      },
      prevPatient() {
        if (this.selectedPatientIndex > 0) {
          this.selectedPatientIndex -= 1;
          this.selectedPatientId = this.patients[this.selectedPatientIndex].id;
          this.updateMap();
        }
      },
      nextPatient() {
        if (this.selectedPatientIndex < this.patients.length - 1) {
          this.selectedPatientIndex += 1;
          this.selectedPatientId = this.patients[this.selectedPatientIndex].id;
          this.updateMap();
        }
      },
    },
  };
  </script>
  
  <style scoped>
  @import 'leaflet/dist/leaflet.css';
  
  .tracking-container {
    display: flex;
  }
  
  .tracking-view {
    padding: 20px;
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  
  .map-container {
    width: 100%;
    height: 800px;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    margin-top: 20px;
  }
  
  h1 {
    margin-bottom: 20px;
    font-size: 2em;
    color: #4385A8;
    text-align: center;
  }
  
  .selector-container {
    display: flex;
    align-items: center;
    margin-bottom: 20px;
    gap: 10px;
  }
  
  .selector-container select {
    padding: 10px;
    font-size: 1em;
    border-radius: 5px;
    border: 1px solid #ccc;
  }
  
  .selector-container button {
    padding: 10px;
    font-size: 1em;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    background-color: #4385A8;
    color: white;
    transition: background-color 0.3s ease, transform 0.3s ease;
  }
  
  .selector-container button:disabled {
    cursor: not-allowed;
    background-color: #ccc;
  }
  
  .selector-container button:not(:disabled):hover {
    background-color: #136692;
    transform: scale(1.05);
  }
  </style>
  