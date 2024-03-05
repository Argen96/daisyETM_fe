<template>
  <div> Create Invoice</div>
    <form @submit.prevent="addInvoice">
     <input v-model="invoice_number" placeholder="Invoice Number" type="text" required>
    <input v-model="total_value" placeholder="Total Value" type="number" required>
    <input v-model="client_name" placeholder="Client Name" type="text" required>
    <input value = "Submit" type="submit">
    </form>
    <div>{{error}}</div>
</template>
 
 <script>
   import axios from 'axios'
  export default {
   name:'AddInvoice',
   data(){
      return{
         error:'',
         invoice_number:"",
         total_value:"",
         client_name:""
      }
   },
   methods : {
  
    async addInvoice(){
      try{
       const accessToken = localStorage.getItem("token");
       const newInvoice = {
         invoice_number : this.invoice_number,
         total_value : this.total_value,
         client_name : this.client_name
         
      }
      const response = await axios.post('http://localhost:80/api/add-invoice', newInvoice,{
         headers: {
          authorization: `Bearer ${accessToken}`,
        }
      })
        if (response.statusText==='OK') {
         this.error = null;
         alert("Post created successfully!");
        }
      }catch(error){
           this.error = `Log In failed. ${error.response.data.message}.`;
      }
   }
  }
  }
 </script>
 