const WP_UserInfo = 'zcn_wp_userinfo';
const WP_TokenStr = 'znc_wp_token';

const getUserInfo = function() {
	let ret = '';
	ret = uni.getStorageSync(WP_UserInfo);
	if (!ret) {
		return null;
	}
	return JSON.parse(ret);
}

const setUserInfo = function(userInfo, token) {
	if (userInfo) {
		uni.setStorageSync(WP_UserInfo, JSON.stringify(userInfo));
	}
	if (token) {
		uni.setStorageSync(WP_TokenStr, token);
	}
}

const checkUserInfo = function(gotoLogin = false) {
	let ret = '';
	let token = '';
	ret = uni.getStorageSync(WP_UserInfo);
	if (typeof(ret) == 'undefined' || !ret || ret == null || ret == '') {
		if (gotoLogin) {
			uni.navigateTo({
				url: '/pages/index/login'
			})
		}
		return false;
	}
	// token = uni.getStorageSync(WP_TokenStr);
	// if (typeof(token) == 'undefined' || !token || token == null || token == '') {
	// 	if (gotoLogin) {
	// 		uni.navigateTo({
	// 			url: '/pages/index/login'
	// 		});
	// 	}
	// 	return false;
	// }
	return true;
}

//Token
const setToken = function(token) {
	uni.setStorageSync(WP_TokenStr, token);
}

const getToken = function() {
	return uni.getStorageSync(WP_TokenStr);
}
//

const getUserID = function() {
	if(getUserInfo() == null || getUserInfo() == undefined || getUserInfo() == ""){
		return -1
	}
	return getUserInfo().ID
}

const logOut = function() {
	uni.clearStorage();
	uni.navigateTo({
		url: '/pages/index/index.vue'
	});
}

export default {
	getUserInfo,
	setUserInfo,
	checkUserInfo,
	setToken,
	getToken,
	logOut,
	getUserID
}
