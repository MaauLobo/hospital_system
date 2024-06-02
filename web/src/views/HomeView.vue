<template>
  <div>
    <h1>Home</h1>
    
  </div>
</template>

<script>



export default {
  components: {
   
  },

  beforeRouteEnter(to, from, next) {
    const documentTitle = typeof to.meta.title === 'string' ? to.meta.title : 'Cleriston Transporte';
    document.title = documentTitle;
    next();
  }
}
</script>
