<template>
  <div>
    <PrivateNavBar />
    <div class="home-page">
      <button @click="goToAddPage" class="add-invoice-btn">
        <i class="fas fa-plus"></i> Add Invoice
      </button>
      <table class="invoice-table">
        <thead>
          <tr>
            <th>Invoice Number</th>
            <th>Total Value</th>
            <th>Client Name</th>
            <th>Date Added</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="invoice in invoices" :key="invoice._id">
            <td>{{ invoice.invoice_number }}</td>
            <td>{{ invoice.total_value }}</td>
            <td>{{ invoice.client_name }}</td>
            <td>{{ invoice.date_added }}</td>
            <td>
              <button @click="editInvoice(invoice._id)" class="edit-btn">
                <i class="fas fa-edit"></i> Edit
              </button>
              <button @click="deleteInvoice(invoice._id)" class="delete-btn">
                <i class="fas fa-trash-alt"></i> Delete
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <Footer />
  </div>
</template>

<script>
import axios from 'axios'
import PrivateNavBar from '../components/PrivateNavBar.vue'
import Footer from '../components/Footer.vue'

export default {
  name: 'HomePage',
  components: {
    PrivateNavBar,
    Footer
  },
  data() {
    return {
      invoices: [],
      token: '',
      error: null
    };
  },
  async mounted() {
    await this.fetchInvoices();
  },
  methods: {
    async goToAddPage() {
      this.$router.push({ name: "AddInvoice" });
    },
    async fetchInvoices() {
      try {
        const accessToken = localStorage.getItem('token');
        const response = await axios.get('http://localhost:80/api/invoices', {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        if (response.statusText === 'OK') {
          this.invoices = response.data;
        }
      } catch (error) {
        this.error = error.message;
      }
    },
    async deleteInvoice(invoiceId) {
      try {
        const accessToken = localStorage.getItem('token');
        const response = await axios.delete(`http://localhost:80/api/invoice/${invoiceId}`, {
          headers: {
            authorization: `Bearer ${accessToken}`,
          },
        });
        console.log(response);
        await this.fetchInvoices();
      } catch (error) {
        console.error(error);
      }
    },
     editInvoice(invoiceId) {
       localStorage.setItem('invoiceId', invoiceId);
       this.$router.push({ name: "EditInvoice" });
     }
  }
};
</script>

<style scoped>
.home-page {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.invoice-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
}

.invoice-table th,
.invoice-table td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
}

.invoice-table th {
  background-color: #f2f2f2;
}

.add-invoice-btn,
.edit-btn,
.delete-btn {
  background-color: #007bff;
  color: #fff;
  border: none;
  padding: 8px 15px;
  border-radius: 5px;
  cursor: pointer;
  margin-right: 5px;
}

.add-invoice-btn:hover,
.edit-btn:hover,
.delete-btn:hover {
  background-color: #0056b3;
}

.add-invoice-btn i,
.edit-btn i,
.delete-btn i {
  margin-right: 5px;
}
</style>
