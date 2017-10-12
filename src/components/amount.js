/**
 * usage:
 * default:  mode:12.2,format:true,decimals:2
 * <ui-amount  placeholder="请输入转入金额" name="amount" v-model="amount" mode="8.2" format="false" decimals="3"></ui-amount>
 */

let decimalSeparator = '.';
let groupSeparator = ',';
let NUMBER_REGEXP = /^\s*(\-|\+)?(\d+|(\d*(\.\d*)))\s*$/;
let MODE_REGEXP = /^(\d+)(\.(\d+))?$/;

export default {
	template: '<input ref="input" v-bind:value="value" @input="parseViewValue($event.target.value)" @blur="blurHandler" @focus="focusHandler" >',
	props: ['value', 'decimals', 'mode', 'max', 'format'],
	mounted: function () {
		this.decimal = /^\d+$/.test(this.decimals) ? parseInt(this.decimals, 10) : 2;                   // Number of decimals. Default 2.
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
		parseViewValue: function (value) {
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
					if (intString.length > this.intLength || dotString.length > this.dotLength) {// Render the last valid input in the field
						this.renderLastValidValue();
					} else {
						this.$setViewValue(parseFloat(value, 10));
					}
				} else {
					if (value.length > this.intLength) {// Render the last valid input in the field
						this.renderLastValidValue();
					} else {
						this.$setViewValue(parseFloat(value, 10));
					}
				}
			} else {
				this.renderLastValidValue();
			}

		},
		formatViewValue: function (value) {
			this.$modelValue = value;
			this._lastValidValue = value;
			this.inputEl.value = this.formatPrecision(value);
		},
		focusHandler: function (event) {
			this.inputEl.value = this.$modelValue || '';
		},
		blurHandler: function (event) {
			var value = this.$modelValue;
			this.inputEl.value = this.formatPrecision(value);
		},
		formatPrecision: function (value) {
			if (value == '' || value == undefined || value == null) {
				return '';
			}
			var formattedValue = parseFloat(value).toFixed(this.decimal);
			formattedValue = formattedValue.replace('.', decimalSeparator);
			return this.numberWithCommas(formattedValue);
		},
		numberWithCommas: function (value) {
			if (this.formatting) {
				var parts = ("" + value).split(decimalSeparator);
				parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, groupSeparator);
				return parts.join(decimalSeparator);
			} else {
				return value;
			}
		},
		renderLastValidValue: function () {
			this.inputEl.value = this._lastValidValue;
		},
		$setViewValue: function (value) {
			if (this._lastValidValue != value) {
				this._lastValidValue = value;
				this.$modelValue = value;
				this.$emit('input', value != '' ? Number(value) : '');
			}
		},
	}
};