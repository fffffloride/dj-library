<template>
    <div class="index">
        <div class="main vertical-middle">
            <h1 class="common-title">
                图书借阅管理系统
                <span class="sup">djcps</span>
            </h1>
            <div class="user-login">
                <form action="" class="form">
                    <div class="head-tab">
                        <a href="javascript:void(0)" class="tab login" @click="tab=true" :class="{'on':tab}">用户登录</a>
                        <a href="javascript:void(0)" class="tab register" @click="tab=false" :class="{'on':!tab}">用户注册</a>
                        <div class="bottom-bar" :class="{'active':!tab}"></div>
                    </div>
                    <div class="web-login" v-show="tab">
                        <div class="login-box"  @keyup.enter="submit">
                            <div class="login-input">
                                <label for="account">账号：</label><input type="text" id="account" v-focus v-model.trim="userLoginData.account" >
                            </div>
                            <div class="login-input">
                                <label for="password">密码：</label><input type="password" id="password" v-model.trim="userLoginData.password" >
                            </div>
                        </div>
                        <a class="submit" @click="submit">登录</a>
                    </div>
                    <div class="web-login" v-show="!tab">
                        <div class="login-box register-box" @keyup.enter="register">
                            <div class="login-input regst-div">
                                <label for="phone-num">手机号：</label><input type="text" id="phone-num" v-model.trim="userRegisterData.phoneNum" @keyup="phoneIsExist">
                            </div>
                            <div class="login-input regst-div">
                                <label for="username">姓名：</label><input type="text" id="username" v-model.trim="userRegisterData.username" >
                            </div>
                            <div class="login-input regst-div">
                                <label for="rgt-password">密码：</label><input type="password" id="rgt-password" v-model.trim="userRegisterData.password">
                            </div>
                            <div class="login-input regst-div">
                                <label for="re-password">确认密码：</label><input type="password" id="re-password" v-model.trim="userRegisterData.rePassword">
                            </div>
                        </div>
                        <a class="submit re-submit" @click="register">注册</a>
                    </div>       
                </form>
            </div>
        </div>
        <Pop :status='showPopStatus' :msg='popMsg' @pop-sure='getPopMsg' :buttonStatus='buttonStatus' />
    </div>
</template>
<script>
import Pop from '../pop/pop'
export default {
    name:'index',
    data(){
        return {
            // 登录注册切换
            tab:true,
            // 登录输入数据
            userLoginData:{
                account:'',
                password:'',
            },
            // 注册输入数据
            userRegisterData:{
                username:'',
                phoneNum:'',
                password:'',
                rePassword:'',
            },
            // 登录验证时后端返回的数据
            userData:{},
            //  注册验证时后端返回的数据
            registerState:'',
            inputJudge:{
                loginAccountActive:false,
                loginPasswordActive:false,
                regtPhoneActive:false,
                regtNameActive:false,
                regtPasswordActive:false,
                regtRePasswordActive:false,
            },
            showPopStatus:false,
            buttonStatus:false,
            popMsg:'',
            popSend:'',
        }
    },
    components:{
        Pop,
    },
    methods:{
        getPopMsg(popSend){
            this.popSend = popSend;
            this.showPopStatus = false;
        },
        showPop(msg){
            this.showPopStatus = true;
            this.popMsg = msg;
        },
        register(){
            if(!this.userRegisterData.phoneNum){
                // alert('手机号不能为空！')
                this.showPop('手机号不能为空！')
                // this.inputJudge.regtPhoneActive = true;
                return false;
            }
            if(!(/^1[34578]\d{9}$/).test(this.userRegisterData.phoneNum)){
                // alert('请输入正确的手机号！')
                this.showPop('请输入正确的手机号！')
                // this.inputJudge.regtPhoneActive = true;
                return false;
            }
            if(!this.userRegisterData.username){
                // alert('姓名不能为空！')
                this.showPop('姓名不能为空！')
                // this.inputJudge.regtNameActive = true;
                return false;
            }
            // 姓名长度判断
            let name = this.userRegisterData.username;
            if(name.length > 10 || name.length < 2){
                // alert('姓名长度请设置在2到10位之间！')
                this.showPop('姓名长度请设置在2到10位之间！')
                return false;
            }

            if(!this.userRegisterData.password){
                this.showPop('密码不能为空！')
                // alert('密码不能为空！')
                // this.inputJudge.regtPasswordActive = true;
                return false;
            }
            if(this.userRegisterData.password.length < 6 ||  this.userRegisterData.password.length > 10){
                // alert('密码请设置在6-10位之间')
                this.showPop('密码请设置在6-10位之间')
                // this.inputJudge.regtPasswordActive = true;
                return false;
            }
            if(this.userRegisterData.password){
                let r=/^[a-zA-Z0-9]+$/g;
                if(!r.test(this.userRegisterData.password)){
                    // alert('请输入数字或字母！');
                    this.showPop('密码请输入数字或字母！')
                    return false;
                }
            }
            if(this.userRegisterData.password !== this.userRegisterData.rePassword){
                // alert('重输密码不匹配！')
                this.showPop('重输密码不匹配！')
                // this.inputJudge.regtRePasswordActive = true;
                return false;
            }   
            // 向后端传递注册数据
            let that = this;
            this.$http.post('/dj_library/user/userRegister'+'?phone='+this.userRegisterData.phoneNum+'&password='+this.userRegisterData.password+'&userName='+this.userRegisterData.username)
                .then(function(data){
                    console.log(data);
                    if(data.body.code == 200){
                        this.tab = true;
                        // alert('恭喜您注册成功！');
                        that.showPop('恭喜您注册成功！')
                        // 注册内容清空
                        this.userRegisterData = {
                            username:'',
                            phoneNum:'',
                            password:'',
                            rePassword:'',
                        }
                    }else{
                        // alert('注册失败！');
                        that.showPop('注册失败！')
                    }
                }),function(error){
                    console.log(error)
                }
        },
        submit(){
            if(!this.userLoginData.account){
                // alert('账号不能为空！')
                this.showPop('账号不能为空！')
                // this.inputJudge.loginAccountActive = true;
                return false;
            }
            if(!(/^1[34578]\d{9}$/).test(this.userLoginData.account)){
                // alert('请输入正确的手机号！')
                this.showPop('请输入正确的手机号！')
                // this.inputJudge.loginAccountActive = true;
                return false;
            }
            if(!this.userLoginData.password){
                // alert('密码不能为空！')
                this.showPop('密码不能为空！')
                // this.inputJudge.loginPasswordActive = true;
                return false;
            }  
            if(this.userLoginData.password.length < 6 ||  this.userLoginData.password.length > 10){
                // alert('密码请输入在6-10位之间')
                this.showPop('密码请输入在6-10位之间')
                // this.inputJudge.regtPasswordActive = true;
                return false;
            }
            // 向后端传递登录数据
            let that = this;
            this.$http.post('/dj_library/login'+'?phone='+this.userLoginData.account+'&password='+this.userLoginData.password)
                .then(function(res){
                    console.log(res);
                    let resData = res.body.data;
                    if(res.body.code == '200'){
                        // console.log(1);
                        if(resData.adminName){
                            sessionStorage.setItem('user_name',resData.adminName);
                            sessionStorage.setItem('user_id',resData.adminId);
                            sessionStorage.setItem('power',true);
                            sessionStorage.setItem('user_phone',resData.adminPhone);
                            sessionStorage.setItem('user_pwd',resData.adminPwd);
                        }else{
                            sessionStorage.setItem('user_name',resData.userName);
                            sessionStorage.setItem('user_id',resData.userId);
                            sessionStorage.setItem('power',false);
                            sessionStorage.setItem('user_phone',resData.userPhone);
                            sessionStorage.setItem('user_pwd',resData.userPwd);
                            sessionStorage.setItem('user_allowed',resData.isAllowBorrow);
                            console.log(sessionStorage);
                        }
                        that.$router.push('/library');
                    }else{
                        alert(res.body.msg);
                        console.log('false');
                    }
                },function(error){
                    console.log(error)
                }
            )  
        },
        phoneIsExist(){
            let that = this;
            if(this.userRegisterData.phoneNum.length == 11){
                this.$http.post('dj_library/user/isUserExist?phone='+this.userRegisterData.phoneNum)
                    .then(res => {
                        console.log(res);
                        if(res.body.code == 200){
                            that.showPop('该手机号已注册！')
                        }else{
                            console.log(true);
                        }
                    })
            }
        }
    },
    mounted(){
    },
}
</script>
<style lang="less" scoped>
    .index {
        width: 100%;
        height: 100%;
        overflow: hidden;
        background: url(../../assets/login1.jpg) 50% 0 repeat;
        .main {
            width: 370px;
            margin: 0 auto;
            .user-login {
                // height: 300px;
                border-radius: 10px;
                margin-top: 50px;
                background-color: #fff;
                box-shadow: 1px 1px 2px 0 rgba(0, 0, 0, .3);
                transition: .3s;
                .form {
                    .head-tab {
                        width: 218px;
                        margin: 0 auto;
                        padding-top: 6px;
                        position: relative;
                        font-size: 14px;
                        .tab {
                            color: #999;
                            display: inline-block;
                            height: 45px;
                            line-height: 45px;
                            transition: .2s;
                            font-size: 16px;
                            &:hover,&.on {
                                color: #000;
                                transition: .2s;
                            }
                        }
                        .login {
                            margin-right: 85px;
                        }
                        .bottom-bar {
                            position: absolute;
                            bottom: -1px;
                            border-bottom: 2px solid #000;
                            left: 0px;
                            width: 0;
                            height: 0;
                            transition: all .5s ease 0s;
                            &.active {
                                left: 150px;
                                height: 2px;
                                width: 70px;
                                transition: all .5s ease 0s;
                            }
                        }
                    }
                    .web-login {
                        overflow: hidden;
                        border-top: 1px solid #e2e2e2;
                        .login-box {
                            width: 272px;
                            margin: 30px auto 0;
                            overflow: hidden;
                            .login-input {
                                height: 46px;
                                line-height: 46px;
                                font-size: 16px;
                                float: right;
                                border-radius: 4px;
                                padding-left: 10px;
                                width: 100%;
                                box-sizing: border-box;
                                margin-top: 10px;
                                background-color: #E4EAF3;
                                &.regst-div:nth-child(1){
                                    padding-left: 25px;
                                }
                                &.regst-div:nth-child(2){
                                    padding-left: 42px;
                                }
                                &.regst-div:nth-child(3){
                                    padding-left: 42px;
                                }
                                input {
                                    width: 180px;
                                    height: 32px;
                                    padding-left: 10px;
                                    border-radius: 2px;
                                    line-height: 32px;
                                    font-size: 16px;
                                    border: none;
                                    outline: none;
                                    background-color: #E4EAF3;
                                 }
                            }
                        }
                        .register-box {
                            width: 282px;
                            margin: 30px auto 0;
                        }
                        .submit {
                            display: block;
                            margin: 30px auto 0;
                            height: 34px;
                            border-radius: 4px;
                            background: #1886e3;
                            border: none;
                            width: 252px;
                            border-bottom: 3px solid #0078b3;
                            *border-bottom: none;
                            color: #fff;
                            font-size: 16px;
                            padding: 0 10px;
                            text-align: center;
                            line-height: 41px;
                            cursor: pointer;
                            transition: .2s;
                            margin-bottom: 24px;
                            &.re-submit {
                                width: 262px;
                            }
                            &:hover {
                                background: #0078b3;
                            }
                            
                        }
                    }
                    
                }
            }
            input.active {
                border: 1px solid red!important;
            }
        }
    }
</style>
