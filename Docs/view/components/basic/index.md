# 基础

## 基础
:::demo 暂定
```html
<Input width="300" ref="test3" />
<Input ref="test1" >123</Input>
<input style="width:300px" ref="test2" >123</input>
<script>
export default {
    data(){
        return {
          
        }
    },
    mounted(){
        this.$dp(this.$refs.test1.$el,{type:'date',disabled:(date)=>{
                                                             return date && date.valueOf() < Date.now() + 86400000; 
                                                   }})
        let a = this.$dp(this.$refs.test2,{type:'date-range'},)
        let b = this.$dp(this.$refs.test3.$el,{type:'date-range'},)
    },
    methods:{
        
    }
 
}
</script>

```
:::
