<template>
    <div id="book-memory" v-if="memoryList">
        <BookTable :data="memoryList" :config="bookTableConfig" ref="table" />
    </div>
</template>
<script>
import BookTable from '../book-table/book-table'
export default {
    data(){
        return {
            bookTableConfig:{
                memoryState:true,
                borrowState:false,
                returnState:true,
                modifyState:false,
                port:'',
            },
            memoryList:'',
            power:'',
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
        this.power = sessionStorage.getItem('power');
        let that = this;
        if(this.power == 'true'){
            this.$http.post('dj_library/admin/getBorrowBookMsg?pageNum=1')
            .then(function(res){
                console.log(res);
                if(res.body.code == 200){
                    that.memoryList = res.body.data;
                    console.log(that.memoryList);
                }
            })
            this.bookTableConfig.port = 'dj_library/admin/getBorrowBookMsg?pageNum=';
        }else{
            this.$http.post('dj_library/user/getBorrowBookMsgByUserId?pageNum=1')
            .then(function(res){
                console.log(res);
                if(res.body.code == 200){
                    that.memoryList = res.body.data;
                    console.log(that.memoryList);
                }else{
                    alert('请求失败');
                }
            })
            this.bookTableConfig.port = 'dj_library/user/getBorrowBookMsgByUserId?pageNum=';
        }
    }
}
</script>
<style lang="less" scoped>
    #book-memory {
        
    }
</style>


