<template>
    <div id="search" @keyup.enter="findSubmit">
        <div class="search-box">
            <i></i>
            <input type="text" v-model="searchVal" v-focus>
        </div>
        <div class="date">
            上架时间：<input type="date" v-model="searchDate" >
        </div>
        <div class="selected">
            书籍状态：
            <select v-model="bookState">
                <option value=0>空闲</option>
                <!-- <option value=1>被借</option> -->
                <option value=''>全部</option>
            </select>
        </div>  
        <div class="search-button">
            <span @click="findSubmit">查询</span>
        </div>
        <transition name='fade'>
            <div class="search-button" v-show="returnStatus">
                <span @click="returnAllBook">返回</span>
            </div>
        </transition>
    </div>
</template>
<script>
export default {
    data(){
        return {
            searchVal:'',
            searchDate:'',
            bookState:'',
            data:'',
            port:'',
            returnStatus:false,
        }
    },
    methods:{
        findSubmit(){
            // if(!this.searchVal && !this.searchDate && this.bookState == 0){
            //     alert('请选择查询条件！');
            //     return false;
            // }
            let that = this;
            this.$http.post('/dj_library/book/getBookListBybookCondition?bookName='+this.searchVal+'&bookDate='+this.searchDate+'&isborrowedout='+this.bookState+'&pageNum=1')
                .then(res => {
                    console.log(res);
                    if(res.body.code == 200){
                        that.returnStatus = true;
                        that.data = res.body.data;
                        that.port = '/dj_library/book/getBookListBybookCondition?bookName='+that.searchVal+'&bookDate='+that.searchDate+'&isborrowedout='+that.bookState+'&pageNum=';
                        that.send();
                        console.log(that)
                    }else{
                        alert('查询失败');
                    }
                })
        },
        send(){
            this.$emit('child-data',this.data,this.port);
        },
        returnAllBook(){
            let that = this;
            this.$http.post('/dj_library/book/listBook/?pageNum=1')
                .then(function(res){
                    console.log(res);
                    if(res.body.code == 200){
                        that.data = res.body.data;
                        that.bookState = '';
                        that.port = '/dj_library/book/listBook/?pageNum=';
                        that.send();
                        that.returnStatus = false; 
                    }
                })
        }
    }

}
</script>
<style lang="less" scoped>
    #search {
        height: 44px;
        width: 100%;
        background: #356;
        padding: 36px;
        font-size: 14px;
        .search-box {
            width: 230px;
            border-radius: 20px;
            float: left;
            padding: 5px 0;
            border: 1px solid #eee;
            i {
                width: 30px;
                height: 30px;
                display: inline-block;
                // background-image: url(/src/assets/search-icon.png);
                // background-size: 100% 100%;
                background: url(../../../assets/search-icon.png)
            }
            input {
                width: 180px;
                height: 30px;
                vertical-align: top;
                line-height: 30px;
                padding-left: 8px;
                outline: none;
                border: none;
                background: transparent;
                font-size: 14px;
                color: #fff;
                font-size: 16px;
            }
        }
        .date {
            float: left;
            color: #fff;
            margin: 7px 30px;
            input {
                border-radius: 4px;
                outline: none;
                height: 30px;
                box-sizing: border-box;
                font-size: 16px;
            }
        }
        .selected {
            float: left;
            color: #fff;
            select {
                outline: none;
                margin-top: 7px;
                font-size: 16px;
                cursor: pointer;
                width: 80px;
                height: 30px;
                border-radius: 4px;
                padding-left: 8px;
                text-transform: none;
            }
        }
        .search-button {
            float: left;
            span {
                color: #000;
                cursor: pointer;
                text-align: center;
                line-height: 30px;
                width: 60px;
                display: block;
                margin: 7px 30px;
                background-color: #fff;
                border-radius: 4px;
                height: 30px;
                transition: .2s;
                &:hover {
                    background-color: #eee;
                    transition: .2s;
                }
            }
        }
        .fade-enter-active, .fade-leave-active {
            transition: all .5s;
        }
        .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
            transform: translateX(-30px);
            opacity: 0;
        }
    }
</style>


