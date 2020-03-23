import Vue from 'vue'
import App from './app'
import router from './router'
import demoCard from './components/demo-card'
import highlightJs from 'highlight.js'
import './assets/styles/index.scss'
import Icon from './components/icon'
import Input from './components/Input'
import '../src/assets/date-time-picker.scss'
Vue.component(demoCard.name, demoCard)
Vue.component(Input.name, Input)
Vue.component(Icon.name,Icon)
import dp from './date-picker'
Vue.prototype.$dp = dp
router.afterEach(() => {
   Vue.nextTick(() => document.querySelectorAll('pre code').forEach(block=>highlightJs.highlightBlock(block)))
})


new Vue({
   ...App,
   router
}).$mount('#app')
