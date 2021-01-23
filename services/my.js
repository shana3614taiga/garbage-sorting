import http from '@/common/http.js'

export default{
	async getUser(userId){
		var result = http({
			url:'/WeChat/meInfo',
			method:'POST',
			data:{
				userId:userId
			}
		})
		return result
	},
	async integralRank(userId){
		var result = http({
			url:'/WeChat/pointsRanking',
			method:'POST',
			data:{
				userId:userId
			}
		})
		return result
	},
	async integralExchange(userId){
		var result = http({
			url:'/WeChat/exchangeRecord',
			method:'POST',
			data:{
				userId:userId
			}
		})
		return result
	},
	async Launch(userId,garbageType,queryDateType){
		var result = http({
			url:'/WeChat/deliveryRecord',
			method:'POST',
			data:{
				userId:userId,
				garbageType:garbageType,
				queryDateType:queryDateType
			}
		})
		return result
	},
	async myIntegral(userId){
		var result = http({
			url:'/WeChat/me',
			method:'POST',
			data:{
				userId:userId
			}
		})
		return result
	}
}