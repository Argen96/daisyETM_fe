<template>
  <div>
    <PublicNavBar />
    <div class="content">
      <div class="sign-up-form">
        <h2 class="signUp_h2">Sign Up</h2>
        <form @submit.prevent="signUp">
          <div class="form-group">
            <label for="first_name">First Name:</label>
            <input v-model="first_name" id="first_name" placeholder="First Name" type="text" required>
          </div>
          <div class="form-group">
            <label for="last_name">Last Name:</label>
            <input v-model="last_name" id="last_name" placeholder="Last Name" type="text" required>
          </div>
          <div class="form-group">
            <label for="email">Email:</label>
            <input v-model="email" id="email" placeholder="Email" type="email" required>
          </div>
          <div class="form-group">
            <label for="password">Password:</label>
            <input v-model="password" id="password" placeholder="Password" type="password" required>
          </div>
          <div class="form-group">
            <label for="phone_number">Phone Number:</label>
            <input v-model="phone_number" id="phone_number" placeholder="Phone Number" type="number">
          </div>
          <div class="form-group">
            <label for="address">Address:</label>
            <input v-model="address" id="address" placeholder="Address" type="text">
          </div>
          <div class="form-group">
            <label for="city">City:</label>
            <input v-model="city" id="city" placeholder="City" type="text">
          </div>
          <div class="form-group">
            <button type="submit">Submit</button>
          </div>
        </form>
        <div class="navigation-links">
          <router-link to="/login">Already have an account? Log in</router-link>
        </div>
         <p class="error">{{ error }}</p>
      </div>
    </div>
    <FooterBar/>
  </div>
</template>

<script>
import axios from 'axios'
import PublicNavBar from '../components/PublicNavBar.vue'
import FooterBar from '../components/Footer.vue'

export default {
  name: 'SignUp',
  components: {
    PublicNavBar,
    FooterBar
  },
  data() {
    return {
      first_name: '',
      last_name: '',
      email: '',
      password: '',
      phone_number: '',
      address: '',
      city: '',
      error: null,
    };
  },
  methods: {
    async signUp() {
      const user = {
        first_name: this.first_name,
        last_name: this.last_name,
        email: this.email,
        password: this.password,
        phone_number: this.phone_number,
        address: this.address,
        city: this.city,
      }
      try {
        const response = await axios.post("http://localhost:80/api/sign-up/", user);
        if (response.statusText === 'OK') {
          this.error = null;
          alert("Sign Up successful!");
          this.$router.push({ name: "LogIn" });
        }
      } catch (error) {
        this.error = `Sign up failed. ${error.response.data.message}.`;
      }
    },
  },
}
</script>

<style scoped>
 .signUp_h2{
  text-align: center;
  color:#0056b3;
  text-decoration: #007bff;
  font-family: Georgia, 'Times New Roman', Times, serif;
 }
  .sign-up-form {
    max-width: 600px;
    margin: 0 auto;
  }
  .form-group {
    margin-bottom: 1rem;
    display: inline-block;
    width: 45%; /* Adjust width as needed */
    margin-right: 2%; /* Adjust margin between inputs */
  }
  .form-group:last-child {
    margin-right: 0;
  }
  label {
    display: block;
    font-weight: bold;
    color:rgb(26, 110, 158)
  }
  input[type="text"],
  input[type="email"],
  input[type="password"],
  input[type="number"] {
    width: calc(100% - 1rem);
    padding: 0.5rem;
    border-radius: 0.25rem;
    border: 1px solid #ccc;
    display: block;
    margin-bottom: 0.5rem;
  }
  button {
    padding: 0.5rem 1rem;
    border-radius: 0.25rem;
    border: 1px solid #ccc;
    background-color: #007bff;
    color: #fff;
    cursor: pointer;
    display: inline-block;
    vertical-align: middle;
  }
  button:hover {
    background-color: #0056b3;
  }
  .error {
    color: red;
  }
  .navigation-links {
    margin-top: 1rem;
    text-align: center;
    width: 100%;
  }
</style>




