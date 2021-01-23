<template>
	<view class="app pb10">
		<view class="integral">
			<view class="integral_hd_bg">
				<view class="integral_hd df align_center justify_between">
					<view class="index_integral_text" v-if="userId">
						<view class="f12 fw">你的当前积分</view>
						<view class="f22 fw">{{info.point}}</view>
					</view>
					<view class="index_integral_text" v-else>
						<view class="f12 fw">未登录</view>
					</view>
					<view class="index_integral_btn">
						<navigator url="/" class="bggreen min_btn">兑换规则</navigator>
					</view>
				</view>
			</view>
			<view class="integral_item">
				<view class="integral_box df align_center" v-for="(item,index) in list" :key="index">
					<image :src="item.url" class="w80"></image>
					<view class="flex1 ml15 integral_box_text">
						<view class="f15 b">{{item.name}}</view>
						<!-- <view class="del g9 f12">原价：¥</view> -->
						<view class="df align_center justify_between">
							<view class="fr b">积分：{{item.points}}</view>
							<view class="integral_box_btn" @tap="open(item)">兑换</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<uni-popup ref="popup" type="center">
			<view class="integral_pop">
				<view class="integral_pop_info tc">
					<view class="f16 b">请确认订单</view>
					<image :src="url" class="w80 mt15"></image>
					<view class="mt10">您准备兑换 {{name}}</view>
					<view class="mt30">本次兑换将消耗</view>
					<view class="f14 b fr">{{points}}积分</view>
					<view class="mt15">是否兑换？</view>
				</view>
				<view class="integral_pop_action df align_center">
					<view class="integral_pop_btn cancel" @tap="close">取消</view>
					<view class="integral_pop_btn bggreen fw" @tap="confirm">确认兑换</view>
				</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	import uniPopup from '@/components/uni-popup/uni-popup.vue'
	import uniPopupDialog from '@/components/uni-popup/uni-popup-dialog.vue'
	import services from '@/services/index.js'
	import storage from '@/common/storage.js'
	import util from '@/common/util.js'
	
	export default {
	    components: {
	        uniPopup,
	        uniPopupDialog
	    },
			data(){
				return{
					userId:storage.getUserInfo() == null?'':storage.getUserInfo().userId,
					list:[],
					url:'',
					name:'',
					points:0,
					id:0,
					info:null
				}
			},
			onLoad() {
				this.loadshop()
				this.loadUser()
			},
			methods:{
				open(item){
					console.log(this.userId)
					if(this.userId == ''){
						util.showToast('请登录')
						setTimeout(()=>{
							storage.checkUserInfo(true)
						},1500)
						return
					}
					this.url = item.url
					this.name = item.name
					this.points = item.points
					this.id = item.id
					this.$refs.popup.open()
				},
				close(){
					 this.$refs.popup.close()
				},
				confirm(){
					services.integral.exchangeShop(this.userId,this.id).then(res =>{
						if(res.success){
							uni.navigateTo({
									url: '/pages/integral/tips'
							})
						}else{
							util.showToast(res.message)
						}
					})
				},
				loadshop(){
					services.integral.shop(this.userId).then(res =>{
						if(res.success){
							this.list = JSON.parse(res.data)
						}else{
							util.showToast(res.message)
						}
					})
				},
				loadUser(){
					services.my.getUser(this.userId).then(res =>{
						if(res.success){
							this.info = JSON.parse(res.data)
						}
					})
				},
			}
	}
</script>

<style>
</style>
