# 日期选择器

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
