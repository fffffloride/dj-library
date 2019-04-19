<template>
    <div id="user-infor-modif">
        <form id="userInforForm" enctype="multipart/form-data" method="post" action="" @keyup.enter="save">
            <div class="user-phone div-common-margin">
                手机号：<span class="phone-span">{{userInfor.userPhone}}</span>
                <!-- <span class="phone-span">{{userInfor.userPhone}}</span> -->
            </div>
            <div class="user-name div-common-margin">
                <label for="name-input">姓名：</label><input name="userName" type="text" id="name-input" v-model="userInfor.userName">
            </div>
            <div class="user-oldpwd div-common-margin">
                <label for="oldpwd-input">旧密码：</label><input name="userOldPwd" type="password" id="oldpwd-input" v-model="userInfor.userInputPassword" v-focus>
            </div>
            <div class="user-newpwd div-common-margin">
                <label for="newpwd-input">新密码：</label><input name="userNewPwd" type="password" id="newpwd-input" v-model="userInfor.userNewPassword">
            </div>
            <div class="user-re-newpwd div-common-margin">
                <label for="re-newpwd-input">确认密码：</label><input type="password" id="re-newpwd-input" v-model="userInfor.userReNewPassword">
            </div>
            <div class="save" @click="save">保存</div>
        </form>
    </div>
</template>
<script>
export default {
    data(){
        return {
            userInfor:{
                userName:'',
                userPhone:'',
                userId:'',
                userPassword:'',
                userInputPassword:'',
                userNewPassword:'',
                userReNewPassword:'',
            },
        }
    },
    methods:{
        save(){
            if(!this.userInfor.userName){
                alert('姓名不能为空！');
                return false;
            }
            if(!this.userInfor.userInputPassword || !this.userInfor.userNewPassword || !this.userInfor.userReNewPassword){
                alert('密码不能为空！');
                return false;
            }
            if(this.userInfor.userNewPassword !== this.userInfor.userReNewPassword){
                alert('两次密码输入不一样！');
                return false;
            }

            let that = this;
            this.$http.post('/dj_library/user/isRightPassword/?phone='+this.userInfor.userPhone+'&oldPassword='+this.userInfor.userInputPassword)
                .then(res => {
                    console.log(res);
                    if(res.body.code !== 200){
                        alert('旧密码输入错误！');
                        return false;
                    }else{
                        // 上传表单
                        this.$http.post('dj_library/user/updateUserByphone?userName='+that.userInfor.userName+'&phone='+that.userInfor.userPhone+'&newPassword='+that.userInfor.userNewPassword)
                            .then(res => {
                                console.log(res);
                                if(res.body.code == 200){
                                    sessionStorage.setItem('user_name',that.userInfor.userName);
                                    sessionStorage.setItem('user_password',that.userInfor.userNewPassword);
                                    // that.$parent.userInforReload();
                                    console.log(that.$parent.userInfor)
                                    that.$parent.userInfor.userName = that.userInfor.userName;
                                    that.$router.push('/library');
                                    alert('修改成功！');
                                }else{
                                    alert('修改失败！');
                                }
                            })
                        // 清空列表
                        for(let item in this.userInfor){
                            this.userInfor.item = '';
                        } 
                    }
                })
        },
    },
    mounted(){
       if(sessionStorage.getItem('user_name')){
            this.userInfor.userName = sessionStorage.getItem('user_name');
            this.userInfor.userId = sessionStorage.getItem('user_id');
            this.userInfor.userPhone = sessionStorage.getItem('user_phone');
            this.userInfor.userPassword = sessionStorage.getItem('user_pwd');
        }else{
            alert('请登录！')
        }
    }
}
</script>
<style lang="less" scoped>
    #user-infor-modif {
        padding: 80px 300px;
        font-size: 20px;
        #userInforForm {
            width: 425px;
            margin: 0 auto;
        }
        .user-phone {
            .phone-span {
                display: inline-block;
                margin-left: 80px;
            }
        }
        .user-name {
            input {
                margin-left: 60px;
            }
        }
        .user-re-newpwd {
            input {
                margin-left: 20px;
            }
        }
        .save {
            margin: 60px auto 0;
            width: 80px;
            height: 36px;
            line-height: 36px;
            text-align: center;
            background-color: #354457;
            color: #eee;
            border-radius: 8px;
            cursor: pointer;
        }
        input {
            line-height: 30px;
            padding-left: 10px;
            font-size: 16px;
            width: 230px;
            outline: none;
            margin-left: 40px;
        }
        .div-common-margin {
            padding: 20px;
            box-sizing: border-box;
        }
    }
</style>





