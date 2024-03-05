<template>
  <header class="custom-header">
    <h1 class="custom-header-text" @click="goToHomePage">
      Argen First-Vue_App
    </h1>
    <div class="header-controls">
      <div class="header-controls-right">
        <i class="material-icons" @click="goToHomePage">home</i>
        <i class="material-icons" @click="logout">exit_to_app</i>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  name: 'PrivateNavbar',
  methods: {
    goToHomePage() {
      this.$router.push({ name: 'HomePage' });
    },
    logout() {
      localStorage.removeItem('token');
      this.$router.push({ name: 'LogIn' });
    },
  },
};
</script>

<style scoped>
.custom-header {
  background-color: #1e87f0;
  color: white;
  padding: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.custom-header-text {
  margin: 0; 
  font-size: 24px;
  cursor: pointer;
}

.header-controls {
  display: flex;
  align-items: center;
}

.header-controls-right {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 20px; 
}

.material-icons {
  cursor: pointer;
  font-size: 30px; 
  color: white;
}
</style>