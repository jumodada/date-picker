# 基础

## 基础
:::demo 暂定
```html
<Input width="300" ref="int" />
<script>
export default {
    data(){
        return {
          
        }
    },
    mounted(){
         let el = this.$refs.int.$el
         this.datePicker(el,{type:'date',disabled:(date)=>{
          return date && date.valueOf() < Date.now() + 86400000; 
         }})
    
    },
    methods:{
        
    }
 
}
</script>

```
:::
