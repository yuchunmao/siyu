import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store/'
import axios from 'axios'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import VueQuillEditor from 'vue-quill-editor'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import 'babel-polyfill'

Vue.prototype.$axios = axios
 //axios.defaults.baseURL = 'http://39.100.113.191:6300';
 
//Vue.prototype.address = "http://192.168.0.21:6300"; 
  
//线上
  Vue.prototype.address =" http://39.100.113.191:6300";	
	 
//测试
//Vue.prototype.address ="http://39.100.133.149:6300";			
	 
Vue.config.productionTip = false;

Vue.use(VueQuillEditor, /* { default global options } */)
Vue.use(ElementUI);
if (!window.Promise) require('es6-promise').polyfill()
new Vue({
	el: '#app',
	router,
	store,
	axios,
	template: '<App/>',
	components: { App }
})
