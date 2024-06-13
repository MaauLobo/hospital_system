<template>
  <div>
    <button class="toggle-button" @click="toggleSidebar">
      <i class="fas fa-bars"></i>
    </button>
    <div :class="['sidebar', { 'sidebar-open': isSidebarOpen }]">
      <div class="sidebar-header">
        <img src="@/assets/logo-prosel1.png" alt="Prosel Logo" class="logo">
        <h2>Prosel</h2>
      </div>
      <ul class="sidebar-menu">
        <li>
          <router-link to="/dashboard" @click.native="closeSidebarOnMobile">
            <i class="fas fa-tachometer-alt"></i>
            <span>Dashboard</span>
          </router-link>
        </li>
        <li v-if="showRequests">
          <router-link to="/request" @click.native="closeSidebarOnMobile">
            <i class="fas fa-bell"></i>
            <span>Solicitações</span>
          </router-link>
        </li>
        <li>
          <router-link to="/sheduling" @click.native="closeSidebarOnMobile">
            <i class="fas fa-calendar-alt"></i>
            <span>Agendamentos</span>
          </router-link>
        </li>
      </ul>
      <div class="sidebar-footer">
        <div class="user-info">
          <div class="user-detail">
            <i class="fas fa-user"></i>
            <span>{{ name }}</span>
          </div>
          <div class="role-detail">
            <i class="fas fa-id-badge"></i>
            <span>{{ role }}</span>
          </div>
        </div>
        <a href="#" @click.prevent="confirmLogout">
          <i class="fas fa-sign-out-alt"></i>
        </a>
      </div>
    </div>
  </div>
</template>


<script>
import { useRouter } from 'vue-router';
import Swal from 'sweetalert2';
import { jwtDecode } from 'jwt-decode';
import { ref, computed } from 'vue';

export default {
  name: 'Sidebar',
  setup() {
    const router = useRouter();

    const name = ref('');
    const role = ref('');
    const perms = ref('');

    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken = jwtDecode(token);
      name.value = decodedToken.name || 'Desconhecido';
      role.value = decodedToken.role || 'Desconhecido';
      perms.value = decodedToken.perms || '';
    }

    const showRequests = computed(() => {
      return !(perms.value === 'User' && role.value === 'Maqueiro');
    });

    const confirmLogout = () => {
      Swal.fire({
        title: 'Tem certeza?',
        text: "Você está prestes a sair!",
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sim, sair!'
      }).then((result) => {
        if (result.isConfirmed) {
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          Swal.fire({
            icon: 'success',
            title: 'Logout efetuado com sucesso!',
            showConfirmButton: false,
            timer: 1500
          }).then(() => {
            router.push({ name: 'login' });
          });
        }
      });
    };

    const isSidebarOpen = ref(false);

    const toggleSidebar = () => {
      isSidebarOpen.value = !isSidebarOpen.value;
    };

    const closeSidebarOnMobile = () => {
      if (window.innerWidth <= 768) {
        isSidebarOpen.value = false;
      }
    };

    return {
      confirmLogout,
      showRequests,
      name,
      role,
      isSidebarOpen,
      toggleSidebar,
      closeSidebarOnMobile
    };
  }
};
</script>


<style scoped>
@import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css');

.toggle-button {
  display: none;
  position: absolute;
  top: 10px;
  left: 10px;
  background: #4385A8;
  color: white;
  border: none;
  padding: 10px;
  border-radius: 5px;
  cursor: pointer;
  z-index: 1001;
}

.sidebar {
  width: 70px;
  height: 100vh;
  background: linear-gradient(to right, #4385A8, #136692);
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  transition: width 0.3s ease;
  z-index: 1000;
  position: relative;
}

.sidebar:hover,
.sidebar.sidebar-open {
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

.sidebar-header img.logo {
  height: 40px;
  margin-right: 10px;
}

.sidebar-header h2 {
  margin: 0;
  font-size: 1.5em;
  display: none;
}

.sidebar:hover .sidebar-header h2,
.sidebar.sidebar-open .sidebar-header h2 {
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

.sidebar:hover .sidebar-menu a span,
.sidebar.sidebar-open .sidebar-menu a span {
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
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.sidebar-footer .user-info {
  display: none;
  flex-grow: 1;
  flex-direction: column;
  align-items: flex-start;
}

.sidebar-footer .user-detail,
.sidebar-footer .role-detail {
  display: flex;
  align-items: center;
  margin-bottom: 5px;
}

.sidebar-footer .user-detail i,
.sidebar-footer .role-detail i {
  margin-right: 10px;
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

.sidebar:hover .sidebar-footer .user-info,
.sidebar.sidebar-open .sidebar-footer .user-info {
  display: flex;
}

.sidebar-footer a:hover {
  background-color: rgba(0, 0, 0, 0.2);
}

.sidebar:hover .sidebar-footer a,
.sidebar.sidebar-open .sidebar-footer a {
  margin-left: auto;
  transform: scaleX(-1);
}

@media (max-width: 768px) {
  .toggle-button {
    display: block;
  }

  .sidebar {
    position: fixed;
    left: -250px;
    transition: left 0.3s ease, width 0.3s ease;
  }

  .sidebar-open {
    left: 0;
    width: 250px;
  }

  
  .sidebar:hover .sidebar-header h2,
  .sidebar:hover .sidebar-menu a span,
  .sidebar:hover .sidebar-footer .user-info {
    display: none;
  }

  .sidebar.sidebar-open .sidebar-header h2,
  .sidebar.sidebar-open .sidebar-menu a span,
  .sidebar.sidebar-open .sidebar-footer .user-info {
    display: block;
  }
}
</style>

