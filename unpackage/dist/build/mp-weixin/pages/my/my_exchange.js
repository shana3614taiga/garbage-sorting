(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/my/my_exchange"],{1001:function(n,e,t){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var u=r(t("8e4b")),a=(r(t("ed59")),r(t("1d12")));function r(n){return n&&n.__esModule?n:{default:n}}var o={components:{},data:function(){return{userId:null==a.default.getUserInfo()?"":a.default.getUserInfo().userId,obj:null}},onLoad:function(){this.loadExchange()},methods:{loadExchange:function(){var n=this;u.default.integralExchange(this.userId).then((function(e){e.success&&(n.obj=JSON.parse(e.data))}))}}};e.default=o},"3e3a":function(n,e,t){"use strict";t.r(e);var u=t("b546"),a=t("b3a0");for(var r in a)"default"!==r&&function(n){t.d(e,n,(function(){return a[n]}))}(r);var o,c=t("f0c5"),f=Object(c["a"])(a["default"],u["b"],u["c"],!1,null,null,null,!1,u["a"],o);e["default"]=f.exports},b3a0:function(n,e,t){"use strict";t.r(e);var u=t("1001"),a=t.n(u);for(var r in u)"default"!==r&&function(n){t.d(e,n,(function(){return u[n]}))}(r);e["default"]=a.a},b546:function(n,e,t){"use strict";var u;t.d(e,"b",(function(){return a})),t.d(e,"c",(function(){return r})),t.d(e,"a",(function(){return u}));var a=function(){var n=this,e=n.$createElement;n._self._c},r=[]},bfa0:function(n,e,t){"use strict";(function(n){t("5018");u(t("66fd"));var e=u(t("3e3a"));function u(n){return n&&n.__esModule?n:{default:n}}n(e.default)}).call(this,t("543d")["createPage"])}},[["bfa0","common/runtime","common/vendor"]]]);