import Vue from 'vue'
import App from './app'
import router from './router'
import demoCard from './components/demo-card'
import highlightJs from 'highlight.js'
import './assets/styles/index.scss'
import Icon from './components/icon'
import Input from './components/Input'
import '../src/assets/src/date-time-picker.scss'
Vue.component(demoCard.name, demoCard)
Vue.component(Input.name, Input)
Vue.component(Icon.name,Icon)
import datePicker from './date-picker'
import Message from './components/message'
Vue.prototype.datePicker = datePicker
Vue.prototype.$message = Message
router.afterEach(() => {
   Vue.nextTick(() => document.querySelectorAll('pre code').forEach(block=>highlightJs.highlightBlock(block)))
})


new Vue({
   ...App,
   router
}).$mount('#app')
