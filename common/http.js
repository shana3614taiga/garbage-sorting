import storage from '@/common/storage.js'
import config from '@/common/config.js'

const http = (options, loadingText, showLoading = true) => {
	return new Promise((resolve, reject) => {

		let token = storage.getToken();
		if (typeof(token) == 'undefined' || token == null || token == '') {
			token = storage.getToken();
		}

		if (typeof(loadingText) == 'undefined' || loadingText == null) {
			loadingText = "正在加载...";
		}

		if (showLoading) {
			uni.showLoading({
				title: loadingText
			})
		}

		uni.request({
			method: options.method,
			url: config.base_url + options.url,
			data: options.data,
			header: {
				//'Access-Control-Allow-Origin': '*',
				'Content-Type': 'application/json;charset=UTF-8',
				'wp.token': token,
			},
			success: (res) => {
				if (res && res.statusCode != 200) {

				}
				resolve(res.data)
			},
			fail: (res) => {
				reject(res.data);
			},
			complete: () => {
				if (showLoading) {
					setTimeout(() => {
						uni.hideLoading();
					}, 100);
				}
			}
		});
	})
}
export default http;
