<template>
	<view class="app">
		<view class="query_action df align_center ml15 mr15 mt15">
			<input v-model="key" type="text" class="query_action_txt txt wp100" placeholder="输入你想要查询的垃圾" />
			<view class="query_action_btn df align_center justify_center" @click="query">
				<image src="../../static/images/search_icon.png" class="w20 db"></image>
			</view>
		</view>
		<view class="query_result mt10 ml15 mr15 df" v-if="list.length > 0">
			<view class="query_result_tit dib tc flex1 lh24">名称</view>
			<view class="query_result_info f16 dib tc flex1 lh24">分类</view>
		</view>
		<view class="query_result mt10 ml15 mr15" v-for="(item,index) in list" :key="index">
			<view class="df">
				<view class="query_result_tit dib tc flex1 lh24 dib">{{item.name}}</view>
				<view class="query_result_info f16 b tc flex1 lh24 dib" v-if="item.type == 0">易腐垃圾</view>
				<view class="query_result_info f16 b tc flex1 lh24 dib" v-else-if="item.type == 1">其他垃圾</view>
				<view class="query_result_info f16 b tc flex1 lh24 dib" v-else-if="item.type == 2">可回收垃圾</view>
				<view class="query_result_info f16 b tc flex1 lh24 dib" v-else="item.type == 3">有害垃圾</view>
			</view>
			<view class="cut_line"></view>
		</view>
		<view class="query_result mt30 ml15 mr15" v-if="list.length<=0">
			<view class="query_result_tit">暂无分类信息</view>
		</view>
	</view>
</template>

<script>
	import util from '@/common/util.js'
	import services from '@/services/index.js'
	import storage from '@/common/storage.js'
	
	export default {
		components: {
		},
		data() {
			return {
				key:'',
				userId:storage.getUserInfo() == null?'':storage.getUserInfo().userId,
				list:null,
			}
		},
		onLoad() {
			
		},
		methods: {
			query(){
				var regu = "^[ ]+$"
				var re = new RegExp(regu)
				if(this.key == "" || re.test(this.key)){
					util.showToast('请输入查询内容')
					this.key = ""
					return
				}
				services.queryGomi(this.key).then(res =>{
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
	/* #ifdef MP-WEIXIN */
	page{ background-color: #fff;}
	/* #endif */
	/* #ifdef H5 */
	.pages-index-query{ background-color: #fff;}
	/* #endif */
	.cut_line{
		    height: 1px;
		    width: 100%;
		    background-color: #eeeeee;
		    margin: 15px 0px;
	}
	.lh24{line-height: 24px;}
</style>