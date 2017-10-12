<template>
	<div>
		<nav-bar title="amount"></nav-bar>

		<div class="page">
			<div class="form-group">
				<label>金额:</label>
				<div class="control">
					<ui-amount class="text03"  placeholder="请输入转入金额" name="trsAmount" v-model="trsAmount" mode="8.2" required></ui-amount>
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
        watch:{
	        trsAmount:function (newVal, oldVal) {
		        console.log(newVal);
	        }
        }

	}
</script>
