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
            <td>{{ invoice.total_value }}$</td>
            <td>{{ invoice.client_name }}</td>
            <td>{{ invoice.date_added }}</td>
            <td>
              <button @click="editInvoice(invoice._id)" class="edit-btn">
                <i class="fas fa-edit"></i> Edit
              </button>
              <button @click="showDeleteModal(invoice._id)" class="delete-btn">
                <i class="fas fa-trash-alt"></i> Delete
              </button>
            </td>
          </tr>
        </tbody>
      </table>
      <div class="total-values">Total Values: {{totalValues}}$</div>
    </div>
    <Footer />
    
    <div class="modal" v-if="showModal">
      <div class="modal-content">
        <p>Are you sure you want to delete this invoice?</p>
        <div>
          <button @click="deleteInvoiceConfirmed" class="confirm-btn">Yes</button>
          <button @click="hideModal" class="cancel-btn">No</button>
        </div>
      </div>
    </div>
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
      error: null,
      showModal: false,
      invoiceToDelete: null,
      totalValues : ''
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
            authorization: `Bearer ${accessToken}`,
          },
        });
        if (response.statusText === 'OK') {
          this.invoices = response.data.invoices;
          this.totalValues = response.data.totalValues
          console.log(this.totalValues)
        }
      } catch (error) {
        this.error = error.message;
      }
    },
    async deleteInvoice(invoiceId) {
      try {
        const accessToken = localStorage.getItem('token');
         await axios.delete(`http://localhost:80/api/invoice/${invoiceId}`, {
          headers: {
            authorization: `Bearer ${accessToken}`,
          },
        });
        await this.fetchInvoices();
      } catch (error) {
        console.error(error);
      }
    },
    editInvoice(invoiceId) {
      localStorage.setItem('invoiceId', invoiceId);
      this.$router.push({ name: "EditInvoice" });
    },
    showDeleteModal(invoiceId) {
      this.invoiceToDelete = invoiceId;
      this.showModal = true;
    },
    hideModal() {
      this.showModal = false;
      this.invoiceToDelete = null;
    },
    async deleteInvoiceConfirmed() {
      if (this.invoiceToDelete) {
        await this.deleteInvoice(this.invoiceToDelete);
        this.hideModal();
      }
    }
  }
};
</script>

<style scoped>
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  background-color: #fff;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.5);
  margin-left: 4em;
}

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
  text-align: center;
 font-family: Arial, Helvetica, sans-serif;
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

.add-invoice-btn i,
.edit-btn i,
.delete-btn i {
  margin-right: 5px;
}
.add-invoice-btn{
margin-left: 24em;
background: rgb(49, 203, 49);
}
.total-values {
  margin-top: 20px;
  font-size: 18px;
  font-weight: bold;
  color: #333;
  border: 2px solid #ccc;
  padding: 10px;
  background-color: #f9f9f9;
  text-align: center;
}
.edit-btn{
  background: rgb(203, 138, 17);
}
.delete-btn{
  background: rgb(210, 29, 29);
}
</style>
