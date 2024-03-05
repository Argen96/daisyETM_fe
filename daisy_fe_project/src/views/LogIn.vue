<template>
  <div class="wrapper">
    <PublicNavBar />
    <div class="content">
      <div class="login-form">
        <h2>Log In</h2>
        <form @submit.prevent="logIn">
          <div class="form-group">
            <label for="email">Email:</label>
            <input v-model="email" id="email" placeholder="Email" type="email" required>
          </div>
          <div class="form-group">
            <label for="password">Password:</label>
            <input v-model="password" id="password" placeholder="Password" type="password" required>
          </div>
          <div class="form-group">
            <button type="submit">Submit</button>
          </div>
        </form>
        <p class="error">{{ error }}</p>
      </div>
    </div>
    <FooterBar />
  </div>
</template>

<script>
import axios from 'axios'
import PublicNavBar from '../components/PublicNavBar.vue'
import FooterBar from '../components/Footer.vue'

export default {
    name:'LogIn',
    components: {
    PublicNavBar,
    FooterBar
  },
    data(){
        return{
            email:'',
            password:'',
            error:''
        }
    },
    methods:{
        async logIn(){
            const user = {
              email:this.email,
              password:this.password
            }
        try {
      const response = await axios.post("http://localhost:80/api/log-in", user); 
      if (response.statusText==='OK') {
        this.error = null;
        localStorage.setItem('token', response.data.token);
        this.$router.push({ name: "HomePage" });
      } 
    } catch (error) {
      this.error = `Log In failed. ${error.response.data.message}.`;
    }
  },
},
}
</script>

<style scoped>
.login-form {
  max-width: 400px;
  margin: 0 auto;
}
.form-group {
  margin-bottom: 1rem;
}
label {
  display: block;
  font-weight: bold;
}
input[type="email"],
input[type="password"],
button {
  width: 100%;
  padding: 0.5rem;
  margin-top: 0.5rem;
  border-radius: 0.25rem;
  border: 1px solid #ccc;
}
button {
  background-color: #007bff;
  color: #fff;
  cursor: pointer;
}
button:hover {
  background-color: #0056b3;
}
.error {
  color: red;
}

html, body {
  height: 100%;
  margin: 0;
  padding: 0;
}

.wrapper {
  display: flex;
  flex-direction: column;
  min-height: 100%;
}

.content {
  flex: 1;
}

footer {
  background-color: #333;
  color: #fff;
  text-align: center;
  padding: 20px 0;
  position: fixed;
  bottom: 0;
  width: 100%;
}
</style>
