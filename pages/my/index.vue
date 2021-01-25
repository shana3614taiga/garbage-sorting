<template>
  <view class="app">
		<view class="my_head df align_center justify_between ml15 mr15 mt10" v-if="info">
			<view class="my_head_pic" @click="$refs.FaceUploadPopup.open()">
				<image v-if="info.faceImageUrl != undefined" :src="info.faceImageUrl" class="db w60 br100"></image>
				<image v-else src="../../static/images/photo_head3.jpg" class="db w60 br100"></image>
			</view>
			<view class="my_head_text flex1 ml15">
				<view class="my_head_name f16 b">{{info.residentName}}</view>
				<view class="my_head_address g8 f12">{{info.address}}</view>
			</view>
			<view class="my_head_notice df align_center justify_center">
				<image src="../../static/images/new.png" class="w20 db"></image>
			</view>
		</view>
		<view class="my_head_login df align_center justify_between ml15 mr15 mt10" v-else>
			<view class="my_head_pic">
				<image src="../../static/images/my_null.png" class="db w60 br100"></image>
			</view>
			<view class="my_head_text flex1 ml15">
				<view class="my_head_name f16 b">您好，请先登录</view>
			</view>
		</view>
		<view class="df align_center ml15 mr15 mt20 bgwh br6 my_integral">
			<navigator url="/pages/my/member_integral" class="member_integral df align_center justify_around flex_column wp50 flex1">
				<view class="f12 g8">会员积分</view>
				<view class="f22 b g3">{{info.point}}</view>
			</navigator>
			<navigator url="" class="member_integral df align_center justify_around flex_column wp50 flex1 my_integral_rt">
				<view class="f12 g8">公益积分</view>
				<view class="f22 b g3">0</view>
			</navigator>
		</view>
		<view class="my_nav mt20">
			<navigator url="/" class="cell df align_center justify_between w_line">
				<view class="cell_name">住宅信息</view>
				<view class="cell_val">
					<view class="cell_val tr df align_center justify_end">
						<view class="g9">{{info.address}}</view>
						<image src="../../static/images/arrow.png" class="w16 cell_arrow"></image>
					</view>
				</view>
			</navigator>
			<navigator url="/pages/my/my_exchange" class="cell df align_center justify_between w_line mt10">
				<view class="cell_name">兑换记录</view>
				<view class="cell_val">
					<view class="cell_val tr df align_center justify_end">
						<image src="../../static/images/arrow.png" class="w16 cell_arrow"></image>
					</view>
				</view>
			</navigator>
			<navigator url="/pages/my/my_put" class="cell df align_center justify_between w_line">
				<view class="cell_name">投放记录</view>
				<view class="cell_val">
					<view class="cell_val tr df align_center justify_end">
						<image src="../../static/images/arrow.png" class="w16 cell_arrow"></image>
					</view>
				</view>
			</navigator>
			<navigator url="/pages/my/my_ranking" class="cell df align_center justify_between w_line mt10">
				<view class="cell_name">积分排行</view>
				<view class="cell_val">
					<view class="cell_val tr df align_center justify_end">
						<image src="../../static/images/arrow.png" class="w16 cell_arrow"></image>
					</view>
				</view>
			</navigator>
		</view>
		<view class="nav">
			<view class="nav_item df align_center justify_around">
				<view class="nav_box df align_center flex_column justify_around">
					<navigator open-type="redirect" url="/pages/index/index" class="db tc nav_box_link">
						<image src="../../static/images/n1.png" class="db w30"></image>
						<view class="f12">首页</view>
					</navigator>
				</view>
				<view class="nav_box">
					<navigator url="/" class="db tc nav_box_link" @tap="open">
						<image src="../../static/images/n2.png" class="db nav_box_i2"></image>
					</navigator>
				</view>
				<view class="nav_box df align_center flex_column justify_around">
					<navigator open-type="redirect" url="/pages/my/index" class="db tc nav_box_link">
						<image src="../../static/images/n3-2.png" class="db w30"></image>
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
		<uni-popup ref="FaceUploadPopup" type="bottom">
			<view class="bg ml10 mr10">
				<view @click="select(false)" style="margin-bottom: 1px;" class="bgwh item tc mb2 f18 pd10">拍照</view>
				<view @click="select(true)" class="bgwh item tc mb2 f18 pd10">从相册选择</view>
				<button class="bgwh mt10 f16" @click="$refs.FaceUploadPopup.close()">取消</button>
			</view>
		</uni-popup>
		<helang-compress ref="helangCompress"></helang-compress>
  </view>
</template>

<script>
	import services from '@/services'
	import util from '@/common/util.js'
	import tkiQrcode from "@/components/tki-qrcode/tki-qrcode.vue"
	import uniPopup from '@/components/uni-popup/uni-popup.vue'
	import uniPopupDialog from '@/components/uni-popup/uni-popup-dialog.vue'
	import storage from '@/common/storage.js'
	import helangCompress from '../../components/helang-compress/helang-compress'
	import config from '@/common/config.js'
	
	const fs = wx.getFileSystemManager()
	
export default {
  name: 'app',
	components:{
		tkiQrcode,
		helangCompress
	},
  data () {
    return {
			qr:'',
			userId:storage.getUserInfo() == null?'':storage.getUserInfo().userId,
			info:{},
			imgPath:"",
			base64:""
    }
  },
	onLoad() {
		storage.checkUserInfo(true)
		this.loadUser()
		this.loadQrStr()
	},
	methods:{
		upface(){
			let that = this
			uni.uploadFile({
				url:config.base_url+'/WeChat/addFace',
				filePath:this.imgPath,
				name: 'file',
				header:{
					"Content-type":"multipart/form-data"
				},
				formData:{
					userId:this.userId
				},
				success: (result) => {
					let res = JSON.parse(result.data)
					if(res.success){
						util.showToast('上传成功')
						fs.unlinkSync(that.imgPath)
						that.loadUser()
						that.$refs.FaceUploadPopup.close()
					}else{
						util.showToast('上传失败')
					}
				},
				fail(err){
					
				}
			})
		},
		baseTofile(){
			let times = new Date().getTime()
			this.imgPath = wx.env.USER_DATA_PATH + '/' + times + '.png'
			return new Promise((resolve,reject) =>{
				fs.writeFile({
				  filePath: this.imgPath,
				  data: this.base64,
				  encoding: 'base64',
				  success: (res) => {
						
						resolve()
				  },fail(err){
						util.showToast('转换图片失败')
						reject()
					}
				})
			})
		},
		compress(){
			const that = this
			return new Promise((resolve,reject)=>{
				uni.compressImage({
					src:that.imgPath,
					quality:0,
					success(res) {
						that.imgPath = res.tempFilePath
						uni.getFileSystemManager().readFile({
							filePath: that.imgPath,
							encoding: 'base64',
							success(res){
								that.base64 = res.data
								resolve()
							}
						})
					},
					fail(err) {
						reject()
					}
				})
			})
		},
		select(val){
			let type = ["camera"]
			if(val){
				type = ["album"]
			}
			const that = this
			uni.chooseImage({
				sizeType:['compressed'],
				count:1,
				sourceType:type,
				success(res) {
					that.imgPath = res.tempFiles[0].path
					that.compress().then(res =>{
						that.baseTofile().then(res =>{
							that.upface()
						})
					})
				},
				fail(err) {
					util.showToast(err)
				}
			})
		},
		qrR(val){
			uni.hideLoading()
		},
		open(){
			if(this.userId == ''){
				util.showToast('未登录')
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
		loadUser(){
			services.my.getUser(this.userId).then(res =>{
				if(res.success){
					this.info = JSON.parse(res.data);console.log(this.info)
				}
			})
		},
		loadQrStr(){
			services.getQr(this.userId).then(res =>{
				if(res.success){
					this.qr = res.data
				}
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