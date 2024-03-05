<template>
  <div class="content">
    <footer class="custom-footer">
      <p class="text-center custom-footer-text">© 2024 My App</p>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'AppFooter'
}
</script>

<style scoped>
.custom-footer {
  background-color: #1e87f0;
  color: white;
  padding: 20px;
  text-align: center;
  position: fixed;
  bottom: 0;
  width: 100%;
}

.custom-footer-text {
  font-size: 16px;
  margin: 0;
}

.content {
  margin-bottom: 80px;
}
</style>

