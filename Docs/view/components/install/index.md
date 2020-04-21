# flex-date-picker
### A datepicker for PC


## 安装

使用 npm:

```shell
$ npm install flex-date-picker
```

使用 yarn:
```shell
$ yarn add flex-date-picker
```

## 引入

使用es6
```js
import datePicker from 'flex-date-picker'
import 'flex-date-picker/dist/index.css'
```
使用CommonJS 

```js
const datePicker = require('flex-date-picker').default
require('flex-date-picker/dist/index.css')
```


## 示例
引入后可以通过`datePicker()`来创建一个实例，这是在内部就做好了的。

```html
<input type="text" id="input">
```

```js
 datePicker(document.querySelector('#input'),{
      type:'date'
       // options...
    })
```







