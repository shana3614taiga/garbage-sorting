<template>
	<view class="app pb5">
		<view class="my_ranking bgwh br6">
			<view class="my_ranking_box df align_center justify_between" v-for="(item,index) in list" :key="index">
				<view class="my_ranking_number my_r1">{{index+1}}</view>
				<image src="../../static/images/photo_head3.jpg" class="w30 br100 db"></image>
				<view class="my_ranking_name flex1">{{item.residentName}}</view>
				<view class="my_ranking_val">{{item.point}}分</view>
			</view>
		</view>
		<view class="my_ranking_info df align_center justify_between bgwh">
			<view class="df align_center">
				<view v-if="rank<=0">您的排名：未上榜</view>
				<view v-else>您的排名：第{{rank}}名</view>
				<view class="f12 g9" v-if="rank>30">（未上榜）</view>
			</view>
			<view class="my_ranking_val">{{point}}分</view>
		</view>
	</view>
</template>

<script>
	import services from '@/services/my.js'
	import util from '@/common/util.js'
	import storage from '@/common/storage.js'
	
	export default {
	  data () {
	    return {
				userId:storage.getUserInfo() == null?'':storage.getUserInfo().userId,
				list:[],
				rank:0,
				point:0,
	    }
	  },
		onLoad() {
			this.loadRank()
		},
		methods:{
			loadRank(){
				services.integralRank(this.userId).then(res =>{
					if(res.success){
						let data = JSON.parse(res.data)
						this.list = data.data
						this.rank = data.curr
						this.point = data.point
						console.log(this.list)
					}
				})
			},
			loadUser(){
				services.getUser(this.userId).then(res =>{
					if(res.success){
						this.point = JSON.parse(res.data).point
					}
				})
			}
		}
	}
</script>

<style>
</style>
