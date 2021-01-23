import http from '@/common/http.js'

export default{
	async shop(userId){
		var result = http({
			url:'/WeChat/pointShop',
			method:'POST',
			data:{
				userId:userId
			}
		})
		return result
	},
	async exchangeShop(userId,commodityId){
		var result = http({
			url:'/WeChat/redeem',
			method:'POST',
			data:{
				userId:userId,
				commodityId:commodityId
			}
		})
		return result
	},
}