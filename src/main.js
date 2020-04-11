import Vue from 'vue'
//1. 导入 vue-router 包
import VueRouter from 'vue-router'
// 2. 手动安装 VueRouter
Vue.use(VueRouter)
import app from './app.vue'

import router from './loader.js'
var vm = new Vue({
  el: "#app",
  methods: {

  },
  render: h => h(app), //render 会把 el 指定的容器内容覆盖
  // 路由的 router-view 和 router-Link 不要直接写到 el 是容器中
  router
})