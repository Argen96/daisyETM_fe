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
      meta: { requiresAuth: true } 
    },
    {
      path: '/AddInvoice',
      name: 'AddInvoice',
      component: AddInvoice,
      meta: { requiresAuth: true } 
    },
    {
      path: '/EditInvoice',
      name: 'EditInvoice',
      component: EditInvoice,
      meta: { requiresAuth: true } 
    }
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
});


router.beforeEach((to, from, next) => {
  const accessToken = localStorage.getItem('token');
  if (to.matched.some(record => record.meta.requiresAuth)) {
      if (!accessToken) {
          next('/LogIn'); 
      } else {
          next(); 
      }
  } else {
      if (accessToken && (to.name === 'LogIn' || to.name === 'SignUp')) {
          next('/HomePage'); 
      } else {
          next(); 
      }
  }
});

createApp(App).use(router).mount('#app');
