// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import "./assets/icon/iconfont.css"
import Icon from "./baseComponets/Icon.vue";
import  LazyImg from "./baseComponets/LazyImg.vue";
Vue.config.productionTip = false
Vue.use(ElementUI)


// icon 组件
Vue.component(Icon.name, Icon)
Vue.component(LazyImg.name, LazyImg)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: {
    App
  },
  template: '<App/>'
})
