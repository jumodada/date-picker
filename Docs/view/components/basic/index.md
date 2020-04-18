# 基础

## 基础
:::demo 暂定
```html
<Input width="300" ref="test1" />
<Input ref="test2" >123</Input>
<input style="width:300px" ref="test3" >123</input>
<script>
export default {
    data(){
        return {
          
        }
    },
    mounted(){
        let a = this.$dp(this.$refs.test1.$el,{type:'date',disabled:(date)=>{
                                                             return date && date.valueOf() < Date.now() + 86400000; 
                                            }})
        let b = this.$dp(this.$refs.test2.$el,{type:'date-range'},)
        let c = this.$dp(this.$refs.test3,{type:'date-range'},)
      
        
       
    },
    methods:{
        
    }
 
}
</script>

```
:::
