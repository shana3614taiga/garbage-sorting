<template>
	<view class="app">
		<view class="member_integral_hd df align_center justify_between">
			<view class="member_integral_nav df align_center">
				<navigator url="/pages/my/member_integral" class="my_integral_box my_integral_box_clo">会员积分</navigator>
				<navigator url="" class="my_integral_box">公益积分</navigator>
			</view>
			<view class="member_integral_month df align_center">
				<view>本月</view>
				<image src="../../static/images/arrow_bottom.png" class="w10 db ml5"></image>
			</view>
		</view>
		<view class="my_put">
			<view class="my_put_box df align_center justify_between w_line bgwh" v-for="(item,index) in list" :key="index">
				<view class="tl">{{item.type}}</view>
				<view class="tc">{{item.status == 1 ?'+'+item.point:'-'+item.point}}</view>
				<view class="tr">{{item.date}}</view>
			</view>
		</view>
	</view>
</template>

<script>
	import util from '@/common/util.js'
	import services from '@/services/my.js'
	import storage from '@/common/storage.js'
	
	export default{
		data(){
			return{
				userId:storage.getUserInfo() == null?'':storage.getUserInfo().userId,
				list:[]
			}
		},
		filters:{
			stampToDate(value){
				var date = new Date(value);
				var MM = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1)
				var DD = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate())
				var hh = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':'
				var mm = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes())
				return MM+'/'+ DD + " "+ hh + mm
			}
		},
		onLoad() {
			this.loadMyIntegarl()
		},
		methods:{
			loadMyIntegarl(){
				services.myIntegral(this.userId).then(res =>{
					if(res.success){
						this.list = JSON.parse(res.data)
					}else{
						util.showToast(res.message)
					}
				})
			}
		}
	}
</script>

<style>
</style>
