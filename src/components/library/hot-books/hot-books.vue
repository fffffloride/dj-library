<template>
    <div id="hot-books" v-if="bookList">
        <!-- <Search /> -->
        <BookTable :data="bookList" :config="bookTableConfig" ref="table" />
    </div>
</template>
<script>
import Search from '../search/search'
import BookTable from '../book-table/book-table'
export default {
    data(){
        return {
            bookList:'',
            bookTableConfig:{
                borrowState:true,
                returnState:false,
                modifyState:false,
                port:'/dj_library/book/findHotBook/?pageNum='
            },
        }
    },
    props:{
        data:{
            type:Array
        }
    },
    components:{
        // Search,
        BookTable
    },
    created(){
        let that = this;
        this.$http.post('/dj_library/book/findHotBook/?pageNum=1')
            .then(function(res){
                console.log(res);
                if(res.body.code == 200){
                    that.bookList = res.body.data;
                    console.log(that.bookList);
                }
            })  
        console.log(sessionStorage);
    }
}
</script>
<style lang="less" scoped>
    #hot-books {
        width: 100%;
        height: 100%;
        // background-color: #213123;
    }
</style>





