import Vue from 'vue';
import Router from 'vue-router';

import CustomersListPage from './pages/CustomersList';
import CustomersFormPage from './pages/CustomersForm';
import Page404 from './pages/404';

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            component: CustomersFormPage
        },
        {
            path: '/list',
            component: CustomersListPage
        },
        {
            path: '*',
            component: Page404
        },
    ],
    mode: 'history'
})