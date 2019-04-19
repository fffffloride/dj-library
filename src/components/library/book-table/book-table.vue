<template>
    <div id="book-table">
        <div class="table-header">
            <div class="table-common-item book-name">书名</div>

            <div class="table-common-item book-author" v-if="!config.memoryState">作者</div>
            <div class="table-common-item book-publish" v-if="!config.memoryState">出版社</div>

            <div class="table-common-item book-price">价格</div>
            <div class="table-common-item book-can-day" >可借天数</div>
            <div class="table-common-item book-past-day" v-if="config.memoryState">已借天数</div>
            <div class="table-common-item book-surplus-day" v-if="config.memoryState">剩余天数</div>
            <div class="table-common-item book-borrow" v-if="!config.memoryState">借阅</div>
        </div>
        <div class="table-body">
            <div class="item-wrapper" >
                <div class="row-item"  v-for="(item,key) in showItems" :key="key" @click="showItemDesc(key)">
                    <div class="table-common-item index">{{key+1}}</div>
                    <div class="table-common-item text-overflow book-name">{{item.bookName}}</div>

                    <div class="table-common-item book-author"
                        v-if="!config.memoryState">
                        {{item.bookAuthor}}
                    </div>
                    <div class="table-common-item book-publish text-overflow"
                        v-if="!config.memoryState">
                        {{item.bookPublish}}
                    </div>
                    <div class="table-common-item book-price">{{item.bookPrice}}</div>
                    <div class="table-common-item book-can-day" >{{item.dateCount}}</div>
                    <div class="table-common-item book-past-day" 
                        v-if="config.memoryState">
                        {{item.borrowedDays}}
                    </div>
                    <div class="table-common-item book-surplus-day" 
                        v-if="config.memoryState ">
                        {{item.dateCount - item.borrowedDays}}
                    </div>
                    <div class="button-wrapper">
                        <div class="borrow-button action-button"
                            @click.self.stop="borrowBook(key)"
                            v-if="config.borrowState && !power && (item.isborrowedout == 0)">
                            借阅
                        </div>
                        <div class="modify-button action-button"
                            @click.self.stop="modifyBook(key)"
                            v-if="config.modifyState &&　(item.isborrowedout == 0)">
                            修改
                        </div>
                        <div class="return-button action-button"
                            @click.self.stop="returnBook(key)"
                            v-if="config.returnState && !power && (item.isborrowedout !== 0)">
                            还书
                        </div>
                        <div class="desc-button action-button"
                            @click.self.stop="returnFalse"
                            v-if="(power && (item.isborrowedout !== 0)) || (!power && !config.memoryState  && (item.isborrowedout !== 0))">
                            被借
                        </div>
                        <div class="can-borrow-button action-button"
                            @click.self.stop="returnFalse"
                            v-if="power && (item.isborrowedout == 0) && !config.modifyState">
                            空闲
                        </div>
                        <span class="del"  
                            @click.self.stop="delPop(key)"
                            v-if="config.modifyState  &&　(item.isborrowedout == 0)">
                            X
                        </span>
                        <div class="extend-button action-button"
                            @click.self.stop="extendBook(key)"
                            v-if="!power && config.memoryState && (item.isborrowedout == 1)">
                            续借
                        </div>
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
            <transition name='fade-desc'>
            <div class="item-desc" v-if="itemDescriptionState && itemDescription" >
                <div class="desc-pic">
                    <img v-if="!itemDescription.bookImg" src="../../../assets/book-default-pic.jpg" alt="">
                    <img v-if="itemDescription.bookImg" :src="itemDescription.bookImg" alt="">
                </div>
                <div class="desc-text">
                    <p class="p-common-item text-overflow" v-if="itemDescription.user">借书人：{{itemDescription.user.userName}}</p>
                    <p class="p-common-item text-overflow" v-if="itemDescription.user">借书日期：{{itemDescription.beginDate.slice(0,10)}}</p>
                    <p class="p-common-item text-overflow" v-if="itemDescription.user">剩余天数：{{itemDescription.remainDayCount}}</p>
                    <p class="p-common-item brief">书籍简介：{{itemDescription.bookIntroduction}}</p>
                </div>
                <span class="close" @click="stateChange">X</span>
            </div>
            </transition>
            <transition name="fade-mask">
                <div class="mask" @click="itemDescriptionState = false" v-if="itemDescriptionState"></div>
            </transition>
        </div>
        <Pop :status='showPopStatus' :msg='popMsg' @pop-sure='getPopMsg' :buttonStatus='buttonPopStatus' />
    </div>
</template>
<script>
import VueEvent from '../../model/vueEvent'
import Pop from '../../pop/pop'
export default {
    data(){
        return {
            showItems:this.data.bookList || this.data.borrowingBooksVoList,   
            power:false,  
            itemDescription:'',
            itemDescriptionState:'',   
            optionValue:1,  
            port:this.config.port, 
            showPopStatus:false,
            buttonPopStatus:false,
            popMsg:'',
            popSure:'',
            delStatus:'',
            delIndex:'',
        }
    },
    props:{
        data:{
            type:Array,
            default(){
                return {
                    showItems:[],
                };
            }
        },
        config:{
            type:Object,
        }
    },
    computed:{
        powerState(){
            if(sessionStorage.getItem('power') == 'true'){
                return true;
            }else{
                return false;
            }
        },
        descPicUrl(){
            if(!this.itemDescription.bookImg){
                return '../../../assets/book-default-pic.jpg';
            }else{
                return this.itemDescription.bookImg;
            }
        },
    },
    watch:{
        optionValue(val){
            this.requestPost(val,this.port);
            console.log('option true');
        },
    },
    methods:{
        returnFalse(){
            return false;
        },
        showPop(msg,flag){
            this.showPopStatus = true;
            this.buttonPopStatus = flag;
            this.popMsg = msg;
        },
        getPopMsg(delStatus){
            this.delStatus = delStatus;
            console.log(this.delStatus)
            this.showPopStatus = false;
            if(this.delStatus){
                this.delBook();
            }
        },
        showItemDesc(index){
            let that = this;
            let id = this.showItems[index].bookId || this.showItems[index].borrowBookId;
            this.$http.post('/dj_library/book/getBorrowedMsgBybookId?bookId='+id)
                .then(res => {
                    console.log(res);
                    if(res.body.code == 200){
                        that.itemDescription = res.body.data;
                        that.itemDescriptionState = true;
                        // let mask = document.querySelector('.rank-mask');
                        // mask.style.display = 'block';
                    }else{
                        that.showPop('请求失败',false);
                    }
                }),function(error){
                    console.log(error)
                }
        },
        stateChange(){
            this.itemDescriptionState = '';
            let mask = document.querySelector('.rank-mask');
            mask.style.display = 'none';
        },
        isBorrowed(val){
            if(val == 1){
                return '是';
            }else{
                return '否';
            }
        },
        prevRequest(){
            if(this.optionValue > 1){
                console.log('prev ture')
                this.optionValue--;
            }else{
                that.showPop('当前已经是第一页了！',false); 
                return false;
            }
        },
        nextRequest(){            
            if(this.optionValue < this.data.totalPage){
                this.optionValue++;
            }else{
                that.showPop('当前已经是最后一页了！',false); 
                return false;
            }
        },
        requestPost(num,port){
            let that = this;
            console.log(port+num);
            this.$http.post(port+num)
                .then(function(res){
                    console.log(res);
                    if(res.body.code == '200'){
                        that.showItems = res.body.data.bookList || res.body.data.borrowingBooksVoList;
                    }
                }),function(error){
                    console.log(error);
                }
            console.log('post true');
        },
        borrowBook(index){
            let that = this;
            let id = this.showItems[index].bookId || this.showItems[index].borrowBookId;
            this.$http.post('/dj_library/user/borrowing/?bookId='+id)
                .then(res => {
                    console.log(res);
                    if(res.body.code == 200){
                        that.showItems[index].isborrowedout = 1; 
                        that.showPop('借书成功！',false);     
                    }else{
                        that.showPop(res.body.msg,false); 
                    }
                })
            
        },
        modifyBook(index){
            this.$router.push('/library/bookgrounding');
            console.log(1)
            VueEvent.$emit('modify-book',this.showItems[index]);
            console.log(2)
        },
        returnBook(index){
            let that = this;
            this.$http.post('/dj_library/user/returnBook?borrowBookId='+this.showItems[index].borrowBookId)
                .then(res => {
                    console.log(res);
                    if(res.body.code == 200){
                        that.showItems.splice(index,1);
                        that.showPop('还书成功！',false);
                    }else{
                        that.showPop('还书失败！',false);
                    }
                })
        },
        delPop(index){
            this.showPop('确定要删除该资源？删除后不可恢复！',true);
            console.log(index);
            this.delIndex = index;
        },
        delBook(){
            let index = this.delIndex;
            let that = this;
            let id = this.showItems[index].bookId || this.showItems[index].borrowBookId;
            this.$http.post('/dj_library/admin/delBook?bookId='+id)
                .then(res => {
                    console.log(res);
                    if(res.body.code == 200){
                        that.showItems.splice(index,1);
                        // that.showPop('删除成功！',false);
                    }else{
                        that.showPop('删除失败！',false);
                    }
                })
        },
        extendBook(index){
            let that = this;
            let id = this.showItems[index].borrowBookId;
            this.$http.post('/dj_library/user/continueBorrowBook?borrowBookId='+id)
                .then(res => {
                    console.log(res);
                    if(res.body.code == 200){
                        that.showItems[index].dateCount += that.showItems[index].dateCount; 
                        that.showItems[index].isborrowedout = 2;
                        that.showPop('续借成功！',false);
                    }else{
                        that.showPop(res.body.msg,false);
                    }
                })
        }
    },
    components:{
        Pop,
    },
    created(){
        this.power = this.powerState;
        console.log(1,this.showItems)
        // this.showItems = this.data.bookList;
    },
    mounted(){  
        // console.log(2,this.showItems)
    },
    
}
</script>
<style lang="less" scoped>
    #book-table {
        width: 100%;
        height: 575px;
        position: relative;
        // background-color: #213123;
        .table-header {
            height: 35px;
            min-width: 1100px;
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
                float: left;
                max-height: 860px;
                overflow: hidden;
                .row-item {
                    margin-top: 10px;
                    background-color: #fff;
                    height: 70px;
                    line-height: 70px;
                    font-size: 14px;
                    min-width: 1300px;
                    position: relative;
                    transition: .2s;
                    border: 3px solid transparent;
                    &:hover  {
                        cursor: pointer;
                        border: 3px solid lightskyblue;
                    }
                    .button-wrapper {
                        padding: 0 55px;
                        height: 70px;
                        float: left;
                    }
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
                        padding: 3px 6px;
                        color: #fff;
                        width: 32px;
                        height: 24px;
                        text-align: center;
                        line-height: 26px;
                        background-color: #00a1d6;
                        border-radius: 4px;
                        float: left;
                        position: relative;                 
                        top: 50%;
                        transform: translateY(-50%);
                        &:hover {
                            background-color: #00b5e5; 
                        }
                        // &.modify-button {
                        //     background-color: #7f7f7f;
                        //     &:hover {
                        //         background-color: #999;
                        //     }
                        // }
                        // &.can-borrow-button {
                        //     cursor: default;
                        //     background-color: #7f7f7f;
                        //     &:hover {
                        //         background-color: #7f7f7f;
                        //     }
                        // }
                        &.modify-button {
                            background-color: #2ecc71;
                            &:hover {
                                background-color: #58d68d;
                            }
                        }
                        &.return-button {
                            background-color: #2ecc71;
                            &:hover {
                                background-color: #58d68d;
                            }
                        }
                        &.desc-button {
                            cursor: default;
                            background-color: #7f7f7f;
                            &:hover {
                                background-color: #7f7f7f;
                            }
                            // &.admin {
                            //     background-color: #00a1d6;
                            //     &:hover {
                            //         background-color: #00a1d6;
                            //     }
                            // }
                        }
                        &.del-button {
                            background-color: #e74c3c;
                            &:hover {
                                background-color: #e77;
                            }
                        }
                        &.extend-button {
                            background-color: #e25d18;
                            &:hover {
                                background-color: #ff5700;
                            }
                        }
                    }
                    .del {
                        opacity: 0;
                        position: absolute;
                        transition: .2s;
                        font-weight: bold;
                        font-size: 22px;
                        right: -10px;
                        color: red;
                        cursor: pointer;
                    }
                    &:hover .del {
                        opacity: 1;
                        right: 30px;
                    }
                }
            }
            .footer {
                float: left;
                margin-right: 20px;
                font-size: 15px;
                width: 1300px;

                .pagination {
                    margin: 20px 15px;
                    float: right;
                    li {
                        display: inline-block;
                        vertical-align: middle;
                        word-spacing: normal;
                        & select {
                            vertical-align: baseline;
                            text-transform: none;
                            font-size: 14px;
                            padding-left: 5px;
                            line-height: 20px;
                            height: 20px;
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
                            color: deepskyblue;
                        }
                    }
                }
            }
        }
        .item-desc {
            position: fixed;
            left: 50%;
            top: 50%;
            transform: translateX(-50%)translateY(-50%);
            width: 700px;
            height: 300px;
            border-radius: 4px;
            background: #eee;
            box-shadow: #646987 2px 2px 7px 2px;
            z-index: 1060;
            padding: 40px;
            box-sizing: border-box;
            .desc-pic {
                float: left;
                border: 1px solid gray;
                width: 170px;
                height: 218px;
                img {
                    width: 100%;
                    height: 100%;
                }
            }
            .desc-text {
                float: left;
                margin-left: 100px;
                .p-common-item {
                    padding-top: 20px;
                    font-size: 18px;
                    font-weight: bold;
                    max-width: 300px;
                    height: 30px;
                    line-height: 30px;
                    &:nth-child(1){
                        padding-top: 0;
                    }
                    &.brief {
                        height: 60px;
                        overflow: hidden;
                        text-overflow: ellipsis;
                    }
                }
            }
            .close {
                position: absolute;
                right: 20px;
                top: 15px;
                font-weight: bold;
                font-style: italic;
                color: red;
                font-size: 24px;
                cursor: pointer;
            }
        }
        .mask {
            position: fixed;
            top: 0;
            right: 0;
            bottom: 0;
            left: 0;
            z-index: 1050;
            overflow: hidden;
            -webkit-overflow-scrolling: touch;
            outline: 0;
            // color: #4b4b4b;
            background: rgba(0,0,0,.493);
        }
        .table-common-item {
            float: left;
            padding: 0 30px;
            height: 55px;
        }
        .right-line {
            border-right: 1px solid #eee; 
        }
        .book-name {
            width: 245px;
            // height: 55px;
            // max-width: 300px;
        }
        .book-price,.book-can-day,.book-past-day,.book-surplus-day,.book-borrow,.book-author {
            width: 100px;
            // max-width: 100px;
            text-align: center;
            // height: 55px;
        }
        .book-publish {
            text-align: center;
            width: 140px;
            padding:0 50px;
        }
    }
    .fade-desc-enter-active, .fade-desc-leave-active,.fade-mask-enter-active, .fade-mask-leave-active {
        transition: opacity .3s;
    }
    .fade-desc-enter, .fade-desc-leave-to,.fade-mask-enter, .fade-mask-leave-to {
        opacity: 0;
    }
    // .fade-mask-enter-active, .fade-mask-leave-active {
    //     transition: opacity .5s;
    // }
    // .fade-mask-enter, .fade-mask-leave-to {
    //     opacity: 0;
    // }
</style>


