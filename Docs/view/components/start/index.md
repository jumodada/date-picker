## 引入样式

使用es6
```js
import 'flex-date-picker/dist/index.css'
```
使用CommonJS 

```js
require('flex-date-picker/dist/index.css')
```



## 一个完整的例子

```html
<input type="text" id="input">
```

```js
import datePicker from 'flex-date-picker'
import 'flex-date-picker/dist/index.css'


 datePicker(document.querySelector('#input'),{
      type:'date'
       // options...
    })
```

## 参数

- 第一个参数必须是`input`元素,用于绑定你指定的输入框(目前只支持input标签，不支持virtual dom)。
   
  如果你用的是例如[ElementUI](https://github.com/ElemeFE/element)的组件库。
  也能绑定到其里面的`input`元素。
  
 ```html
 <el-input ref="input" />
 ```
 
  ```js
  import datePicker from 'flex-date-picker'
  import 'flex-date-picker/dist/index.css'
  
  let el = this.$refs.input.$el
   datePicker(el)
  ```

- 第二个参数是配置，下面是常见的配置。具体详见[API](#/components/API)
```js
{
    type:'date-range',
    format:'yyyy/mm/dd',
    placement:'bottom',
    //.....
}
```


