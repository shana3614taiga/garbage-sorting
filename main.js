import Vue from 'vue'
import App from './App'
import './static/css/css.css'
import shareAll from './common/shareAll.js'

Vue.config.productionTip = false

App.mpType = 'app'
Vue.mixin(shareAll)
2
Vue.prototype.lineBreakToBR = function(content){
	if(content == null){
		return
	}
		return content.replace(/\n|\r\n/g,'<br/>')
	}
const app = new Vue({
    ...App
})
app.$mount()
