import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import router from './router';
import VueNotification from '@kugatsu/vuenotification';
import { VueMaskDirective } from 'v-mask'

Vue.config.productionTip = false
Vue.use(VueNotification, { timer: 5 });
Vue.directive('mask', VueMaskDirective);

new Vue({
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')
