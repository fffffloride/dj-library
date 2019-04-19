<template>
    <div class="toggle-button-wrapper">
        <div id="toggle-button" @click.stop.prevent="toggleClick()" name="switch" ></div>
        <label for="toggle-button" class="button-label" :class="{'active':toggleState == 1}">
            <span class="circle" :class="{'active':toggleState == 1}"></span>
            <span class="text on" :class="{'active':toggleState == 1}">ON</span>
            <span class="text off" :class="{'active':toggleState == 1}">OFF</span>
        </label>
        <transition name='fade'>
            <span v-show="saveState" class="save" @click="submit">确认修改</span>
        </transition>
    </div>
</template>
<script>
export default {
    data(){
        return {
            toggleState:'',
            startToggleState:'',
            saveState:false,
        }
    },
    props:{
        state:{
            type:Number,
        },
        userId:{
            type:Number,
        }
    },
    methods:{
        toggleClick(){
            if(this.toggleState == 1){
                this.toggleState = 0;
            }else{
                this.toggleState = 1;
            }
            // this.toggleState = -this.toggleState;
            if(this.toggleState !== this.startToggleState){
                this.saveState = true;
            }else{
                this.saveState = false;
            }
        },
        submit(){
            let that = this;
            this.$http.post('/dj_library/admin/isAllowBorrow?userId='+this.userId+'&power='+this.toggleState)
                .then(function(res){
                    console.log(res);
                    if(res.body.code == 200){
                        that.startToggleState = that.toggleState;
                        that.saveState = false;
                        alert('修改成功！')
                    }else{
                        alert('修改失败'+res.body.msg);
                    }
                })
        },
    },
    created(){
        this.toggleState = this.startToggleState = this.state;
    }
}
</script>
<style lang="less" scoped>
    // 权限按钮
    .toggle-button-wrapper {
        position: relative;
        padding-left: 10px;
        padding-top: 10px;
        height: 40px;
    }
    #toggle-button{ 
        position: absolute;
        width: 87px;
        left: 6px;
        top: 15px;
        height: 38px;
        background: transparent;
        cursor: pointer;
        z-index: 2;
     }
    .button-label{
        position: relative;
        display: inline-block;
        width: 80px;
        height: 30px;
        background-color: #ccc;
        box-shadow: #ccc 0px 0px 0px 2px;
        border-radius: 30px;
        overflow: hidden;
    }
    .circle{
        position: absolute;
        top: 0;
        left: 0;
        width: 30px;
        height: 30px;
        border-radius: 50%;
        background-color: #fff;
    }
    .button-label .text {
        line-height: 30px;
        font-size: 18px;
        text-shadow: 0 0 2px #ddd;
    }
    .on {
      color: #fff;
      display: none;
      text-indent: 10px;
      vertical-align: top;
      margin-top: 2px;
      text-indent: 10px;
    }

    .off {
      color: #fff;
      display: inline-block;
      text-indent: 34px;
      vertical-align: top;
      margin-top: 2px;
    }

    .button-label .circle {
      left: 0;
      transition: all 0.3s;
    }

    .circle.active {
      left: 50px;
    }

    .on.active {
      display: inline-block;
    }

    .off.active {
      display: none;
    }

    .button-label.active {
      background-color: #51ccee;
    }
    .save {
        vertical-align: top;
        margin: 5px 0 0 20px;
        display: inline-block;
        width: 70px;
        height: 40px;
        text-align: center;
        line-height: 40px;
        color: #fff;
        background-color: #e74c3c;
        border-radius: 8px;
        transition: all .2s;
        cursor: pointer;
        &:hover {
            background-color: #e77;
            transition: all .2s;
        }
    }
    .fade-enter-active, .fade-leave-active {
            transition: all .4s;
        }
    .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
        transform: translateX(30px);
        opacity: 0;
    }
</style>

