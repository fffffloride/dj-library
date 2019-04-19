<template>
    <div id="library" v-if="showState">
        <div class="left-menu">
            <div class="logo-wrap">
                <p class="logo">
                    <img class="logo-img" src="../../assets/favicon.png" alt="">
                    <span>东经易网</span>
                </p>
            </div>
            <div class="user-infor">
                <div class="user-head-pic">
                    <img src="../../assets/head-pic.jpg" alt="">
                </div>
                <p class="username text-overflow">
                    {{userInfor.userName}}
                    <!-- <span class="power">{{powerState}}</span> -->
                </p>
                <p class="borrow-num" :class="{'admin':userInfor.power == 'true'}">{{powerState}}</p>
                <a class="exit" href="javascript:void(0)" @click="userLogOut">退出登录</a>
            </div>
            <div class="book-menu">
                <div class="menu-common-title">书籍信息</div>
                <div class="menu-common-item">
                    <router-link class="router" active-class="on" to="/library/memory"><img src="../../assets/library-icon/icon_renwujincheng.png" alt="1" class="icon">借书记录</router-link>
                </div>
                <div class="menu-common-item">
                    <router-link class="router" active-class="on" to="/library/hot"><img src="../../assets/library-icon/icon_bangzhuwendang.png" class="icon" />热门书籍</router-link>
                </div>
                <div class="menu-common-item">
                    <router-link class="router" active-class="on" to="/library/new"><img src="../../assets/library-icon/icon_shiyongwendang.png" class="icon">最新上架</router-link>
                </div>
                <div class="menu-common-item">
                    <router-link class="router" active-class="on" to="/library/all"><img src="../../assets/library-icon/liebiao.png" class="icon">全部书籍</router-link>
                </div>
                <!-- <div class="menu-common-item">
                    <router-link class="router" active-class="on" to="/library/bookreturn"><img class="icon">图书归还</router-link>
                </div> -->
                <div class="menu-common-item" v-if="userInfor.power == 'true'">
                    <router-link class="router" active-class="on" to="/library/bookgrounding"><img src="../../assets/library-icon/tianxie.png" class="icon">书籍上架</router-link>
                </div>
                <div class="menu-common-item" v-if="userInfor.power == 'true'">
                    <router-link class="router" active-class="on" to="/library/bookinfor"><img src="../../assets/library-icon/ceshishenqing.png" class="icon">书籍信息修改</router-link>
                </div>
            </div>
            <div class="account-menu">
                <div class="menu-common-title">
                    账户信息
                </div>
                <div class="menu-common-item" v-if="userInfor.power == 'false'">
                    <router-link class="router" active-class="on" to="/library/userinfor"><img src="../../assets/library-icon/zhanghaoquanxianguanli.png" class="icon">用户信息修改</router-link>
                </div>
                <div class="menu-common-item"  v-if="userInfor.power == 'true'">
                    <router-link class="router" active-class="on" to="/library/usermanage"><img src="../../assets/library-icon/quanxianshenpi.png" class="icon">用户管理</router-link>
                </div>
            </div>
        </div>
        <div class="right-content">
            <div class="headline">
                <h1 class="common-title">
                    图书借阅管理系统
                    <span class="sup">djcps</span>
                </h1>
            </div>
            <div class="view">
                <keep-alive include="book-grounding">
                    <router-view ref="view"></router-view>
                </keep-alive>
            </div>
        </div>
        <div class="rank-mask" @click="close"></div> 
    </div>
</template>
<script>
export default {
    data(){
        return {
            userInfor:{
                userName:'',
                userId:'',
                power:'true',
            },
            showItems:[],
            routerPath:'',
            showState:false,
        }
    },
    methods:{
        close(){
            let view = this.$refs.view;
            view.$refs.table.stateChange();
        },
        userLogOut(){
            if(this.userInfor.power == 'false'){
                this.$http.post('/dj_library/user/userLogOut');
            }else{
                this.$http.post('/dj_library/admin/adminLogOut');
            }
            // alert('退出成功')
            this.$router.push('/login');
        },
        userInforReload(){
            if(sessionStorage.getItem('user_name')){
                this.userInfor.userName = sessionStorage.getItem('user_name');
                this.userInfor.userId = sessionStorage.getItem('user_id');
                this.userInfor.power = sessionStorage.getItem('power');
                this.showState = true;
            }else{
                alert('请登录！');
                this.$router.push('/login');
            }
        },
        timeout(){
            let that = this;
            let lastTime = new Date().getTime();
            let currentTime = new Date().getTime();
            //设置超时时间： 20分
            let timeOut = 20*60*1000; 

            window.onload = function() {
                /* 检测鼠标移动事件 */
                document.addEventListener('mousemove', function() {
                    // 更新最后的操作时间
                    lastTime = new Date().getTime();
                    // console.log(lastTime);
                })
            }

            /* 定时器  间隔1分钟，检测是否长时间未操作页面  */
            let quitTime = window.setInterval(testTime, 60000);

            // 超时函数
            function testTime() {
                //更新当前时间
                currentTime = new Date().getTime();
                console.log(currentTime,lastTime);
                //判断是否超时
                if (currentTime - lastTime > timeOut) {
                    //将退出登陆请求发送给后端
                    that.userLogOut();
                    alert('页面停留时间过长,请重新登陆！');
                    // that.$router.push('/login');
                    // 清除掉定时器
                    window.clearInterval(quitTime)
                }
            }
        }
    },
    computed:{
        powerState(){
            if(this.userInfor.power == 'true'){
                return '管理员';
            }else{
                return '普通用户';
            }
        }
    },
    created(){
        this.showItems = this.allBookItems;
        this.userInforReload();
    },
    mounted(){
        this.timeout();
    }
}
</script>
<style lang="less" scoped>
    * {
        box-sizing: border-box;
    }
    #library {
        min-width: 100%;
        position: relative;
        background: #eff3f6 bottom;
        min-height: 100%;
        // overflow: hidden;
        .left-menu {
            position: fixed;
            box-sizing: border-box;
            width: 200px;
            height: 100%;
            z-index: 999;
            background: #4d5e70 bottom;
            .logo-wrap {
                padding: 20px 0 20px 35px;
                height: 70px;
                background-color: #354457;
                font-size: 17px;
                color: #fff;
                vertical-align: bottom;
                .logo {
                    margin:  0 0 15px;
                    height: 31px;
                    .logo-img {
                        vertical-align: middle;
                        width: 35px;
                        height: 30px;
                        margin-bottom: -4px;
                        display: inline-block;
                    }
                }
                span {
                    vertical-align: bottom;
                }
            }
            .user-infor {
                padding: 10px 5px 10px;
                margin: 0 5px;
                color: #b3bcc5;
                border-bottom: 1px solid #354457;
                overflow-x: hidden;
                padding-left: 20px;
                position: relative;
                .user-head-pic {
                    position: absolute;
                    width: 80px;
                    height: 80px;
                    border-radius: 50%;
                    overflow: hidden;
                    right: 10px;
                    top: 10px;
                    img {
                        width: 100%;
                        height: 100%;
                    }
                }
                .username {
                    font-size: 15px;
                    height: 30px;
                    line-height: 30px;
                    width: 80px;
                    color: #fff;
                    .power {
                        display: inline-block;
                        margin-left: 30px;
                        font-size: 12px;
                    }
                }
                .exit {
                    margin: 12px 0;
                    display: block;
                    color: #717592;
                    width: 65px;
                    height: 25px;
                    line-height: 25px;
                    text-align: center;
                    // border: 1px solid #eff3f6;
                    background-color: #eee; 
                    border-radius: 4px;
                }
                .borrow-num {

                    &.admin {
                        color: orangered;
                    }
                }
            }
           }
        .right-content {
            // position: absolute; 
            z-index: 999;
            float: left;
            padding-left: 200px;
            overflow-y: overlay;
            overflow-x: hidden;
            background-color: #eff3f6;
            // background: url(../../assets/1.jpg);
            clear: both;
            color: #717592;
            min-width: 100%;
            min-height: 500px;
            .headline {
                height: 70px;
                line-height: 70px;
                *line-height: 60px;
                background-color: #fff;
                // padding-left: 30px;
                min-width: 824px !important;
                .common-title {
                    color: #354457;
                    padding: 0;
                    width: 315px;
                    margin: 0 auto;
                    span {
                        top: -10px;
                        margin-left: -20px;
                    }
                }
            }
            .view {
                height: 690px;
                position: relative;
            }
        }
        .rank-mask {
            position: absolute;
            display: none;
            transition: all 0.3s linear 0s;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.493);
            z-index: 999;
            top: 0;
            left: 0;        
        }
        .menu-common-title {
            box-sizing: border-box;
            height: 44px;
            line-height: 24px;
            color: #828e9a;
            font-size: 14px;
            font-weight: bold;
            padding: 10px 0 10px 20px;
        }
        .menu-common-item {
            
            line-height: 40px;
            height: 40px;          
            a {
                padding-left: 20px;
                display: block;
                height: 100%;
                color: #aab1b7;
                font-weight: normal;
                font-size: 14px;
                .icon {
                    display: inline-block;
                    margin-right: 8px;
                    vertical-align: middle;
                }
                &.on {
                    background-color: #3d4e60;
                    border-right: 4px solid #647f9d;
                    color: #fff;
                }
            }
        }
    }  
</style>


