(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/my/my_ranking"],{"303f":function(t,n,e){"use strict";Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var u=r(e("8e4b")),a=(r(e("ed59")),r(e("1d12")));function r(t){return t&&t.__esModule?t:{default:t}}var o={data:function(){return{userId:null==a.default.getUserInfo()?"":a.default.getUserInfo().userId,list:[],rank:0,point:0}},onLoad:function(){this.loadRank()},methods:{loadRank:function(){var t=this;u.default.integralRank(this.userId).then((function(n){if(n.success){var e=JSON.parse(n.data);t.list=e.data,t.rank=e.curr,t.point=e.point,console.log(t.list)}}))},loadUser:function(){var t=this;u.default.getUser(this.userId).then((function(n){n.success&&(t.point=JSON.parse(n.data).point)}))}}};n.default=o},ac28:function(t,n,e){"use strict";e.r(n);var u=e("303f"),a=e.n(u);for(var r in u)"default"!==r&&function(t){e.d(n,t,(function(){return u[t]}))}(r);n["default"]=a.a},bf11:function(t,n,e){"use strict";e.r(n);var u=e("f479"),a=e("ac28");for(var r in a)"default"!==r&&function(t){e.d(n,t,(function(){return a[t]}))}(r);var o,f=e("f0c5"),c=Object(f["a"])(a["default"],u["b"],u["c"],!1,null,null,null,!1,u["a"],o);n["default"]=c.exports},cd4e:function(t,n,e){"use strict";(function(t){e("5018");u(e("66fd"));var n=u(e("bf11"));function u(t){return t&&t.__esModule?t:{default:t}}t(n.default)}).call(this,e("543d")["createPage"])},f479:function(t,n,e){"use strict";var u;e.d(n,"b",(function(){return a})),e.d(n,"c",(function(){return r})),e.d(n,"a",(function(){return u}));var a=function(){var t=this,n=t.$createElement;t._self._c},r=[]}},[["cd4e","common/runtime","common/vendor"]]]);