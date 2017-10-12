import Vue from 'vue'
import VueRouter from 'vue-router'

import Vm2utils from 'vm2-utils'

Vue.use(VueRouter);
Vue.use(Vm2utils);

// Vue.config.silent = true

import App from './App.vue'

import Index from './components/Index.vue'
import Amount from './components/Amount.vue'
import Timebtn from './components/Timebtn.vue'

const routes = [
	{path: '/', component: Index},
	{path: '/amount', component: Amount},
	{path: '/timebtn', component: Timebtn},
];

const router = new VueRouter({
	routes
});

new Vue({
	router,
	el: '#app',
	template: '<App/>',
	components: {
		App
	}
});