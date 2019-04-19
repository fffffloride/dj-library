<template>
    <div id="book-return">
        <!-- <Search /> -->
        <BookTable :data="data" :config="bookTableConfig" />
    </div>
</template>
<script>
// import Search from '../search/search'
import BookTable from '../book-table/book-table'
export default {
    data(){
        return {
            bookTableConfig:{
                borrowState:false,
                returnState:true,
                modifyState:false,
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
    }
}
</script>
<style lang="less" scoped>
    #book-return {
        width: 100%;
        height: 100%;
        // background-color: #213123;
    }
</style>





