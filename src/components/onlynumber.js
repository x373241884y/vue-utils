export default {
	template: '<input ref="input" v-bind:value="value" @input="parseViewValue($event.target.value)">',
	props: ['value', 'max'],
	mounted: function () {

		if (/^\d+$/.test(this.max)) {
			this.maxlength = parseInt(this.max);
		}
		this.inputEl = this.$refs['input'];
		this.formatViewValue(this.value);
		this.$setViewValue(this.value);
	},
	methods: {
		parseViewValue: function (value) {
			if (value == undefined || value == '')return '';
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
		formatViewValue: function (value) {
			this._lastValidValue = value;
			this.inputEl.value = value;
		},

		renderLastValidValue: function () {
			this.inputEl.value = this._lastValidValue;
		},
		$setViewValue: function (value) {
			if (this._lastValidValue != value) {
				this._lastValidValue = value;
				this.$modelValue = value;
				this.$emit('input', Number(value));
			}
		},
	}
};