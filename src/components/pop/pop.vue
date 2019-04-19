<template>
    <div id="pop" class="fade" @click.self="send" >
        <div class="modal-dialog" >
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close"><span @click="send">×</span></button>
                    <h4 class="modal-title" id="gridSystemModalLabel">提示</h4>
                </div>
                <div class="modal-body">
                    <div class="container-fluid">
                        {{msg}}
                    </div>
                </div>
                <div class="modal-footer" >
                    <button type="button" class="btn btn-xs btn-white" :class="{'btn-danger':!buttonStatus}" @click="send">{{buttonBrief}}</button>
                    <button type="button" class="btn btn-xs btn-danger" @click="confirmStatus" v-if="buttonStatus">确 定</button>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name:'pop',
    data(){
        return {
            sure:false,
        }
    },
    props:{
        msg:String,
        status:{
            type:Boolean,
            default:false,
        },
        buttonStatus:{
            type:Boolean,
            default:false,
        },
    },
    watch:{
        status(val){
            let pop = document.getElementById('pop');
            if(val){
                pop.classList.add('block');
                setTimeout(()=> {
                    pop.classList.add('in');
                },14)
            }else{
                pop.classList.remove('in');
                setTimeout(()=>{
                    pop.classList.remove('block');
                },1000)
            }
        }
    },
    methods:{
        send(){
            this.$emit('pop-sure',this.sure);
        },
        confirmStatus(){
            this.sure = true;
            this.send();
        }
    },
    computed:{
        buttonBrief(){
            if(this.buttonStatus){
                return '取 消';
            }else{
                return '确 定';
            }
        }
    }
}
</script>
<style lang="less" scoped>
    *{
        box-sizing: border-box;
    }
    #pop {
        position: fixed;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        z-index: 1050;
        display: none;
        overflow: hidden;
        -webkit-overflow-scrolling: touch;
        outline: 0;
        color: #4b4b4b;
        .modal-dialog {
            position: relative;
            width: 400px;
            margin: 30px auto;
            .modal-content {
                position: relative;
                background-color: #fff;
                background-clip: padding-box;
                border: 1px solid rgba(0,0,0,.2);
                border-radius: 6px;
                outline: 0;
                box-shadow: 0 3px 9px rgba(0,0,0,.5);
                .modal-header {
                    min-height: 16.43px;
                    padding: 15px;
                    border-bottom: 1px solid #e5e5e5;
                    .close {
                        float: right;
                        font-size: 21px;
                        font-weight: 700;
                        line-height: 1;
                        color: #000;
                        text-shadow: 0 1px 0 #fff;
                        filter: alpha(opacity=20);
                        opacity: .2;
                        -webkit-appearance: none;
                        padding: 0;
                        cursor: pointer;
                        background: 0 0;
                        border: 0;
                        margin-top: -2px;
                        &:focus,&:hover {
                            color: #000;
                            text-decoration: none;
                            cursor: pointer;
                            filter: alpha(opacity=50);
                            opacity: .5;
                        }
                    }
                    .modal-title {
                        margin: 0;
                        line-height: 1.42857143;
                        font-size: 28px;
                        font-weight: bold;
                    }
                }
                .modal-body {
                    position: relative;
                    padding: 15px;
                    font-size: 14px;
                    line-height: 24px;
                }
                .modal-footer {
                    padding: 15px;
                    text-align: right;
                    border-top: 1px solid #e5e5e5;
                    .btn {
                        display: inline-block;
                        padding: 6px 9px;
                        font-size: 12px;
                        line-height: 1.083;
                        border-radius: 3px;
                        margin-bottom: 0;
                        font-weight: 400;
                        text-align: center;
                        white-space: nowrap;
                        vertical-align: middle;
                        touch-action: manipulation;
                        cursor: pointer;
                        user-select: none;
                        background-image: none;
                        border: 1px solid transparent;
                        transition: border .25s linear,color .25s linear,background-color .25s linear;
                        &.btn-white {
                            background: #fff;
                            border: 1px solid #ccc!important;
                            font-weight: normal!important;
                            margin-right: 10px;
                        }
                        &.btn-danger {
                            color: #fff;
                            background-color: #e74c3c;
                            margin-bottom: 0;
                            margin-left: 5px;
                            &:hover {
                                background-color: #ec7063;
                                border-color: #ec7063;
                            }
                        }
                    }
                }
            }
        }
        &.fade {
            opacity: 0;
            transition: opacity .25s linear;
            .modal-dialog {
                transform: translate(0,-25%);
                transition: transform .3s ease-out;
            }
            &.in {
                opacity: 1;
                .modal-dialog {
                    transform: translate(0,25%);
                }
            }
        }
        &.block {
            display: block;
            background: rgba(0,0,0,.493);
        }
    }
</style>


