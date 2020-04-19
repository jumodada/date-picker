<img src='https://s1.ax1x.com/2020/04/03/GNDrM4.png' height='60'  />

## flex-date-picker
A datepicker for PC

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
| disabled | prohibited dates | function | - | - |
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






