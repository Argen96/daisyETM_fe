<template>
<button @click="goToAddPage">Add Invoice</button>
</template>

<script>
 export default{
    name:'HomePage',
    data(){
        return{
            invoices:[],
            token:''
        }
    },
    methods : {
       goToAddPage() {
         this.$router.push({ name: "AddInvoice" });
       }
    }
 }
</script>