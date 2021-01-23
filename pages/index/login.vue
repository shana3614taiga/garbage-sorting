<template>
  <view class="app">
    <view class="scenic_login">
      <view class="scenic_login_logo tc"><image src="@/static/images/photo_head3.jpg" class="scenic_login_pic br100"></image></view>
      <view class="scenic_login_tit tc">垃圾分类</view>
      <view class="scenic_login_intro g9 f13">分类的目的是提高垃圾的资源价值和经济价值，力争物尽其用，减少垃圾处理量和处理设备，降低处理成本，减少土地资源的消耗，具有社会、经济、生态等几方面的效益</view>
    </view>
    <view class="scenic_login_action"><button open-type="getUserInfo" class="scenic_login_btn" @getuserinfo="dologin($event,true)">授权登录</button></view>
    <view class="scenic_login_action"><button class="scenic_login_btn_cancel" @click="dologin($event,false)">取消</button></view>
		<uni-popup ref="popup" type="dialog">
		    <uni-popup-dialog type="input" mode="input" placeholder="请输入手机号" title="请绑定手机号" :before-close="true" @close="$refs.popup.close()" @confirm="confirm"></uni-popup-dialog>
		</uni-popup>
  </view>
</template>

<script>
	import storage from '@/common/storage.js'
	import services from '@/services/index.js'
	import uniPopup from '@/components/uni-popup/uni-popup.vue'
	import uniPopupDialog from '@/components/uni-popup/uni-popup-dialog.vue'
	import util from '@/common/util.js'
export default {
  components:{
		uniPopup,
		uniPopupDialog
	},
  data () {
    return {
			code:'',
			mobile:'',
			userId:'',
    }
  },
	onLoad() {
		var that = this
		uni.login({
			provider: 'weixin',
			success: function(res) {
				if (res && res.code) {
					that.code = res.code
					console.log(res.code)
				}
			},
			fail: function(err) {
				console.log(err)
			}
		})
	},
	methods:{
		confirm(done,val){
			this.mobile = val
			let reg = /^((13\d)|(14[5,7,9])|(15[0-3,5-9])|(166)|(17[0,1,3,5,6,7,8])|(18[0-9])|(19[8,9]))\d{8}/
			if(!reg.test(this.mobile)){ 
					util.showToast("手机号码有误")
					return false
			}else{
				let that = this
				uni.login({
					provider: 'weixin',
					success: function(res) {
						if (res && res.code) {
							services.login(res.code,that.mobile).then(res =>{
								if(JSON.parse(res.success)){
									storage.setUserInfo(JSON.parse(res.data))
									uni.redirectTo({
										url:"/pages/index/index"
									})
								}else{
									util.showToast(res.message)
								}
							})
						}
					},
					fail: function(err) {
						console.log(err)
					}
				})
			}
		},
		dologin(e,blo){
			if(blo){
				services.login(this.code).then(res =>{
					if(res.data){
						storage.setUserInfo(JSON.parse(res.data))
						uni.redirectTo({
							url:"/pages/index/index"
						})
					}else{
						this.$refs.popup.open()
					}
				})
			}else{
				uni.redirectTo({
					url:'/pages/index/index'
				})
			}
		}
	}
}
</script>
<style>
	/* #ifdef MP-WEIXIN */
	page{ background-color: #fff;}
	/* #endif */
</style>