
<template>
<div>
<div>Sign Up</div>
<form @submit.prevent="signUp">
    <input v-model="first_name" placeholder="First Name"  type="text" required>
    <input v-model="last_name" placeholder="Last_name" type="text" required>
    <input v-model="email" placeholder="Email" type="email" required>
    <input v-model="password" placeholder="Password" type="password" required>
    <input v-model="phone_number" placeholder="Phone Number" type="number">
    <input v-model="address" placeholder="Address" type="text">
    <input v-model="city" placeholder="City" type="text">
    <input value="Submit"  type="submit">
</form>
{{error}}
</div>
</template>

<script>
import axios from "axios";

export default{
name:'SignUp',
components:{

},
data(){
return {
 first_name:'',
 last_name : '',
 email : '',
 password : '',
 phone_number : '',
 address: "" ,
 city : '',
 error: null,
};
},
methods:{
async signUp(){
 const user = {
 first_name: this.first_name,
 last_name : this.last_name,
 email : this.email,
 password : this.password,
 phone_number : this.phone_number,
 address : this.address,
 city : this.city,
 }
try {
      const response = await axios.post("http://localhost:80/api/sign-up/", user); 
      if (response.statusText==='OK') {
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

