<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			uni.setStorageSync('qrpopup',true)
			console.log('App Hide')
		}
	}
</script>

<style>
	/*每个页面公共css */
</style>
