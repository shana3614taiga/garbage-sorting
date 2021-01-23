<template>
	<view class="app recycle_mb">
		<view class="recycle">
			<view class="recycle_item">
				<view class="cell df align_center justify_between w_line">
					<view class="cell_name">姓名</view>
					<view class="cell_val"><input v-model="form.userName" type="text" class="wp100 tr txt" placeholder="输入姓名" /></view>
				</view>
				<view class="cell df align_center justify_between w_line">
					<view class="cell_name">电话</view>
					<view class="cell_val"><input v-model="form.mobile" type="text" class="wp100 tr txt" placeholder="输入电话" /></view>
				</view>
				<view class="df cell_hs flex_column">
					<view>地址</view>
					<view><input v-model="form.address" type="text" class="txt wp100" placeholder="输入你的地址" /></view>
				</view>
			</view>
			<view class="recycle_item top_line">
				<view class="df cell_hs flex_column w_line">
					<view>回收物品</view>
					<view><input v-model="form.recycledItems" type="text" class="txt wp100" placeholder="输入你的回收物品" /></view>
				</view>
				<view class="cell df align_center justify_between w_line">
					<view class="cell_name">估算重量</view>
					<view class="cell_val tr"><input class="dib vam" type="number" v-model="form.weight"><view class="dib vam ml10">kg</view></view>
					<!-- <view class="cell_val tr">20kg</view> -->
				</view>
				<view class="cell df align_center justify_between w_line">
					<view class="cell_name">预约时间</view>
					<view class="cell_val tr df align_center justify_end" @click="$refs.date.open()">
						<!-- <view>11:00-11:30</view> -->
						<view>{{defaultDate}}</view>
						<image src="../../static/images/arrow.png" class="w16 cell_arrow"></image>
					</view>
				</view>
			</view>
			<view class="recycle_item top_line">
				<view class="df cell_hs flex_column">
					<view>物品图片</view>
					<view class="df align_center mt10">
						<view class="mr10" v-if="form.urls"><image :src="form.urls" class="w60"></image></view>
						<view class="mr10"><image src="../../static/images/upload_icon.png" class="w60" @click="uploadImg"></image></view>
					</view>
				</view>
				<view class="df cell_hs flex_column">
					<view>备注</view>
					<view class="df align_center mt10">
						<textarea v-model="form.remark" class="wp100 itextarea"></textarea>
					</view>
				</view>
			</view>
		</view>
		<view class="recycle_action">
			<button class="recycle_action_btn fw bggreen tc db" @click="addRecallOrder">立即预约</button>
		</view>
		<uni-calendar ref="date"
		    :insert="false"
		    :lunar="true" 
				:range="true"
		    :start-date="beginTime"
		    @confirm="change"
		     ></uni-calendar>
	</view>
</template>

<script>
	import util from "@/common/util.js"
	import services from "@/services/index.js"
	import config from '@/common/config.js'
	import {encode,decode} from '@/common/base64.min.js'
	import uniCalendar from '@/components/uni-calendar/uni-calendar.vue'
	import storage from '@/common/storage.js'
	
	export default {
		components: {
			uniCalendar
		},
		data() {
			const currentDate = this.getDate({
				format: true
			})
			return {
				defaultDate:'请选择时间',
				form:{
					userId:storage.getUserInfo() == null?'':storage.getUserInfo().userId,
					userName:"",
					mobile: "",
					address: "",
					weight: "1.0",
					startAppointment: "",
					endAppointment: "",
					remark: "",
					recycledItems: "",
					urls: ""
				},
				beginTime:currentDate,
				endTime:currentDate,
			}
		},
		computed:{
			startDate() {
				return this.getDate('start');
			},
			endDate() {
				return this.getDate('end');
			},
		},
		onLoad() {
			
		},
		methods: {
			change(e){
				this.form.startAppointment = e.range.before
				this.form.endAppointment = e.range.after
				this.defaultDate = this.form.startAppointment+' 至 '+this.form.endAppointment
				console.log(this.form)
			},
			addRecallOrder(){
				if(this.form.userId == ""){
					util.showToast('请登录')
					setTimeout(()=>{
						uni.navigateTo({
							url:"/pages/index/login"
						})
					},1000)
					return
				}
				if(this.form.userName == ""){
					util.showToast('请输入姓名')
					return
				}
				if(this.form.mobile == ""){
					util.showToast('请输入电话')
					return
				}
				if(this.form.address == ""){
					util.showToast('请输入地址')
					return
				}
				if(this.form.startAppointment==""){
					util.showToast('请选择时间')
					return
				}
				if(this.form.recycledItems == ""){
					util.showToast('请输入回收物品')
					return
				}
				services.addRecallOrder(this.form).then(res =>{
					if(res.success){
						uni.navigateTo({
							url:'/pages/index/recycle_tips'
						})
					}else{
						util.showToast('预约失败')
					}
				})
			},
			uploadImg(){
				uni.chooseImage({
					count:1,
					success: (chooseImageRes) => {
							const tempFiles = chooseImageRes.tempFiles
							try {
								uni.uploadFile({
										url: config.base_url + '/app/upload',
										filePath:tempFiles[0].path,
										name: 'file',
										header:{
											"Content-type":"multipart/form-data"
										},
										success: (result) => {
											let res = JSON.parse(result.data)
											let data = decode(res.data)
											if(res.success){
												this.form.urls = JSON.parse(data).fileUrl
											}else{
												util.showToast('上传失败')
											}
											
										},
										fail(err){
											console.log(err)
										}
								})
							} catch(err) {
								console.log(err)
							}
				    }
				})
			},
			getDate(type) {
				const date = new Date();
				let year = date.getFullYear();
				let month = date.getMonth() + 1;
				let day = date.getDate();
			
				if (type === 'start') {
					year = year - 60;
				} else if (type === 'end') {
					year = year + 2;
				}
				month = month > 9 ? month : '0' + month;;
				day = day > 9 ? day : '0' + day;
				return `${year}-${month}-${day}`;
			},
		}
	}
</script>
<style>
	.vam{vertical-align: middle;}
	/* #ifdef MP-WEIXIN */
	page{ background-color: #fff;}
	/* #endif */
	/* #ifdef H5 */
	.pages-index-query{ background-color: #fff;}
	/* #endif */
</style>