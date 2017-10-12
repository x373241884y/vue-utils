export default {
	template: "<button ref=\"timebtn\" type=\"button\" @click='clickCall'>{{currentLabel}}</button>",
	data () {
		return {
			defaultLabel: '获取验证码',
			currentLabel: null
		}
	},
	mounted: function () {
		this.currentLabel = this.defaultLabel;
	},
	props: ['time'],
	methods: {
		clickCall () {
			let btnEl = this.$refs['timebtn'];
			this.countDown(btnEl, this.time);
			this.$emit('timestart');
		},
		countDown(btnEl, start){
			start = start || 60;
			btnEl.setAttribute('disabled', true);
			this.currentLabel = '重新发送(' + start + ')';
			let clearId = setInterval(() => {
				start--;
				this.currentLabel = '重新发送(' + start + ')';
				if (start == 0) {
					this.$emit('timeend');
					clearInterval(clearId);
					this.currentLabel = this.defaultLabel; //reset
					btnEl.removeAttribute('disabled');
				}
			}, 1000);
		}
	},
};