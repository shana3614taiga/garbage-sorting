let base_url = 'https://admin.wvenvir.com/'

if (process.env.NODE_ENV === 'development') {
	// 开发环境
	base_url = 'https://admin.wvenvir.com/'
	//base_url = "http://121.196.34.75:18080/"
} else {
	// 生产环境
	base_url = 'https://admin.wvenvir.com/'
}

export default{
	base_url
}