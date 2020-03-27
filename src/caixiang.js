const DatePicker = require('datePicker')
const $el = document.querySelector('#input')


const dp  =  DatePicker($el,{
    //options
    trigger:'click',
    format:'',
    //....
})

dp.on('change',callback)
dp.on('cancel',callback)
dp.on('show',callback)
dp.on('close',callback)


dp.unbind()
//销毁对输入框的绑定