<img src='https://s1.ax1x.com/2020/04/03/GNDrM4.png' height='60'  />

## flex-date-picker
A datepicker for PC

![](https://camo.githubusercontent.com/b39d1e12ba779319ff9bab0f56ba7e41f108d898/68747470733a2f2f696d672e736869656c64732e696f2f6769746875622f6c6963656e73652f6a756d6f646164612f76756558696e2e737667)
![code-test](https://github.com/jumodada/date-picker/workflows/code-test/badge.svg)

## Installing

Using npm:

```bash
$ npm install flex-date-picker
```

Using yarn:

```bash
$ yarn add flex-date-picker
```

## Usage

es6
```js
import datePicker from 'flex-date-picker'
import 'flex-date-picker/dist/index.css'
```
CommonJS 

```js
const datePicker = require('flex-date-picker').default
require('flex-date-picker/dist/index.css')
```


## Example

```html
<input type="text" id="input">
```

```js
 datePicker(document.querySelector('#input'),{
      type:'date'
       // options...
    })
```

## Options

| Options | Description | Type | Accepted Values | Default |
|---------|------------ |---------- |-------------  |-------- |
| type | type of datepicker | string | date/date-range | date |
| format | Output format | string | - | yyyy/mm/dd |
| disabled | prohibited dates | function | - | - |

## Options Example

- disabled

```js
datePicker(document.querySelector('#input'),{
      type:'date',
      disabled:(date)=>{
        return date && date.valueOf() < Date.now() 
      }
    })
```






