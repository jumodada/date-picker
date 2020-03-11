const DatePicker = require('datePicker')
const $el = document.querySelector('#input')


const dp  = new DatePicker()

dp.onChange(callback)
//日期选择器值发生改变时触发回调，参数为日期值和其他一些东西

dp.destroy()
//销毁对输入框的绑定