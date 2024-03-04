<template>
<div>
    <div> LogIn</div>
    <form @submit.prevent="logIn">
     <input v-model="email" placeholder="Email" type="email" required>
    <input v-model="password" placeholder="Password" type="password" required>
    <input value = "Submit" type="submit">
    </form>
    <div>{{error}}</div>
    </div>
</template> 

<script>
import axios from 'axios'
export default {
    name:'LogIn',
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