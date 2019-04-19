<template>
    <div id="all-books" v-if="bookList">
        <Search @child-data='getChildData' />
        <BookTable :data="bookList" :config="bookTableConfig" ref="table"  />
    </div>
</template>
<script>
import Search from '../search/search'
import BookTable from '../book-table/book-table'
export default {
    data(){
        return {
            bookTableConfig:{
                memoryState:false,
                borrowState:true,
                returnState:false,
                modifyState:false,
                descriptionState:true,
                dateState:false,
                name:'allBook',
                port:'/dj_library/book/listBook/?pageNum='
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
            showBookItems:'',
            bookList:'',
        }
    },
    components:{
        Search,
        BookTable
    },
    methods:{
        getChildData(data,port){
            let table =this.$refs.table;
            table.data = data;
            table.showItems = data.bookList;
            table.port = port;
            
            // this.bookList = data; 
            // this.bookTableConfig.port = port;
            console.log('true')
        }
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
        // console.log(1);
    }
}
</script>
<style lang="less" scoped>
    #all-books {
        width: 100%;
        height: 100%;
        // background-color: #213123;
    }
</style>


