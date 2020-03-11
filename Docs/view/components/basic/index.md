# 基础

## 基础
:::demo 暂定
```html
<Input />

<script>
export default {
    data(){
        return {
          
        }
    },
    mounted(){
        this.$dp()
    },
    methods:{
       exceeded(files){
         console.log(files)
        },
       beforeRemove(){
         return true
       }    
    }
 
}
</script>

```
:::
