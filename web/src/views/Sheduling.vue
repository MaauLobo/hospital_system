<template>
  <div class="agendamento-container">
    <Sidebar />
    <div class="agendamento-view">
      <h1>Agendamento de Transporte de Pacientes</h1>
      <div class="solicitacoes">
        <h2>Solicitações de Transporte</h2>
        <ul>
          <li v-for="solicitacao in solicitacoes" :key="solicitacao.id">
            <div class="solicitacao-info">
              <p>Paciente: {{ solicitacao.patient_name }}</p>
              <p>Destino: {{ solicitacao.destination_point }}</p>
              <p>Hora: {{ formatDateTime(solicitacao.created_at) }}</p>
            </div>
            <div class="solicitacao-actions">
              <button @click="confirmarAceitarSolicitacao(solicitacao.id)">
                <i class="fas fa-check"></i>
                <span>Aceitar</span>
              </button>
              <button @click="confirmarRecusarSolicitacao(solicitacao.id)">
                <i class="fas fa-times"></i>
                <span>Recusar</span>
              </button>
            </div>
          </li>
        </ul>
      </div>
      <div class="historico">
        <h2>Histórico de Solicitações</h2>
        <ul>
          <li v-for="historico in historicos" :key="historico.id">
            <div class="historico-info">
              <p>Paciente: {{ historico.patient_name }}</p>
              <p>Destino: {{ historico.destination_point }}</p>
              <p>Hora: {{ formatDateTime(historico.created_at) }}</p>
              <p>Status: {{ historico.status }}</p>
              <div class="historico-actions" v-if="historico.request_status !== 'Negado'">
                <button 
                  @click="updateStatus(historico.id, 'Em transporte')" 
                  :disabled="!isEmTransporteEnabled(historico.status)"
                >
                  <i class="fas fa-truck"></i>
                  <span>Em Transporte</span>
                </button>
                <button 
                  @click="updateStatus(historico.id, 'Chegou ao Destino')" 
                  :disabled="!isChegouAoDestinoEnabled(historico.status)"
                >
                  <i class="fas fa-check-circle"></i>
                  <span>Concluído</span>
                </button>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import Sidebar from '@/components/sidebar.vue';
import eventBus from '@/eventBus.js';
import Swal from 'sweetalert2';
import { jwtDecode } from 'jwt-decode';

export default {
  name: 'AgendamentoView',
  components: {
    Sidebar
  },
  data() {
    return {
      solicitacoes: [],
      historicos: [],
      userId: null,
    };
  },
  created() {
    this.decodeToken();
    this.fetchSolicitacoes();
  },
  methods: {
    decodeToken() {
      const token = localStorage.getItem('token');
      if (token) {
        const decodedToken = jwtDecode(token);
        this.userId = decodedToken.userid;
        console.log('Decoded user ID:', this.userId);
      } else {
        console.error('Token not found');
      }
    },
    async fetchSolicitacoes() {
  try {
    const response = await axios.get('http://localhost:3333/transport-requests');
    console.log('Fetched solicitacoes:', response.data);

    this.solicitacoes = response.data.filter(
      solicitacao => solicitacao.request_status === 'Pendente' && (!solicitacao.rejected_by || !solicitacao.rejected_by.split(',').includes(String(this.userId)))
    );

    this.historicos = response.data.filter(
      solicitacao => solicitacao.request_status !== 'Pendente' && solicitacao.maqueiro_id === this.userId
    );

    console.log('Filtered solicitacoes:', this.solicitacoes);
    console.log('Filtered historicos:', this.historicos);
  } catch (error) {
    console.error('Erro ao buscar solicitações:', error);
  }
},
    confirmarAceitarSolicitacao(id) {
      Swal.fire({
        title: 'Tem certeza que deseja aceitar a solicitação?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Sim, aceitar',
        cancelButtonText: 'Não, cancelar'
      }).then(async (result) => {
        if (result.isConfirmed) {
          this.aceitarSolicitacao(id);
        }
      });
    },
    confirmarRecusarSolicitacao(id) {
      Swal.fire({
        title: 'Tem certeza que deseja recusar a solicitação?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Sim, recusar',
        cancelButtonText: 'Não, cancelar'
      }).then(async (result) => {
        if (result.isConfirmed) {
          this.recusarSolicitacao(id);
        }
      });
    },
    async aceitarSolicitacao(id) {
      try {
        await axios.put(`http://localhost:3333/transport-requests/${id}/request-status`, { request_status: 'Aceito', maqueiro_id: this.userId });
        this.updateLocalRequestStatus(id, 'Aceito');
        eventBus.updated = !eventBus.updated; // Emitir evento
        Swal.fire({
          toast: true,
          position: 'top-right',
          icon: 'success',
          title: 'Solicitação Aceita',
          showConfirmButton: false,
          timer: 1500,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer);
            toast.addEventListener('mouseleave', Swal.resumeTimer);
          }
        });
      } catch (error) {
        console.error('Erro ao aceitar solicitação:', error);
      }
    },
    async recusarSolicitacao(id) {
      try {
        await axios.put(`http://localhost:3333/transport-requests/${id}/reject`, { maqueiro_id: this.userId });
        this.updateLocalRequestStatus(id, 'Negado');
        eventBus.updated = !eventBus.updated; // Emitir evento
        Swal.fire({
          toast: true,
          position: 'top-right',
          icon: 'success',
          title: 'Solicitação Recusada',
          showConfirmButton: false,
          timer: 1500,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer);
            toast.addEventListener('mouseleave', Swal.resumeTimer);
          }
        });
      } catch (error) {
        console.error('Erro ao recusar solicitação:', error);
      }
    },
    async updateStatus(id, status) {
      try {
        await axios.put(`http://localhost:3333/transport-requests/${id}/status`, { status });
        const item = this.historicos.find(h => h.id === id);
        if (item) {
          item.status = status;
          eventBus.updated = !eventBus.updated; // Emitir evento
        }
      } catch (error) {
        console.error(`Erro ao atualizar status para ${status}:`, error);
      }
    },
    updateLocalRequestStatus(id, request_status) {
      const solicitacao = this.solicitacoes.find(s => s.id === id);
      if (solicitacao) {
        solicitacao.request_status = request_status;
        solicitacao.status = request_status === 'Aceito' ? 'Aguardando transporte' : solicitacao.status;
        this.historicos.push(solicitacao);
        this.solicitacoes = this.solicitacoes.filter(s => s.id !== id);
      }
    },
    isEmTransporteEnabled(status) {
      return status === 'Aguardando transporte';
    },
    isChegouAoDestinoEnabled(status) {
      return status === 'Em transporte';
    },
    formatDateTime(dateTime) {
      if (!dateTime) {
        return 'Data inválida';
      }
      const date = new Date(dateTime);
      date.setHours(date.getHours() + 3); 
      const offset = date.getTimezoneOffset() * 60000;
      const localDate = new Date(date.getTime() - offset);

      const day = String(localDate.getDate()).padStart(2, '0');
      const month = String(localDate.getMonth() + 1).padStart(2, '0');
      const year = localDate.getFullYear();
      const hours = String(localDate.getHours()).padStart(2, '0');
      const minutes = String(localDate.getMinutes()).padStart(2, '0');
      const seconds = String(localDate.getSeconds()).padStart(2, '0');
      return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
    }
  }
};
</script>

<style scoped>
@import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css');

.agendamento-container {
  display: flex;
  background-color: #f0f2f5;
  height: 100vh;
}

.agendamento-view {
  padding: 40px;
  flex: 1;
  background-color: #fff;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  margin: 20px;
  overflow-y: auto;
}

h1 {
  font-size: 2em;
  color: #136692;
  margin-bottom: 20px;
}

.solicitacoes, .historico {
  margin-top: 20px;
}

h2 {
  font-size: 1.5em;
  color: #4385A8;
  margin-bottom: 10px;
}

ul {
  list-style: none;
  padding: 0;
}

li {
  margin-bottom: 20px;
}

.solicitacao-info, .historico-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  background: #f5f5f5;
  border-radius: 8px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
}

.solicitacao-info p, .historico-info p {
  margin: 0;
  color: #333;
}

.solicitacao-actions, .historico-actions {
  display: flex;
  gap: 10px;
}

button {
  padding: 10px 15px;
  background-color: #4385A8;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  display: flex;
  align-items: center;
  gap: 5px;
}

button:hover {
  background-color: #136692;
}

button i {
  font-size: 1em;
}

button span {
  font-size: 1em;
}

button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}
</style>
