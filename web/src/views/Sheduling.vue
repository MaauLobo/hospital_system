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
                <p>Paciente: {{ solicitacao.paciente }}</p>
                <p>Destino: {{ solicitacao.destino }}</p>
                <p>Hora: {{ solicitacao.hora }}</p>
              </div>
              <div class="solicitacao-actions">
                <button @click="aceitarSolicitacao(solicitacao.id)">
                  <i class="fas fa-check"></i>
                  <span>Aceitar</span>
                </button>
                <button @click="recusarSolicitacao(solicitacao.id)">
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
                <p>Paciente: {{ historico.paciente }}</p>
                <p>Destino: {{ historico.destino }}</p>
                <p>Hora: {{ historico.hora }}</p>
                <p>Status: {{ historico.status }}</p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import Sidebar from '@/components/sidebar.vue';
  
  export default {
    name: 'AgendamentoView',
    components: {
      Sidebar
    },
    data() {
      return {
        solicitacoes: [],
        historicos: [],
      };
    },
    created() {
      this.fetchSolicitacoes();
      this.fetchHistorico();
    },
    methods: {
      fetchSolicitacoes() {
        // Simulação de dados de solicitações
        this.solicitacoes = [
          { id: 1, paciente: 'João Silva', destino: 'Sala 101', hora: '10:00' },
          { id: 2, paciente: 'Maria Oliveira', destino: 'Sala 202', hora: '11:00' },
        ];
      },
      fetchHistorico() {
        // Simulação de dados de histórico
        this.historicos = [
          { id: 1, paciente: 'José Souza', destino: 'Sala 303', hora: '09:00', status: 'Aceito' },
          { id: 2, paciente: 'Ana Santos', destino: 'Sala 404', hora: '08:00', status: 'Recusado' },
        ];
      },
      aceitarSolicitacao(id) {
        const solicitacao = this.solicitacoes.find(s => s.id === id);
        solicitacao.status = 'Aceito';
        this.historicos.push(solicitacao);
        this.solicitacoes = this.solicitacoes.filter(s => s.id !== id);
      },
      recusarSolicitacao(id) {
        const solicitacao = this.solicitacoes.find(s => s.id === id);
        solicitacao.status = 'Recusado';
        this.historicos.push(solicitacao);
        this.solicitacoes = this.solicitacoes.filter(s => s.id !== id);
      },
    },
  };
  </script>
  
  <style scoped>
  .agendamento-container {
    display: flex;
    min-height: 100vh;
    background-color: #f0f2f5;
  }
  
  .agendamento-view {
    padding: 40px;
    flex: 1;
    background-color: #fff;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    border-radius: 8px;
    margin: 20px;
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
  
  .solicitacao-actions {
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
  </style>
  