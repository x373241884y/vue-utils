import ext from './extend';
import componentsR from './components';
import directiveR from './directive';
import filterR from './filter';
import serviceR from './service';

function install(Vue) {
	if (install.installed) return;
	install.installed = true;
	Vue.util.extend(Vue.util, ext);
	componentsR(Vue);
	directiveR(Vue);
	filterR(Vue);
	serviceR(Vue);
}

const Vm2utils = {
	install: install,
};

if (typeof window !== undefined && window.Vue) {
	window.Vue.use(Vm2utils);
}

export default Vm2utils