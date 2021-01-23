<template>
	<view class="app">
		<view class="member_integral_hd df align_center justify_between">
			<view class="member_integral_nav df align_center">
				<navigator url="/pages/my/member_integral" class="my_integral_box">会员积分</navigator>
				<navigator url="/pages/my/pubice_integral" class="my_integral_box my_integral_box_clo">公益积分</navigator>
			</view>
			<view class="member_integral_month df align_center">
				<view>本月</view>
				<image src="../../static/images/arrow_bottom.png" class="w10 db ml5"></image>
			</view>
		</view>
		<view class="my_put">
			<view class="my_put_box df align_center justify_between w_line bgwh" v-for="item in 10">
				<view class="tl">易腐垃圾投放正确</view>
				<view class="tc">+1</view>
				<view class="tr">9/16 12:30</view>
			</view>
		</view>
	</view>
</template>

<script>
</script>

<style>
</style>
