<template>
  <div class="sidebar">
    <div class="sidebar-header">
      <i class="fas fa-bars"></i>
      <h2>Menu</h2>
    </div>
    <ul class="sidebar-menu">
      <li>
        <a href="#">
          <i class="fas fa-tachometer-alt"></i>
          <span>Dashboard</span>
        </a>
      </li>
      <li>
        <a href="#">
          <i class="fas fa-user"></i>
          <span>Pacientes</span>
        </a>
      </li>
      <li>
        <router-link to="/sheduling">
          <i class="fas fa-calendar-alt"></i>
          <span>Agendamentos</span>
        </router-link>
      </li>
      <li>
      <li>
        <router-link to="/tracking">
          <i class="fas fa-compass"></i>
          <span>Rastreamento</span>
        </router-link>
      </li>
      <a href="#">
        <i class="fas fa-chart-line"></i>
        <span>Relatórios</span>
      </a>
      </li>
      <li>
        <a href="#">
          <i class="fas fa-cog"></i>
          <span>Configurações</span>
        </a>
      </li>
    </ul>
    <div class="sidebar-footer">
      <a href="#">
        <i class="fas fa-sign-out-alt"></i>
        <span>Logout</span>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Sidebar',
};
</script>

<style scoped>
@import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css');

.sidebar {
  width: 70px;
  height: 100vh;
  background: linear-gradient(to right, #4385A8, #136692);
  /* Gradiente de fundo */
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  transition: width 0.3s ease;
}

.sidebar:hover {
  width: 250px;
}

.sidebar-header {
  padding: 20px;
  text-align: center;
  background-color: rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
}

.sidebar-header i {
  margin-right: 10px;
}

.sidebar-header h2 {
  margin: 0;
  font-size: 1.5em;
  display: none;
}

.sidebar:hover .sidebar-header h2 {
  display: block;
}

.sidebar-menu {
  list-style: none;
  padding: 0;
  margin: 0;
}

.sidebar-menu li {
  width: 100%;
}

.sidebar-menu a {
  display: flex;
  align-items: center;
  padding: 15px 20px;
  color: white;
  text-decoration: none;
  transition: background 0.3s ease;
}

.sidebar-menu a i {
  margin-right: 10px;
}

.sidebar-menu a span {
  display: none;
}

.sidebar:hover .sidebar-menu a span {
  display: inline;
}

.sidebar-menu a:hover {
  background-color: rgba(0, 0, 0, 0.2);
}

.sidebar-menu a.active {
  background-color: rgba(0, 0, 0, 0.3);
}

.sidebar-footer {
  padding: 20px;
  margin-top: auto;
}

.sidebar-footer a {
  display: flex;
  align-items: center;
  color: white;
  text-decoration: none;
  transition: background 0.3s ease;
}

.sidebar-footer a i {
  margin-right: 10px;
}

.sidebar-footer a span {
  display: none;
}

.sidebar:hover .sidebar-footer a span {
  display: inline;
}

.sidebar-footer a:hover {
  background-color: rgba(0, 0, 0, 0.2);
}
</style>