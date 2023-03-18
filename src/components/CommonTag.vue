<template>
    <div class="tag">
        <el-tag
            v-for="(item,index) in tags"
            :key="item.name"
            :effect="item.name==$route.name?'dark':'plain'"
            :closable="item.name!=='home'"
            @click="changeRoute(item)"
            @close="closeTag(item,index)">
            {{item.label}}
        </el-tag>
    </div>
</template>

<script>
import {mapState} from 'vuex'

export default{
    data(){
        return{
            
        }
    },
    computed:{
        ...mapState({
            tags:state=>state.tab.tabsList
        })
    },
    methods:{
        changeRoute(item){
            this.$router.push({
                path:item.path
            })
        },
        closeTag(item,index){
            this.$store.commit('deleteMenu',item)
            const indexOfTags = this.tags.length//数组中的索引长度,相比删除前少了1个，所以不减1
            if(item.name != this.$route.name){
                //如果关闭的不是激活的tag
                return
            }
            if(index===indexOfTags){
                //如果关闭的是最后一个tag
                this.$router.push({
                    path:this.tags[index-1].path
                })
            }else{
                // 关闭中间的tag，则跳转到后一个tag
                this.$router.push({
                    path:this.tags[index].path
                })
            }
        }
    }
}
</script>

<style lang="less">
.tag{
    padding: 20px;
    .el-tag{
        margin-right: 15px;
        cursor: pointer;
    }
}
</style>