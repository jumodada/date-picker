# 日期选择器

## 基本用法
:::demo以在vue中使用为例 
```html
<Input width="300" ref="int" />
<Input width="300" ref="int2" />
<script>
export default {
    mounted(){
         let el = this.$refs.int.$el
        let a =  this.datePicker(el,{
         placement:'left'         
         })
      let b =  this.datePicker(this.$refs.int2.$el,{
         placement:'left'         
         })
        a.unbind()
        
    },
 
}
</script>

```
:::

## 基本用法
:::demo以在vue中使用为例 
```html
<Input width="300" ref="int" />
<script>
export default {
    mounted(){
         let el = this.$refs.int.$el
         this.datePicker(el,{
         placement:'left'         
})
    },
 
}
</script>

```
:::
