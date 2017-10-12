<template>
	<div>
		<nav-bar title="timebtn"></nav-bar>

		<div class="page">
			<div class="form-group">
				<label>金额:</label>
				<div class="control">
					<timebtn time="60"  @timestart="sendSms()" class="btn01"></timebtn>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
	import NavBar from './NavBar.vue'

	export default {
		components: {
			NavBar
		},

		data () {
			return {
				trsAmount:123
			}
		},

		mounted() {

		},
		methods:{
			sendSms:function () {
				console.log('sendSms');
			}
		}

	}
</script>
