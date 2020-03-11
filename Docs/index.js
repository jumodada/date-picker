import Vue from 'vue'
import App from './app'
import router from './router'
import demoCard from './components/demo-card'
import highlightJs from 'highlight.js'
import './assets/styles/index.scss'
import Icon from './components/icon'
Vue.component(demoCard.name, demoCard)
Vue.component(Icon.name,Icon)
router.afterEach(() => {
   Vue.nextTick(() => document.querySelectorAll('pre code').forEach(block=>highlightJs.highlightBlock(block)))
})


new Vue({
   ...App,
   router
}).$mount('#app')
