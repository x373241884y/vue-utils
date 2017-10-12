<script>
	export default {
		template: '<input ref="input" v-bind:value="value" v-on:input="updateValue($event.target.value)">',
		props: ['value', 'max'],
		mounted: function () {
			this._lastValidValue = this.$refs.input.value;
		},
		methods: {
			updateValue: function (value) {
				if (value == undefined)return '';
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
</script>