<template>
  <div class="home">
    <Sidebar />
    <div class="main-content">
      <h1>Home</h1>
      <!-- Seu conteúdo adicional aqui -->
    </div>
  </div>
</template>

<script>
import Sidebar from '@/components/sidebar.vue';

export default {
  components: {
    Sidebar
  },

  beforeRouteEnter(to, from, next) {
    const documentTitle = typeof to.meta.title === 'string' ? to.meta.title : 'Cleriston Transporte';
    document.title = documentTitle;
    next();
  }
}
</script>

<style scoped>
.home {
  display: flex;
}

.main-content {
  flex: 1;
  padding: 20px;
  background-color: #f0f0f0;
}
</style>
