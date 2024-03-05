<template>
<div>
<PrivateNavBar />
  <div class="create-invoice-form">
    <h2>Edit Invoice</h2>
    <form @submit.prevent="addInvoice">
      <div class="form-group">
        <label for="invoice_number">Invoice Number:</label>
        <input v-model="invoice_number" id="invoice_number" placeholder="Invoice Number" type="text" required>
      </div>
      <div class="form-group">
        <label for="total_value">Total Value:</label>
        <input v-model="total_value" id="total_value" placeholder="Total Value" type="number" required>
      </div>
      <div class="form-group">
        <label for="client_name">Client Name:</label>
        <input v-model="client_name" id="client_name" placeholder="Client Name" type="text" required>
      </div>
      <div class="form-group">
        <button type="submit">Submit</button>
      </div>
    </form>
    <p class="error">{{ error }}</p>
  </div>
  <Footer />
  </div>
</template>

<script>
import axios from 'axios'
import PrivateNavBar from '../components/PrivateNavBar.vue'
import Footer from '../components/Footer.vue'

export default {
  name: 'EditInvoice',
  components:{
  PrivateNavBar,
  Footer
},
  data() {
    return {
      error: '',
      invoice_number: '',
      total_value: '',
      client_name: ''
    }
  },
  methods: {
    async addInvoice() {
      try {
        const accessToken = localStorage.getItem("token");
        const invoiceId = localStorage.getItem("invoiceId");
        const newInvoice = {
          invoice_number: this.invoice_number,
          total_value: this.total_value,
          client_name: this.client_name
        }
        const response = await axios.put(`http://localhost:80/api/invoice/${invoiceId}`, newInvoice, {
          headers: {
            authorization: `Bearer ${accessToken}`,
          }
        })
        if (response.statusText === 'OK') {
          this.error = null;
          alert("Invoice created successfully!");
        }
      } catch (error) {
        this.error = `Invoice creation failed. ${error.response.data.message}.`;
      }
    }
  }
}
</script>

<style scoped>
.create-invoice-form {
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
input[type="text"],
input[type="number"],
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
</style>

 