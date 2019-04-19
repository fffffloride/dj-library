<template>
    <div id="new-books" v-if="bookList">
        <!-- <Search /> -->
        <BookTable :data="bookList" :config="bookTableConfig" ref="table" />
    </div>
</template>
<script>
// import Search from '../search/search'
import BookTable from '../book-table/book-table'
export default {
    data(){
        return {
            bookList:'',
            bookTableConfig:{
                borrowState:true,
                returnState:false,
                modifyState:false,
                name:'newBook',
                port:'/dj_library/book/findBookByOnsaleDate/?pageNum='
            },
            allBookItems:[
                {
                    bookName:'java编程思想111111111111111111111111111111111111111111111111111111111111111111',
                    bookCanDay:'30',
                    bookPastDay:'0',
                    bookSurplusDay:'30',
                    bookPrice:'80',
                    isBorrowed:'是',
                },
                {
                    bookName:'java编程思想',
                    bookCanDay:'30',
                    bookPastDay:'0',
                    bookSurplusDay:'30',
                    bookPrice:'80',
                    isBorrowed:'否',
                },
                {
                    bookName:'java编程思想',
                    bookCanDay:'30',
                    bookPastDay:'0',
                    bookSurplusDay:'30',
                    bookPrice:'80',
                    isBorrowed:'否',
                },
                {
                    bookName:'java编程思想',
                    bookCanDay:'30',
                    bookPastDay:'0',
                    bookSurplusDay:'30',
                    bookPrice:'80',
                    isBorrowed:'是',
                },
                {
                    bookName:'java编程思想',
                    bookCanDay:'30',
                    bookPastDay:'0',
                    bookSurplusDay:'30',
                    bookPrice:'80',
                    isBorrowed:'否',
                },
                {
                    bookName:'java编程思想',
                    bookCanDay:'30',
                    bookPastDay:'0',
                    bookSurplusDay:'30',
                    bookPrice:'80',
                    isBorrowed:'是',
                },
                {
                    bookName:'java编程思想',
                    bookCanDay:'30',
                    bookPastDay:'0',
                    bookSurplusDay:'30',
                    bookPrice:'80',
                    isBorrowed:'是',
                },
                {
                    bookName:'java编程思想',
                    bookCanDay:'30',
                    bookPastDay:'0',
                    bookSurplusDay:'30',
                    bookPrice:'80',
                    isBorrowed:'是',
                },
                {
                    bookName:'java编程思想',
                    bookCanDay:'30',
                    bookPastDay:'0',
                    bookSurplusDay:'30',
                    bookPrice:'80',
                    isBorrowed:'是',
                },
                {
                    bookName:'java编程思想',
                    bookCanDay:'30',
                    bookPastDay:'0',
                    bookSurplusDay:'30',
                    bookPrice:'80',
                    isBorrowed:'是',
                },
            ],
        }
    },
    props:{
    },
    components:{
        // Search,
        BookTable
    },
    created(){
        let that = this;
        this.$http.post('/dj_library/book/findBookByOnsaleDate/?pageNum=1')
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
    #new-books {
        width: 100%;
        height: 100%;
        // background-color: #213123;
    }
</style>




