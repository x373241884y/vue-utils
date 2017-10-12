/**
 * define common components
 */
import current from './current.vue';
import amount from './amount';
import onlynumber from './onlynumber';
import timebtn from './timebtn';

export default function (Vue) {
	Vue.component('current-input', current);
	Vue.component('ui-amount', amount);
	Vue.component('onlynumber', onlynumber);
	Vue.component('timebtn', timebtn);
	// Vue.component('current-input', current);
	// Vue.component('current-input', current);
}