<template>
	<view class="app">
		<view class="my_exch" v-for="(item,index) in obj" :key="index">
			<view class="my_exch_data f14 g9 ml15">{{index}}</view>
			<view class="my_exch_item">
				<view class="my_exch_box w_line df align_center justify_between bgwh" v-for="(child,index) in item" :key="index">
					<image :src="child.url" class="db w55"></image>
					<view class="tc">{{child.exchageType}}</view>
					<view class="fg">运输中</view>
					<view v-if="child.status == 1">+{{child.point}}</view>
					<view v-if="child.status == 2">-{{child.point}}</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import services from '@/services/my.js'
	import util from '@/common/util.js'
	import storage from '@/common/storage.js'
	
	export default {
		components: {
			
		},
		data() {
			return {
				userId:storage.getUserInfo() == null?'':storage.getUserInfo().userId,
				obj:null,
				
			}
		},
		onLoad() {
			this.loadExchange()
		},
		methods:{
			loadExchange(){
				services.integralExchange(this.userId).then(res =>{
					if(res.success){
						this.obj = JSON.parse(res.data)
					}
				})
			}
		}
	}
</script>

<style>
</style>
