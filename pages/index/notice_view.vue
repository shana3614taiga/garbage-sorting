<template>
	<view class="app">
		<view class="notice_view ml15 mr15 mt15">
			<view class="notice_view_tit f20 b">{{info.title}}</view>
			<view class="notice_view_data f13 g9 mt2">{{formatDate(info.createTime)}}</view>
			<view class="notice_view_text mt20 tj lh18" v-html="lineBreakToBR(info.content)">
			</view>
			<view class="notice_view_bottom tr mt20 mb10">{{info.source}}</view>
		</view>
	</view>
</template>

<script>
	import services from '@/services/index.js'
	import util from '@/common/util.js'
	import storage from '@/common/storage.js'
	
	export default {
		components: {
		},
		data() {
			return {
				userId:storage.getUserInfo().userId,
				info:{}
			}
		},
		onLoad(options) {
			this.loadNocite(options.id)
		},
		methods: {
			loadNocite(id){
				services.getNocite(this.userId,id).then(res =>{
					if(res.success){
						this.info = JSON.parse(res.data)
					}else{
						util.showToast(res.message)
					}
				})
			},
			formatDate(date) {
			  var date = new Date(date)
			  var YY = date.getFullYear() + '-'
			  var MM = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-'
			  var DD = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate())
			  var hh = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':'
			  var mm = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes())
			  var ss = (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds())
			  return YY + MM + DD +" "+hh + mm
			}
		}
	}
</script>
<style>
	/* #ifdef MP-WEIXIN */
	page{ background-color: #fff;}
	/* #endif */
	/* #ifdef H5 */
	.pages-index-query{ background-color: #fff;}
	/* #endif */
</style>