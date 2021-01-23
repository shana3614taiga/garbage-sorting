var showToast = function(mess, icon = 'none', duration = 2000, image = '') {
	if (mess && mess.length > 7) {
		icon = 'none';
		image = '';
	}
	uni.showToast({
		mask: true,
		title: mess,
		icon: icon,
		image: image,
		duration: duration
	})
}
var getDate = function(stamp) {
	let dd
	if(stamp){
		dd = new Date(stamp)
	}else{
		dd = new Date()
	}
	dd.getMonth()
	dd.getDate()
	let y = dd.getFullYear()
	let m = dd.getMonth() + 1 < 10 ? '0' + (dd.getMonth() + 1) : dd.getMonth() + 1 // 获取当前月份的日期，不足10补0
	let d = dd.getDate() < 10 ? '0' + dd.getDate() : dd.getDate() // 获取当前几号，不足10补0
	let h = dd.getHours() <10 ? '0' + dd.getHours() : dd.getHours()
	let i = dd.getMinutes()<10? '0' + dd.getMinutes() : dd.getMinutes()
	let s = dd.getSeconds()<10? '0' + dd.getSeconds() : dd.getSeconds()
	return y + '/' + m + '/' + d + ' '+ h +':'+ i + ":" + s
}

export default {
	showToast,
	getDate,
}
