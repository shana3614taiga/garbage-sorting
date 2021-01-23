export default{
	onShareAppMessage(res) {
		return {
				success(res){
						uni.showToast({
								title:'分享成功'
						})
				},
				fail(res){
						uni.showToast({
								title:'分享失败',
								icon:'none'
						})
				}
		}
	}
}