import http from '@/common/http.js'
import integral from '@/services/integral.js'
import my from '@/services/my.js'

export default{
	integral,
	my,
	async getNewNotice(userId){
		var result = http({
			url:'/WeChat/getLatestCommunityAnnouncement',
			method:'POST',
			data:{
				userId: userId
			}
		})
		return await result
	},
	async getNociteList(userId){
		var result = http({
			url: '/WeChat/getCommunityAnnouncementList',
			method: 'POST',
			data: {
				userId: userId
			}
		})
		return await result
	},
	async getNocite(userId,announcementId){
		var result = http({
			url:'/WeChat/getCommunityAnnouncementView',
			method:'POST',
			data:{
				userId:userId,
				announcementId:announcementId
			}
		})
		return result
	},
	async addRecallOrder(form){
		var result = http({
			url: '/WeChat/addRecallOrder',
			method: 'POST',
			data:form
		})
		return await result
	},
	async getQr(userId){
		var result = http({
			url: '/WeChat/generateQRCodeStr',
			method: 'POST',
			data:{
				userId:userId
			}
		})
		return result
	},
	async queryGomi(key){
		var result = http({
			url:'/WeChat/garbageInfoQuery',
			method: 'POST',
			data:{
				keyword:key
			}
		})
		return result
	},
	async login(code,mobile){
		var result = http({
			url:'/WeChat/login',
			method:'POST',
			data:{
				code:code,
				mobile:mobile
			}
		},'',false)
		return result
	}
}