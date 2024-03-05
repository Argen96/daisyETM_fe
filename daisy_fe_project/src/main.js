import { createApp } from 'vue'
import App from './App.vue'
import { createRouter, createWebHistory } from 'vue-router';
import SignUp from './views/SignUp.vue';
import LogIn from './views/LogIn.vue';
import HomePage from './views/HomePage.vue';
import AddInvoice from './views/AddInvoice.vue';
import EditInvoice from './views/EditInvoice.vue';

const routes = [
    {
      path: '/',
      name: 'SignUp',
      component: SignUp,
    },
    {
      path: '/LogIn',
      name: 'LogIn',
      component: LogIn,
    },
    {
      path: '/HomePage',
      name: 'HomePage',
      component: HomePage,
    },
    {
      path: '/AddInvoice',
      name: 'AddInvoice',
      component: AddInvoice,
    },
    {
      path: '/EditInvoice',
      name: 'EditInvoice',
      component: EditInvoice,
    }
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
  });
  
  createApp(App).use(router).mount('#app'); 