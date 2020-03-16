# 基础

## 基础
:::demo 暂定
```html
<Input />
<Input ref="test1" >123</Input>
<input ref="test2" >123</input>
<div ref="test3"></div>
<script>
export default {
    data(){
        return {
          
        }
    },
    mounted(){
        this.$dp(this.$refs.test2,{trigger:'click'})
    },
    methods:{
        
    }
 
}
</script>

```
:::
