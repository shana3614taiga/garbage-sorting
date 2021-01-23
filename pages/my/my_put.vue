<template>
	<view class="app">
		<view class="put_hd df align_center justify_between">
			<view class="df align_center" @click="$refs.popup.open()">
				<view>{{type[ind]}}</view>
				<image src="../../static/images/arrow_bottom.png" class="w10 db ml5"></image>
			</view>
			<view class="df align_center">
				<picker @change="change" :value="index" :range="array">
						<view class="uni-input">{{array[index]}}</view>
				</picker>
				<image src="../../static/images/arrow_bottom.png" class="w10 db ml5"></image>
			</view>
		</view>
		<view class="my_put" v-if="list.length >0">
			<view class="my_put_box df align_center justify_between w_line bgwh" v-for="(item,index) in list" :key="index">
				<view class="tl">{{item.garbageType}}</view>
				<view class="tc">{{item.quality}}</view>
				<view class="tr">{{item.date}}</view>
			</view>
		</view>
		<view class="my_put tc" v-else>
			暂无记录
		</view>
		<uni-popup ref="popup" type="bottom">
			<view class="bg">
				<view class="bgwh item tc mb2 f18 pd10" v-for="(item,index) in type" @click="select(index)" v-if="index != ind" :key="index">{{item}}</view>
				<button class="bgwh mt10 f16" @click="$refs.popup.close()">取消</button>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	import services from '@/services/my.js'
	import util from '@/common/util.js'
	import storage from '@/common/storage.js'
	import uniPopup from '@/components/uni-popup/uni-popup.vue'
	
	export default {
		components: {
			uniPopup
		},
		data() {
			return {
				userId:storage.getUserInfo() == null?'':storage.getUserInfo().userId,
				array:['本月','上月'],
				index:0,
				list:[],
				type:["易腐垃圾","其他垃圾","可回收物","有害垃圾","全部分类"],
				ind:4,
				garbageType:""
			}
		},
		onLoad() {
			this.loadLaunch()
		},
		methods:{
			select(val){
				this.$refs.popup.close()
				this.ind = val
				this.garbageType = val
				if(val == 4){
					this.garbageType = ""
				}
				this.list = []
				this.loadLaunch()
			},
			change(e){
				this.list = []
				this.index = this.index = e.target.value
				this.loadLaunch()
			},
			loadLaunch(){
				services.Launch(this.userId,this.garbageType,this.array[this.index]).then(res =>{
					if(res.success){
						this.list = JSON.parse(res.data)
					}
				})
			}
		}
	}
</script>

<style>
	.bg{background-color: #F8F8F8;overflow: hidden;
    border-top-left-radius: 15px;
		border-top-right-radius: 15px;}
	.mb1{margin-bottom: 1px;}
	.item{color: #000000;margin-bottom: 1px;}
</style>
