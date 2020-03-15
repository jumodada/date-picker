# 基础

## 基础
:::demo 暂定
```html
<Input />
<Input ref="input" >123</Input>
<div ref="test" >123</div>
<script>
export default {
    data(){
        return {
          
        }
    },
    mounted(){
        this.$dp(this.$refs.input.$el,{})
    },
    methods:{
        
    }
 
}
</script>

```
:::
