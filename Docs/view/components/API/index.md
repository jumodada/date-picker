## API

### Options配置
| 配置 | 描述 | 类型 | 接受的值 | 默认值 |
|---------|------------ |---------- |-------------  |-------- |
| type | 选择器的类型 | string | date/date-range | date |
| format | 选择器输出日期的格式 | string | - | yyyy/mm/dd |
| placement | 选择器位于输入框的位置 | string | top/bottom/right/left | bottom |
| disabled | 禁用日期(具体用法见于例子) | function | - | - |

### Method方法
| 方法名 | 描述  | 
|---------|---------- |
| unbind | 解除对输入框的绑定  | 
| getDate | 获取当前选择的日期，如果没有选择，则返回null  | 
| getYear | 获取当前选择日期的年份，如果没有选择，则返回null  | 
| getMonth | 获取当前选择日期的月份，如果没有选择，则返回null  | 

### Event事件
| 事件名 | 描述  | 
|---------|---------- |
| change | 日期改变时触发的事件  | 



