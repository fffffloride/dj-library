<template>
    <div class="row-item"  v-for="(item,key) in showItems" :key="key">
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
        <!-- <div class="table-common-item book-borrow" 
                v-if="!config.memoryState">
                {{isBorrowed(item.isborrowedout)}}
        </div> -->
        <div class="button-wrapper">
            <div class="borrow-button action-button"
                @click="borrowBook(key)"
                v-if="config.borrowState && !power && (item.isborrowedout == 0)">
                借书
            </div>
            <div class="modify-button action-button"
                @click="modifyBook(key)"
                v-if="config.modifyState &&　(item.isborrowedout == 0)">
                修改
            </div>

            <div class="return-button action-button"
                @click="returnBook(key)"
                v-if="config.returnState && !power && (item.isborrowedout == 1)">
                还书
            </div>
            <div class="desc-button action-button"
                @click="showItemDesc(key)"
                v-if="(power && (item.isborrowedout == 1)) || (!power && !config.memoryState && (item.isborrowedout == 1))">
                详细
            </div>
            <div class="can-borrow-button action-button"
                v-if="power && (item.isborrowedout == 0) && !config.modifyState">
                可借
            </div>
            <!-- <div class="del-button action-button"
                @click="delBook(key)"
                v-if="config.modifyState  &&　(item.isborrowedout == 0)">
                删除
            </div> -->
            <span class="del"  
                @click="delBook(key)"
                v-if="config.modifyState  &&　(item.isborrowedout == 0)">
                X
            </span>
            <div class="extend-button action-button"
                @click="extendBook(key)"
                v-if="!power && config.memoryState && (item.isborrowedout == 1)">
                续借
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name:'row-item',
    data(){
        return {

        }
    },
    props:{
        item:Object,
        power:Boolean,
        config:Object,
    }
}
</script>
