<template>
	<view class="app">
		<view class="tips_icon df align_center justify_center">
			<image src="../../static/images/tips-icon.png" class="w100 db"></image>
		</view>
		<view class="tips_text tc mt30">
			<view class="f20 b">恭喜你，预约成功！</view>
			<view class="mt10">收运员将准时上门回收，<br>请保持您的手机通畅！</view>
		</view>
		<view class="tips_action df align_center justify_center mt30">
			<navigator url="/pages/index/index" class="tips_action_btn">返回首页</navigator>
		</view>
	</view>
</template>

<script>
	export default {
		components: {
		},
		data() {
			return {
			}
		},
		onLoad() {
		},
		methods: {
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