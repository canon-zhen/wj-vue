// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue, {h} from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import store from './store'

// 设置反向代理，前端请求默认发送到http://localhost:8443/api
var axios = require('axios')
axios.defaults.baseURL = 'http://localhost:8443/api'
// 全局注册，之后可在其他组件中通过 this.$axios 发送数据
Vue.prototype.$axios = axios

// import axios from "axios";
// Vue.prototype.$axios = axios
// axios.defaults.baseURL = 'http://localhost:8443/api'

// 阻止vue 在启动时生成生产提示
Vue.config.productionTip = false

Vue.use(ElementUI)

//在访问每一个路由前调用
router.beforeEach((to,from,next) => {
  if (to.meta.requireAuth) {
    if (store.state.user.username) {
      next()
    } else {
      next({
        path: 'login',
        query: {redirect: to.fullPath}
      })
    }
  }else{
    next()
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  render : h => h(App),
  router,
  store,
  components: { App },
  template: '<App/>'
})


