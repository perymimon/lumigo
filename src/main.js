// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import '@/style/normalize.css'
import '@/style/general-style.css'


Vue.config.productionTip = false

const globalState = {user: {name: 'pp', id: '123'}};
/* eslint-disable no-new */
new Vue({
  el: '#app',
  data: globalState,
  router,
  components: {App},
  template: '<App/>',
  async mounted () {
    if ( localStorage.userId){
      this.$data.user.id = localStorage.userId;
      this.$data.user.name = localStorage.userName;
    }
  }
})
