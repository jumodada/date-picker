# 日期选择器

## 基本用法
:::demo以在vue中使用为例 
```html
<Input width="300" ref="int" />
<script>
export default {
    mounted(){
         let el = this.$refs.int.$el
         this.datePicker(el)
        
    },
 
}
</script>

```
:::


## 选择器类型Type
:::demo目前支持`date`和`date-range`
```html
<Input width="300" ref="int" />
<script>
export default {
    mounted(){
         let el = this.$refs.int.$el
         this.datePicker(el,{type:'date-range'})
    },
 
}
</script>

```
:::


## 禁用Disabled
:::demo`disabled`是一个函数，参数为当前日期，返回`boolean`决定是否禁用这一天。
```html
<Input width="300" ref="int" />
<script>
export default {
    mounted(){
         let el = this.$refs.int.$el
         this.datePicker(el,{
           type:'date-range',
           disabled (date) {
             return date && date.valueOf() < Date.now() 
           }
      })
    },
 
}
</script>

```
:::


## 格式Format
:::demo通过设置`format`改变日期显示格式。
```html
<Input width="300" ref="int" />
<script>
export default {
    mounted(){
         let el = this.$refs.int.$el
         this.datePicker(el,{
           type:'date',
           format:'yyyy年MM月dd日'
      })
    },
 
}
</script>

```
:::
## 事件Event
:::demo通过`on`函数可以实现对一些事件的监听，传入回调函数的参数是选择的日期。具体见[API](#/components/API)
```html
<Input width="300" ref="int" />
<script>
export default {
    mounted(){
         let el = this.$refs.int.$el
         let dp = this.datePicker(el)
         dp.on('change',(date)=>{
           const year = date.getFullYear()  
           const month = date.getMonth()+1  
           const day = date.getDate()  
           this.$message.success('你选择了'+`${year}/${month}/${day}`) 
        })
    },
 
}
</script>

```
:::


## 解绑Unbind
:::demo通过`unbind`方法可以解除对输入框的绑定，同时会在dom树上删除弹出框的节点以及一些事件监听。
```html
<Input style="display:inline-flex" width="300" ref="int" />
<f-button @click="datepickerUnbind">解除绑定</f-button>
<script>
export default {
    data(){
         return {
           datepicker:null
         }
    },
    mounted(){
         let el = this.$refs.int.$el
         this.datepicker = this.datePicker(el,{type:'date-range'})
    },
    methods:{
      datepickerUnbind(){
        this.datepicker.unbind()
     } 
   }
 
}
</script>

```
:::

## 获取Date
:::demo通过`getDate`方法可以获取选择的日期，如果没有选择，则返回null。
```html
<Input style="display:inline-flex" width="300" ref="int" />
<f-button @click="getDate">获取日期</f-button>
<f-button @click="getYear">获取选择的年份</f-button>
<script>
export default {
    data(){
         return {
           datepicker:null
         }
    },
    mounted(){
         let el = this.$refs.int.$el
         this.datepicker = this.datePicker(el)
    },
    methods:{
      getDate(){
        console.log(this.datepicker.getDate())
      },
      getYear(){
      this.$message.success('你选择了'+this.datepicker.getYear()+'年')
      }
   }
 
}
</script>

```
:::

## 位置Placement
:::demo通过设置`placement`改变日期弹出框的出现位置。默认为`bottom`
```html
<Input width="300" ref="int" />
<script>
export default {
    mounted(){
         let el = this.$refs.int.$el
         this.datePicker(el,{
           type:'date',
           placement:'top'
         })
    
    },
 
}
</script>

```
:::