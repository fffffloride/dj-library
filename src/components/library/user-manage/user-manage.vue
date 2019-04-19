<template>
    <div id="user-table">
        <div class="table-header">
            <div class="table-common-item user-name">姓名</div>
            <div class="table-common-item user-score">分值</div>
            <div class="table-common-item user-rank" >排行</div>
            <div class="table-common-item user-rank user-allowed" >借阅权限</div>
        </div>
        <div class="table-body">
            <div class="item-wrapper">
                <div class="row-item" v-for="(item,key) in showItems" :key="key">
                    <div class="table-common-item index">{{key+1}}</div>
                    <div class="table-common-item user-name text-overflow ">{{item.userName}}</div>
                    <div class="table-common-item user-score">{{item.score}}</div>
                    <div class="table-common-item user-score">{{key+1}}</div>
                    <div class="table-common-item user-authority">
                        <ToggleButton :state="item.isAllowBorrow" :userId="item.userId" />
                    </div>
                </div>
            </div> 
            <div class="footer">
                <ul class="pagination">
                    <li>
                        <select v-model="optionValue">
                            <option  v-for="count in data.totalPage" :key='count' :value='count'>{{count}}</option>
                        </select>
                        页
                    </li>
                    <li class="all-page">
                        共{{data.totalPage}}页
                    </li>
                    <li class="prev" @click="prevRequest"><</li>
                    <li class='next' @click="nextRequest">></li>
                </ul>
            </div> 
        </div>
    </div>
</template>
<script>
import ToggleButton from '../toggle-button/toggle-button'
export default {
    data(){
        return {
            showItems:'', 
            power:false,        
            optionValue:'',
            data:'',
        }
    },
    watch:{
        optionValue(val){
            let that = this;
            this.$http.post('/dj_library/admin/autoSortScore?pageNum='+val)
                .then(res => {
                    console.log(res);
                    if(res.body.code == 200){
                        that.showItems = res.body.data.userList;
                        console.log(that.showItems)
                    }else{
                        alert(res.body.msg);
                    }
                })
            console.log('option true');
        }
    },
    methods:{
        prevRequest(){
            if(this.optionValue > 1){
                console.log('prev ture')
                this.optionValue--;
            }else{
                console.log('prev false')
                return false;
            }
        },
        nextRequest(){            
            if(this.optionValue < this.data.totalPage){
                 console.log('next ture')
                this.optionValue++;
            }else{
                 console.log('next false')
                return false;
            }
        },
    },
    components:{
        ToggleButton,
    },
    created(){
        let that = this;
        this.$http.post('/dj_library/admin/autoSortScore?pageNum=1')
            .then(function(res){
                console.log(res);
                if(res.body.code == 200){
                    that.data = res.body.data;
                    that.showItems = res.body.data.userList;
                    console.log(that.showItems)
                }
            })
    }
}
</script>
<style lang="less" scoped>
    #user-table {
        width: 100%;
        height: 575px;
        // background-color: #213123;
        .table-header {
            height: 35px;
            line-height: 35px;
            font-size: 14px;
            font-weight: bold;
            color: #646987;
            background-color: #e3e8ee;
            padding: 0 60px;
            text-align: left;       
        }
        .table-body {
            margin: 20px 30px;
            .item-wrapper {
                max-height: 790px;
                overflow: hidden;
                .row-item {
                    margin-top: 10px;
                    background-color: #fff;
                    height: 70px;
                    line-height: 70px;
                    font-size: 14px;
                    min-width: 1300px;
                    .index {
                        padding: 0;
                        width: 20px;
                        height: 20px;
                        margin-top: 25px;
                        background: #eee;
                        border-radius: 4px;
                        text-align: center;
                        line-height: 20px;
                        margin-left: 12px;
                        font-weight: bold;
                    }
                    .action-button {
                        margin-right: 10px;
                        cursor: pointer;
                        margin-top: 17px;
                        padding: 3px 6px;
                        color: #fff;
                        width: 32px;
                        height: 24px;
                        text-align: center;
                        line-height: 26px;
                        background-color: #00a1d6;
                        border-radius: 4px;
                        float: left;
                        &:hover {
                            background-color: #00b5e5; 
                        }
                        &.modify-button {
                            background-color: #e74c3c;
                            &:hover {
                                background-color: #e77;
                            }
                        }
                        &.return-button {
                            background-color: #2ecc71;
                            &:hover {
                                background-color: #58d68d;
                            }
                        }
                        &.desc-button {
                            background-color: #e74c3c;
                            &:hover {
                                background-color: #e77;
                            }
                        }
                    }
                }
            }
            .footer {
                float: right;
                margin-right: 20px;
                font-size: 15px;
                
                .pagination {
                    margin: 20px 0;
                    li {
                        display: inline-block;
                        vertical-align: middle;
                        word-spacing: normal;
                        & select {
                            vertical-align: text-bottom;
                            text-transform: none;
                            cursor: pointer;
                        }
                        &.all-page {
                            padding: 0 10px;

                        }
                        &.prev,&.next {
                            width: 12px;
                            height: 12px;
                            line-height: 14px;
                            padding: 4px;
                            background-color: #fff;
                            border-radius: 2px;
                            cursor: pointer;
                        }
                    }
                }
            }
        }
        .table-common-item {
            float: left;
            padding: 0 30px;
        }
        .right-line {
            border-right: 1px solid #eee; 
        }
        .user-name {
            width: 300px;
            // max-width: 300px;
        }
        .user-score,.user-rank{
            width: 100px;
            // max-width: 100px;
            text-align: center;
        }
        .user-authority{
            // text-align: center;
            width: 200px;
        }
        
    }
</style>


