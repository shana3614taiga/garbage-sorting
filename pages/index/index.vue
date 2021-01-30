<template>
	<view class="app index_mb">
		<navigator url="/pages/index/notice" class="df align_center f13 bgwh tongzhi">
			<view class="tongzhi_pic df align_center justify_center"><image src="../../static/images/tongzhi.png" class="w16"></image></view>
			<uni-notice-bar class="tongzhi_text f13" :speed="40" scrollable="true" single="true" backgroundColor="#ffffff" color="#999999" :text="newNotice"></uni-notice-bar>
		</navigator>
		<view class="banner"><image src="../../static/images/banner.png" class="db wp100 banner_pic" mode="widthFix"></image></view>
		<view class="index_cont">
			<view class="index_nav df align_center justify_between">
				<view class="index_nav_box index_nav_lt">
					<navigator url="/pages/index/query" class="index_nav_info df align_center flex_column justify_around">
						<image src="../../static/images/index_n1.png" class="index_nav_pic_b"></image>
						<view class="index_nav_text tc">
							<view class="fg f14 b">分类查询</view>
							<view class="g8 f12">一键查询垃圾分类</view>
						</view>
					</navigator>
				</view>
				<view class="index_nav_box index_nav_rt">
					<navigator url="/pages/index/recycle" class="index_nav_info df align_center mb10">
						<image src="../../static/images/index_n2.png" class="index_nav_pic_m"></image>
						<view class="index_nav_text">
							<view class="fg f14 b">上门回收</view>
							<view class="g8 f12 mt2">多网点上门</view>
						</view>
					</navigator>
					<navigator url="/" class="index_nav_info df align_center" @click="tips">
						<image src="../../static/images/index_n3.png" class="index_nav_pic_n"></image>
						<view class="index_nav_text">
							<view class="fg f14 b">领垃圾袋</view>
							<view class="g8 f12 mt2">每月免费领取</view>
						</view>
					</navigator>
				</view>
			</view>
			<view class="index_integral df align_center justify_between bgwh mt15 ml15 mr15 br5">
				<view class="index_integral_text" v-if="userId">
					<view class="f12 g9">你的当前积分</view>
					<view class="f22 g3" v-if="info.point">{{info.point}}</view>
					<view class="f22 g3" v-else>0</view>
				</view>
				<view class="index_integral_text" v-else>
					<view class="f12 g9">未登录</view>
				</view>
				<view class="index_integral_btn">
					<navigator url="/pages/integral/index" class="bggreen min_btn">兑换礼品</navigator>
				</view>
			</view>
			<view class="index_putin ml15 mr15 mt15">
				<view class="index_putin_tit df align_center justify_between">
					<view class="f14 b">附近投放点</view>
					<navigator url="/" class="f12 fg">查看更多</navigator>
				</view>
				<view class="index_putin_map mt10">
					<map class="index_putin_map_info"></map>
				</view>
			</view>
		</view>
		<view class="index_null tc dn">
			<view class="g3 f16 b">您尚未绑定任何住宅信息</view>
			<view class="f12 g9 mt10">您可以通过小区物业绑定您的微信手机号</view>
		</view>
		<view class="nav">
			<view class="nav_item df align_center justify_around">
				<view class="nav_box df align_center flex_column justify_around">
					<navigator open-type="redirect" url="/pages/index/index" class="db tc nav_box_link">
						<image src="../../static/images/n1-2.png" class="db w30"></image>
						<view class="f12">首页</view>
					</navigator>
				</view>
				<view class="nav_box">
					<view class="db tc nav_box_link" @tap="open">
						<image src="../../static/images/n2.png" class="db nav_box_i2"></image>
					</view>
				</view>
				<view class="nav_box df align_center flex_column justify_around">
					<navigator open-type="redirect" url="/pages/my/index" class="db tc nav_box_link">
						<image src="../../static/images/n3.png" class="db w30"></image>
						<view class="f12">我的</view>
					</navigator>
				</view>
			</view>
		</view>
		<uni-popup ref="popup" type="center">
			<view class="qrcode df flex_column align_center justify_center">
				<!-- <image src="../../static/images/qrcode.png" class="w200 db"></image> -->
				<view class="qrimg">
				    <tki-qrcode
				    ref="qrcode"
				    :val="qr"
				    :size="360"
				    :lv="1" 
				    :onval="true"
				    :showLoading="false"
				    @result="qrR"/>
				</view>
				<image src="../../static/images/close.png" class="w35 mt15 db" @tap="close"></image>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	import uniNoticeBar from '@/components/uni-notice-bar/uni-notice-bar.vue'
	import uniPopup from '@/components/uni-popup/uni-popup.vue'
	import uniPopupDialog from '@/components/uni-popup/uni-popup-dialog.vue'
	import services from "@/services/index.js"
	import util from "@/common/util.js"
	import tkiQrcode from "@/components/tki-qrcode/tki-qrcode.vue"
	import storage from '@/common/storage.js'
	
	export default {
		components: {
			uniNoticeBar,
			uniPopup,
			uniPopupDialog,
			tkiQrcode
		},
		beforeDestroy() {
			uni.removeStorageSync('qrpopup')
		},
		data() {
			return {
				newNotice:'',
				qr:'init data scan to this string error',
				qrerr:'init data scan to this string error',
				userId: storage.getUserInfo() == null?'':storage.getUserInfo().userId,
				integarl:0,
				info:null,
			}
		},
		onShow() {
			// storage.checkUserInfo(true)
			this.loadNewNotice()
			this.loadQrStr()
			this.loadUser()
		},
		methods:{
			tips(){
				if(this.userId == null || this.userId == "" || this.userId == undefined){
					util.showToast('请登录')
					return
				}
				util.showToast('您的社区尚未提供此服务')
			},
			qrR(val){
				uni.hideLoading()
			},
			open(){
				if(this.userId == ''){
					util.showToast('未登录')
					return
				}
				if(this.qrerr == this.qr){
					util.showToast('用户未绑定')
					return
				}
				uni.showLoading({
					title:'加载二维码中...'
				})
				 this.$refs.popup.open()
				 this.$refs.qrcode._makeCode()
			},
			close(){
				 this.$refs.popup.close()
			},
			loadNewNotice(){
				services.getNewNotice(this.userId).then(res =>{
					if(res.success){
						this.newNotice = JSON.parse(res.data).title
					}else{
						util.showToast(res.message)
					}
				}).catch(err =>{
					util.showToast(err.message)
				})
			},
			loadQrStr(){
				services.getQr(this.userId).then(res =>{
					if(res.success){
						this.qr = res.data
						if(uni.getStorageSync('qrpopup') != ""){
							this.open()
						}
					}else{
						util.showToast(res.message)
					}
				}).catch(err =>{
					util.showToast(err.message)
				})
			},
			loadUser(){
				services.my.getUser(this.userId).then(res =>{
					if(res.success){
						this.info = JSON.parse(res.data)
					}else{
						util.showToast(res.message)
					}
				}).catch(err =>{
					util.showToast(err.message)
				})
			},
		}
	}
</script>

<style>
	.qrimg{
	background-color: white;
	height: 100%;
	padding: 20px;
	}
</style>
