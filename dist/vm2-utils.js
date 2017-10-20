/*!
 * Vue utils 
 * version: v0.0.1 
 * repo: http://github.com/x373241884y/vm2-utils 
 * build: 2017-10-20 11:10:29
 */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("vm2-utils", [], factory);
	else if(typeof exports === 'object')
		exports["vm2-utils"] = factory();
	else
		root["vm2-utils"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 9);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

exports.default = function (Vue) {
	Vue.component('current-input', _current2.default);
	Vue.component('ui-amount', _amount2.default);
	Vue.component('onlynumber', _onlynumber2.default);
	Vue.component('timebtn', _timebtn2.default);
	// Vue.component('current-input', current);
	// Vue.component('current-input', current);
};

var _current = __webpack_require__(10);

var _current2 = _interopRequireDefault(_current);

var _amount = __webpack_require__(6);

var _amount2 = _interopRequireDefault(_amount);

var _onlynumber = __webpack_require__(7);

var _onlynumber2 = _interopRequireDefault(_onlynumber);

var _timebtn = __webpack_require__(8);

var _timebtn2 = _interopRequireDefault(_timebtn);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (Vue) {
  //register directive...
};

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var objectPath = function () {
	'use strict';

	var toStr = Object.prototype.toString;

	function hasOwnProperty(obj, prop) {
		if (obj == null) {
			return false;
		}
		//to handle objects with null prototypes (too edge case?)
		return Object.prototype.hasOwnProperty.call(obj, prop);
	}

	function isEmpty(value) {
		if (!value) {
			return true;
		}
		if (isArray(value) && value.length === 0) {
			return true;
		} else if (typeof value !== 'string') {
			for (var i in value) {
				if (hasOwnProperty(value, i)) {
					return false;
				}
			}
			return true;
		}
		return false;
	}

	function toString(type) {
		return toStr.call(type);
	}

	function isObject(obj) {
		return (typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) === 'object' && toString(obj) === "[object Object]";
	}

	var isArray = Array.isArray || function (obj) {
		/*istanbul ignore next:cant test*/
		return toStr.call(obj) === '[object Array]';
	};

	function isBoolean(obj) {
		return typeof obj === 'boolean' || toString(obj) === '[object Boolean]';
	}

	function getKey(key) {
		var intKey = parseInt(key);
		if (intKey.toString() === key) {
			return intKey;
		}
		return key;
	}

	function factory(options) {
		options = options || {};

		var objectPath = function objectPath(obj) {
			return Object.keys(objectPath).reduce(function (proxy, prop) {
				if (prop === 'create') {
					return proxy;
				}

				/*istanbul ignore else*/
				if (typeof objectPath[prop] === 'function') {
					proxy[prop] = objectPath[prop].bind(objectPath, obj);
				}

				return proxy;
			}, {});
		};

		function hasShallowProperty(obj, prop) {
			return options.includeInheritedProps || typeof prop === 'number' && Array.isArray(obj) || hasOwnProperty(obj, prop);
		}

		function getShallowProperty(obj, prop) {
			if (hasShallowProperty(obj, prop)) {
				return obj[prop];
			}
		}

		function set(obj, path, value, doNotReplace) {
			if (typeof path === 'number') {
				path = [path];
			}
			if (!path || path.length === 0) {
				return obj;
			}
			if (typeof path === 'string') {
				return set(obj, path.split('.').map(getKey), value, doNotReplace);
			}
			var currentPath = path[0];
			var currentValue = getShallowProperty(obj, currentPath);
			if (path.length === 1) {
				if (currentValue === void 0 || !doNotReplace) {
					obj[currentPath] = value;
				}
				return currentValue;
			}

			if (currentValue === void 0) {
				//check if we assume an array
				if (typeof path[1] === 'number') {
					obj[currentPath] = [];
				} else {
					obj[currentPath] = {};
				}
			}

			return set(obj[currentPath], path.slice(1), value, doNotReplace);
		}

		objectPath.has = function (obj, path) {
			if (typeof path === 'number') {
				path = [path];
			} else if (typeof path === 'string') {
				path = path.split('.');
			}

			if (!path || path.length === 0) {
				return !!obj;
			}

			for (var i = 0; i < path.length; i++) {
				var j = getKey(path[i]);

				if (typeof j === 'number' && isArray(obj) && j < obj.length || (options.includeInheritedProps ? j in Object(obj) : hasOwnProperty(obj, j))) {
					obj = obj[j];
				} else {
					return false;
				}
			}

			return true;
		};

		objectPath.set = function (obj, path, value, doNotReplace) {
			return set(obj, path, value, doNotReplace);
		};

		objectPath.get = function (obj, path, defaultValue) {
			if (typeof path === 'number') {
				path = [path];
			}
			if (!path || path.length === 0) {
				return obj;
			}
			if (obj == null) {
				return defaultValue;
			}
			if (typeof path === 'string') {
				return objectPath.get(obj, path.split('.'), defaultValue);
			}

			var currentPath = getKey(path[0]);
			var nextObj = getShallowProperty(obj, currentPath);
			if (nextObj === void 0) {
				return defaultValue;
			}

			if (path.length === 1) {
				return nextObj;
			}

			return objectPath.get(obj[currentPath], path.slice(1), defaultValue);
		};

		objectPath.del = function del(obj, path) {
			if (typeof path === 'number') {
				path = [path];
			}

			if (obj == null) {
				return obj;
			}

			if (isEmpty(path)) {
				return obj;
			}
			if (typeof path === 'string') {
				return objectPath.del(obj, path.split('.'));
			}

			var currentPath = getKey(path[0]);
			if (!hasShallowProperty(obj, currentPath)) {
				return obj;
			}

			if (path.length === 1) {
				if (isArray(obj)) {
					obj.splice(currentPath, 1);
				} else {
					delete obj[currentPath];
				}
			} else {
				return objectPath.del(obj[currentPath], path.slice(1));
			}

			return obj;
		};
		return objectPath;
	}

	return factory();
}();

exports.default = {
	addClass: function addClass(el, cls) {
		if (!cls || !(cls = cls.trim())) {
			return;
		}
		if (el.classList) {
			if (cls.indexOf(' ') > -1) {
				cls.split(/\s+/).forEach(function (c) {
					return el.classList.add(c);
				});
			} else {
				el.classList.add(cls);
			}
		} else {
			var cur = " " + (el.getAttribute('class') || '') + " ";
			if (cur.indexOf(' ' + cls + ' ') < 0) {
				el.setAttribute('class', (cur + cls).trim());
			}
		}
	},
	removeClass: function removeClass(el, cls) {
		if (!cls || !(cls = cls.trim())) {
			return;
		}
		if (el.classList) {
			if (cls.indexOf(' ') > -1) {
				cls.split(/\s+/).forEach(function (c) {
					return el.classList.remove(c);
				});
			} else {
				el.classList.remove(cls);
			}
		} else {
			var cur = " " + (el.getAttribute('class') || '') + " ";
			var tar = ' ' + cls + ' ';
			while (cur.indexOf(tar) >= 0) {
				cur = cur.replace(tar, ' ');
			}
			el.setAttribute('class', cur.trim());
		}
	},
	on: function on(el, event, cb, useCapture) {
		el.addEventListener(event, cb, useCapture);
	},
	off: function off(el, event, cb) {
		el.removeEventListener(event, cb);
	},
	findVModelName: function findVModelName(vnode) {
		var vModel = vnode.data.directives.find(function (o) {
			//Search the vModelName attached to the element
			return o.name === 'model';
		});
		return vModel && vModel.expression;
	},
	setVModelValue: function setVModelValue(value, vnode) {
		vnode.context[this.findVModelName(vnode)] = value;
	},
	get: objectPath.get,
	set: objectPath.set,
	has: objectPath.has
};

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (Vue) {
  //register filter...
};

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (Vue) {
  //register service...
};

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = {
	template: '<input ref="input" v-bind:value="value" v-on:input="updateValue($event.target.value)">',
	props: ['value', 'max'],
	mounted: function mounted() {
		this._lastValidValue = this.$refs.input.value;
	},
	methods: {
		updateValue: function updateValue(value) {
			if (value == undefined) return '';
			if (this.max && value.length > this.max) {
				this.$refs.input.value = this._lastValidValue;
				this.$emit('input', Number(this._lastValidValue));
				return;
			}
			var transformInput = value.replace(/[^0-9]/g, '');
			if (transformInput != value) {
				this.$refs.input.value = transformInput;
			}
			this._lastValidValue = transformInput;
			this.$emit('input', Number(transformInput));
		}
	}
};

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
/**
 * usage:
 * default:  mode:12.2,format:true,decimals:2
 * <ui-amount  placeholder="请输入转入金额" name="amount" v-model="amount" mode="8.2" format="false" decimals="3"></ui-amount>
 */

var decimalSeparator = '.';
var groupSeparator = ',';
var NUMBER_REGEXP = /^\s*(\-|\+)?(\d+|(\d*(\.\d*)))\s*$/;
var MODE_REGEXP = /^(\d+)(\.(\d+))?$/;

exports.default = {
	template: '<input ref="input" v-bind:value="value" @input="parseViewValue($event.target.value)" @blur="blurHandler" @focus="focusHandler" >',
	props: ['value', 'decimals', 'mode', 'max', 'format'],
	mounted: function mounted() {
		this.decimal = /^\d+$/.test(this.decimals) ? parseInt(this.decimals, 10) : 2; // Number of decimals. Default 2.
		this.formatting = this.format == 'false' ? false : true; //default true
		if (MODE_REGEXP.test(this.mode)) {
			this.intLength = parseInt(RegExp.$1, 10);
			this.dotLength = RegExp.$2 && parseInt(RegExp.$3, 10);
		} else {
			this.intLength = 12;
			this.dotLength = 2;
		}
		this.inputEl = this.$refs['input'];
		this.formatViewValue(this.value);
		this.$setViewValue(this.value);
	},
	methods: {
		parseViewValue: function parseViewValue(value) {
			// Handle leading decimal point, like ".5"
			if (value.indexOf('.') === 0) {
				value = '0' + value;
			}
			if (value == undefined || value == '') {
				this.$setViewValue('');
			}
			if (NUMBER_REGEXP.test(value)) {
				var index = value.indexOf('.');
				if (index > 0) {
					var intString = value.substring(0, index);
					var dotString = value.substring(index + 1, value.length);
					if (intString.length > this.intLength || dotString.length > this.dotLength) {
						// Render the last valid input in the field
						this.renderLastValidValue();
					} else {
						this.$setViewValue(parseFloat(value, 10));
					}
				} else {
					if (value.length > this.intLength) {
						// Render the last valid input in the field
						this.renderLastValidValue();
					} else {
						this.$setViewValue(parseFloat(value, 10));
					}
				}
			} else {
				this.renderLastValidValue();
			}
		},
		formatViewValue: function formatViewValue(value) {
			this.$modelValue = value;
			this._lastValidValue = value;
			this.inputEl.value = this.formatPrecision(value);
		},
		focusHandler: function focusHandler(event) {
			this.inputEl.value = this.$modelValue || '';
		},
		blurHandler: function blurHandler(event) {
			var value = this.$modelValue;
			this.inputEl.value = this.formatPrecision(value);
		},
		formatPrecision: function formatPrecision(value) {
			if (value == '' || value == undefined || value == null) {
				return '';
			}
			var formattedValue = parseFloat(value).toFixed(this.decimal);
			formattedValue = formattedValue.replace('.', decimalSeparator);
			return this.numberWithCommas(formattedValue);
		},
		numberWithCommas: function numberWithCommas(value) {
			if (this.formatting) {
				var parts = ("" + value).split(decimalSeparator);
				parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, groupSeparator);
				return parts.join(decimalSeparator);
			} else {
				return value;
			}
		},
		renderLastValidValue: function renderLastValidValue() {
			this.inputEl.value = this._lastValidValue;
		},
		$setViewValue: function $setViewValue(value) {
			if (this._lastValidValue != value) {
				this._lastValidValue = value;
				this.$modelValue = value;
				this.$emit('input', value != '' ? Number(value) : '');
			}
		}
	}
};

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = {
	template: '<input ref="input" v-bind:value="value" @input="parseViewValue($event.target.value)">',
	props: ['value', 'max'],
	mounted: function mounted() {

		if (/^\d+$/.test(this.max)) {
			this.maxlength = parseInt(this.max);
		}
		this.inputEl = this.$refs['input'];
		this.formatViewValue(this.value);
		this.$setViewValue(this.value);
	},
	methods: {
		parseViewValue: function parseViewValue(value) {
			if (value == undefined || value == '') return '';
			if (/^\d+$/.test(value)) {
				if (this.maxlength > 0 && value.length > this.maxlength) {
					this.renderLastValidValue();
				} else {
					this.$setViewValue(value);
				}
			} else {
				this.renderLastValidValue();
			}
		},
		formatViewValue: function formatViewValue(value) {
			this._lastValidValue = value;
			this.inputEl.value = value;
		},

		renderLastValidValue: function renderLastValidValue() {
			this.inputEl.value = this._lastValidValue;
		},
		$setViewValue: function $setViewValue(value) {
			if (this._lastValidValue != value) {
				this._lastValidValue = value;
				this.$modelValue = value;
				this.$emit('input', Number(value));
			}
		}
	}
};

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = {
	template: "<button ref=\"timebtn\" type=\"button\" @click='clickCall'>{{currentLabel}}</button>",
	data: function data() {
		return {
			defaultLabel: '获取验证码',
			currentLabel: null
		};
	},

	mounted: function mounted() {
		this.currentLabel = this.defaultLabel;
	},
	props: ['time'],
	methods: {
		clickCall: function clickCall() {
			var btnEl = this.$refs['timebtn'];
			this.countDown(btnEl, this.time);
			this.$emit('timestart');
		},
		countDown: function countDown(btnEl, start) {
			var _this = this;

			start = start || 60;
			btnEl.setAttribute('disabled', true);
			this.currentLabel = '重新发送(' + start + ')';
			var clearId = setInterval(function () {
				start--;
				_this.currentLabel = '重新发送(' + start + ')';
				if (start == 0) {
					_this.$emit('timeend');
					clearInterval(clearId);
					_this.currentLabel = _this.defaultLabel; //reset
					btnEl.removeAttribute('disabled');
				}
			}, 1000);
		}
	}
};

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _extend = __webpack_require__(2);

var _extend2 = _interopRequireDefault(_extend);

var _components = __webpack_require__(0);

var _components2 = _interopRequireDefault(_components);

var _directive = __webpack_require__(1);

var _directive2 = _interopRequireDefault(_directive);

var _filter = __webpack_require__(3);

var _filter2 = _interopRequireDefault(_filter);

var _service = __webpack_require__(4);

var _service2 = _interopRequireDefault(_service);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function install(Vue) {
	if (install.installed) return;
	install.installed = true;
	Vue.util.extend(Vue.util, _extend2.default);
	(0, _components2.default)(Vue);
	(0, _directive2.default)(Vue);
	(0, _filter2.default)(Vue);
	(0, _service2.default)(Vue);
}

var Vm2utils = {
	install: install
};

if ((typeof window === 'undefined' ? 'undefined' : _typeof(window)) !== undefined && window.Vue) {
	window.Vue.use(Vm2utils);
}

exports.default = Vm2utils;

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

var Component = __webpack_require__(11)(
  /* script */
  __webpack_require__(5),
  /* template */
  null,
  /* scopeId */
  null,
  /* cssModules */
  null
)

module.exports = Component.exports


/***/ }),
/* 11 */
/***/ (function(module, exports) {

// this module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle

module.exports = function normalizeComponent (
  rawScriptExports,
  compiledTemplate,
  scopeId,
  cssModules
) {
  var esModule
  var scriptExports = rawScriptExports = rawScriptExports || {}

  // ES6 modules interop
  var type = typeof rawScriptExports.default
  if (type === 'object' || type === 'function') {
    esModule = rawScriptExports
    scriptExports = rawScriptExports.default
  }

  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // render functions
  if (compiledTemplate) {
    options.render = compiledTemplate.render
    options.staticRenderFns = compiledTemplate.staticRenderFns
  }

  // scopedId
  if (scopeId) {
    options._scopeId = scopeId
  }

  // inject cssModules
  if (cssModules) {
    var computed = Object.create(options.computed || null)
    Object.keys(cssModules).forEach(function (key) {
      var module = cssModules[key]
      computed[key] = function () { return module }
    })
    options.computed = computed
  }

  return {
    esModule: esModule,
    exports: scriptExports,
    options: options
  }
}


/***/ })
/******/ ]);
});
//# sourceMappingURL=vm2-utils.js.map