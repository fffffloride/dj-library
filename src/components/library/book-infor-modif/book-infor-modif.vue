<template>
    <div id="book-infor-modif" v-if="bookList">
        <Search />
        <!-- <router-view></router-view> -->
        <BookTable :data="bookList" :config="bookTableConfig" ref="table"/>
        <!-- <BookGrounding />  -->
    </div>
</template>
<script>
import Search from '../search/search'
import BookTable from '../book-table/book-table'
import BookGrounding from '../book-grounding/book-grounding'
export default {
    name:'book-infor-modif',
    data(){
        return {
            bookTableConfig:{
                borrowState:false,
                returnState:false,
                modifyState:true,
                port:'/dj_library/book/listBook/?pageNum=',
            },
            bookList:'',
        }
    },
    props:{
        data:{
            type:Array
        }
    },
    components:{
        Search,
        BookTable,
        BookGrounding
    },
    created(){
        let that = this;
        this.$http.post('/dj_library/book/listBook/?pageNum=1')
            .then(function(res){
                console.log(res);
                if(res.body.code == 200){
                    that.bookList = res.body.data;
                    console.log(that.bookList);
                }
            })
    }
}
</script>
<style lang="less" scoped>
    #book-infor-modif {
        
        // .book-grounding {
        //     position: absolute;
        //     left: 100%;
        //     width: 100%;
        //     background-color: #eff3f6;
        // }
    }
</style>


