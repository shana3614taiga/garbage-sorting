<template>
	<view class="app">
		<view class="notice_item">
			<navigator :url="'/pages/index/notice_view?id='+item.id" class="notice_box df align_center justify_between w_line" v-for="(item,index) in list" :key="index">
				<view class="notice_box_text wp90">
					<view class="notice_box_name g3 f16 w80cell">{{item.title}}</view>
					<view class="notice_box_info f13 g9 mt5">{{item.createTime | stampToDate}}</view>
				</view>
				<view class="notice_arrow">
					<image src="../../static/images/arrow.png" class="w18 db"></image>
				</view>
			</navigator>
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
				list:[],
				userId:storage.getUserInfo() == null?'':storage.getUserInfo().userId,
			}
		},
		filters:{
			stampToDate(stamp){
				var date = new Date(stamp);
				var MM = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1)
				var DD = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate())
				var hh = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':'
				var mm = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes())
				return MM+'月'+ DD +"日"+ " "+ hh + mm
			}
		},
		onLoad() {
			this.loadNoticeList()
		},
		methods: {
			loadNoticeList(){
				services.getNociteList(this.userId).then(res =>{
					if(res.success){
						this.list = JSON.parse(res.data)
					}
				})
			},
		}
	}
</script>
<style>
	.w80cell{    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    width: 80%;}
</style>