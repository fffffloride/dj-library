<template>
    <div class="book-grounding">
        <form id="bookInforForm" enctype="multipart/form-data" method="post" action="/dj_library/admin/addBook" @keyup.enter="submit" v-if="false">
            <div class="book-name div-common-margin">
                <label for="name-input">书名：</label><input name="bookName" type="text" id="name-input" class="input-common-style" v-model="bookName" v-focus>
            </div>
            <div class="book-price div-common-margin">
                <label for="price-input">价格：</label>
                <input type="text" name="price" id="price-input" v-model="bookPrice" class="input-common-style"> 元

                <label class="r-lable" for="author-input">作者：</label>
                <input type="text" name="bookAuthor" id="author-input" class="input-common-style" v-model="bookAuthor"> 
            </div>
            <div class="book-day div-common-margin">
                <label for="day-input">可借期限：</label>
                <input type="text" name="datecount" id="day-input" v-model="bookCanDay" class="input-common-style"> 天

                <label class="r-lable" for="category-select">书籍类别：</label>
                <!-- <input type="text" name="bookCategory" id="category-select" class="input-common-style" v-model="bookCatelogy">  -->
                <select name="bookCategory" id="category-select"  v-model="bookCategory">
                    <option v-for="(item,key) in bookCategoryItems" :key="key" :value="item.bookCategoryId" >
                        {{item.bookCategoryName}}
                    </option>
                </select>
                
                <label class="r-lable" for="publish-input">出版社：</label>
                <input type="text" name="bookPublish" id="publish-input" class="input-common-style" v-model="bookPublish"> 
            </div>
            <div class="book-description div-common-margin">
                <span>书籍简介：</span>
                <textarea name="desc" cols="80" rows="10" v-model="bookDescription"></textarea>
                <!-- <input type="text" id="decr-input" v-model="bookDescription" class="input-common-style" >  -->
            </div>
            <div class="book-pic div-common-margin">
                <span>书籍封面</span>
                <div class="pic-box">
                    <img id="pic" :src="bookPic" alt="">
                </div>
                <!-- <form id="uploadForm" enctype="multipart/form-data" method="post" action="XXXXXX"> -->
                <div id="uploadForm">
                    <input type="file" name="file" id="imageFile" onchange="fileSelected()" />
                </div>
                    
                <!-- </form> -->
            </div>
            <div class="save" id="bkgrd-submit" @click="clear">清空</div>
            <div class="save" id="bkgrd-submit" @click="submit">保存</div>
            
        </form>

        <form role="form" id="bookInforForm" enctype="multipart/form-data" method="post" action="/dj_library/admin/addBook" @keyup.enter="submit" class="registration-form">
            <p class="error">
                {{error}}
                <i class="clear" @click="clear" title="清空"></i>
            </p>
            <div class="form-group">
                <label class="sr-only" for="name-input">First name</label>
                <input type="text" name="bookName" placeholder="书 名" class="form-control" :class="{'error':(bookName.status == 0)}" @blur="textControl(bookName,2,10,'书名')" id="name-input" v-focus v-model="bookName.val">
            </div>
            <div class="form-group">
                <label class="sr-only" for="price-input">Last name</label>
                <input type="text" name="price" placeholder="价 格（元）" class="form-control" :class="{'error':(bookPrice.status == 0)}" @blur="textControl(bookPrice,2,10,'价格')" id="price-input" v-model="bookPrice.val">
            </div>
            <div class="form-group">
                <label class="sr-only" for="author-input">Email</label>
                <input type="text" name="bookAuthor" placeholder="作 者" class="form-control" :class="{'error':(bookAuthor.status == 0)}" @blur="textControl(bookAuthor,2,10,'作者')" id="author-input" v-model="bookAuthor.val">
            </div>
            <div class="form-group">
                <label class="sr-only" for="day-input">Email</label>
                <input type="text" name="datecount" placeholder="可借期限（天）" class="form-control" :class="{'error':(bookCanDay.status == 0)}" @blur="textControl(bookCanDay,2,10,'可借日期')" id="day-input" v-model="bookCanDay.val">
            </div>
            <div class="form-group">
                <label class="sr-only" for="publish-input">Email</label>
                <input type="text" name="bookPublish" placeholder="出版社" class="form-control" :class="{'error':(bookPublish.status == 0)}" @blur="textControl(bookPublish,2,20,'出版社')" id="publish-input" v-model="bookPublish.val">
            </div>
            <div class="form-group">
                <label class="sr-only" for="code-input">Email</label>
                <input type="text" name="barCode" placeholder="条形码(13位数字)" class="form-control" :class="{'error':(bookCode.status == 0)}" @blur="textControl(bookCode,13,13,'条形码')" id="code-input" v-model="bookCode.val">
            </div>
            <div class="form-group">
                <label class="sr-only" for="desc-input">书籍简介</label>
                <textarea name="desc" placeholder="书籍简介" class="desc-input form-control text-overflow" :class="{'error':(bookDescription.status == 0)}" @blur="textControl(bookDescription,0,50,'书籍简介')" id="desc-input" v-model="bookDescription.val"></textarea>
            </div>
            <div class="category-select">
                    <label class="r-lable" for="category-select">书籍类别：</label>
                    <select name="bookCategory" id="category-select"  v-model="bookCategory">
                        <option v-for="(item,key) in bookCategoryItems" :key="key" :value="item.bookCategoryId" >
                            {{item.bookCategoryName}}
                        </option>
                    </select>
                </div>
            <div class="bottom-form clearfix">
                <div class="book-pic div-common-margin">
                    <span>书籍封面：</span>
                    <div class="pic-box">
                        <img class="pic-img" :src="bookPic" alt="">
                    </div>
                    <!-- <form id="uploadForm" enctype="multipart/form-data" method="post" action="XXXXXX"> -->
                    <div id="uploadForm">
                        <input type="file" name="file" id="imageFile" onchange="fileSelected()" />
                    </div>
                    <!-- </form> -->
                </div>
                
            </div>
            <div class="save" id="ground-submit" @click="submit">保存</div>
        </form>
        <Pop :status='showPopStatus' :msg='popMsg' @pop-sure='getPopMsg' :buttonStatus='buttonPopStatus' />
    </div>
</template>
<script>
import VueEvent from '../../model/vueEvent'
import Pop from '../../pop/pop'
export default {
    name:'book-grounding',
    data(){
        return {
            bookPrice:{val:'',status:1},
            bookCanDay:{val:'',status:1},
            bookName:{val:'',status:1},
            bookDescription:{val:'',status:1},
            bookAuthor:{val:'',status:1},
            bookPublish:{val:'',status:1},
            bookCode:{val:'',status:1},
            bookCategory:1,
            bookCategoryItems:'',
            bookPic:'',
            error:'',
            showPopStatus:false,
            popMsg:'',
            buttonPopStatus:false,
            popSend:'',
        }
    },
    components:{
        Pop,
    },
    methods:{
        submit(){
            let bookInforForm = document.getElementById('bookInforForm');
            if(this.bookName.status !== 2 || this.bookPrice.status !== 2 || this.bookAuthor.status !== 2 || this.bookCanDay.status !== 2 || this.bookPublish.status !== 2 || this.bookDescription.status !== 2 || this.bookCode.status !== 2){
                // alert('请检查录入信息是否错误！');
                this.showPop('请检查录入信息是否错误！');
                return false;
            }
            if(!this.bookPic){
                this.showPop('图片不能为空！');
                // alert('图片不能为空！');
                return false;
            }
            
            let that = this;
            $("#bookInforForm").ajaxSubmit(function (res) {
                console.log(res);
                if(res.code == 200){
                    that.showPop('上架成功！')
                    that.clear();
                    that.$router.push('/library/new');
                }else{
                    that.showPop('上架失败！')
                    // alert('上架失败！');
                }
            });
        },
        textControl(item,minLen,maxLen,itemName){
            this.error = '';
            if(!item.val){
                this.error = itemName+'不能为空！';
                item.status = 0;
                return false;
            }
            if(item === this.bookPrice || item === this.bookCanDay || item === this.bookCode){
                if(isNaN(item.val)){
                    item.status = 0;
                    this.error = itemName+'内请输入数字';
                    return false;
                }
            }
            if(item === this.bookCode){
                if(item.val.length !== 13){
                    item.status = 0;
                    this.error = itemName+'内请输入13位数字';
                    return false;
                }
            }
            if(item.val.length > maxLen || item.val.length < minLen){
                this.error = itemName+'字段长度请设置在'+minLen+'到'+maxLen+'之间！';
                item.status = 0;
                return false;
            }
            item.status = 2;
            return true;
        },
        getModifyInfor(){
            let that = this;
            VueEvent.$on('modify-book',data => {
                that.bookAuthor = {val:data.bookAuthor,status:2};
                that.bookCategory = data.bookCategory;
                that.bookPrice = {val:data.bookPrice,status:2};
                that.bookPublish = {val:data.bookPublish,status:2};
                that.bookDescription = {val:data.bookIntroduction,status:2};
                that.bookCanDay = {val:data.dateCount,status:2};
                that.bookName = {val:data.bookName,status:2};
                that.bookCode = {val:data.barCode,status:2};
                that.bookPic = data.bookImage;
                this.error = '';
                window.scrollY = 0;
            })
        },
        clear(){
            this.bookPrice = {val:'',status:1};
            this.bookCanDay = {val:'',status:1};
            this.bookName = {val:'',status:1};
            this.bookDescription = {val:'',status:1};
            this.bookAuthor = {val:'',status:1};
            this.bookPublish = {val:'',status:1};
            this.bookCode = {val:'',status:1};
            this.bookCategory = 1,
            this.bookPic = '';
            this.error = '';
        },
        getPopMsg(popSend){
            this.popSend = popSend;
            this.showPopStatus = false;
        },
        showPop(msg){
            this.showPopStatus = true;
            this.popMsg = msg;
        },
    },
    created(){
        let that = this;
        VueEvent.$on('modify-book',data => {
            that.bookAuthor = {val:data.bookAuthor,status:2};
            that.bookCategory = data.bookCategory;
            that.bookPrice = {val:data.bookPrice,status:2};
            that.bookPublish = {val:data.bookPublish,status:2};
            that.bookDescription = {val:data.bookIntroduction,status:2};
            that.bookCanDay = {val:data.dateCount,status:2};
            that.bookName = {val:data.bookName,status:2};
            that.bookPic = data.bookImage;
            // this.error = '';
        })
        this.$http.post('/dj_library/admin/returnBookCategoryName')
            .then(res => {
                console.log(res);
                if(res.body.code == 200){
                    that.bookCategoryItems = res.body.data;
                }
            })
    },
    mounted(){
        // 图片上传
        let that = this;
        let iMaxFilesize = 2097152; //2M
        window.fileSelected = function() {
            let oFile = document.getElementById('imageFile').files[0];    //读取文件
            let rFilter = /^(image\/bmp|image\/gif|image\/jpeg|image\/png|image\/tiff)$/i;
            if (!rFilter.test(oFile.type)) {
                that.showPop('文件格式必须为图片')
                // alert("文件格式必须为图片");
                return;
            }
            if (oFile.size > iMaxFilesize) {
                that.showPop('图片大小不能超过2M')
                // alert("图片大小不能超过2M");
                return;
            }
            // 获取 window 的 URL 工具
            let URL = window.URL || window.webkitURL;
            that.bookPic = URL.createObjectURL(oFile);
            // 通过 file 生成目标 url
            // let imgURL = URL.createObjectURL(oFile);
            // let picBox = document.getElementById('pic');
            // picBox.setAttribute('src',imgURL);

            
            // let vFD = new FormData(document.getElementById('uploadForm')),    //建立请求和数据
            //     oXHR = new XMLHttpRequest();
            // oXHR.addEventListener('load', function(resUpload) {
            //     //成功
            // }, false);
            // oXHR.addEventListener('error', function() {
            //     //失败
            // }, false);
            // oXHR.addEventListener('abort', function() {
            //     //上传中断
            // }, false);
            // oXHR.open('POST', actionUrl);
            // oXHR.send(vFD);
        };
        
    }
}
</script>
<style lang="less" scoped>
    .book-grounding {
        padding:50px 80px;
        font-size: 20px;
        .book-description {
            textarea {
                vertical-align: text-top;
                outline: none;
                padding: 8px;
                font-size: 16px;
            }
        }
        .category-select {
            padding: 20px;
            margin-bottom: 20px;
            select {
                height: 30px;
                font-size: 16px;
                padding-left: 36px;
                cursor: pointer;
            }
        }
        .bottom-form {
            padding: 20px;
        }
        .save {
            margin: 35px auto 0;
            width: 80px;
            height: 36px;
            line-height: 36px;
            text-align: center;
            background-color: #354457;
            color: #eee;
            border-radius: 8px;
            cursor: pointer;
            // float: right;
            transition: .2s;
            &:hover {
                background-color: rgb(94, 93, 93);
                transition: .2s;
            }
        }
        .div-common-margin {
            box-sizing: border-box;
            float: left;
            width: 340px;
            .pic-box {
                // float: left;
                width: 180px;
                height: 180px;
                margin: -22px 0 0 107px;
                border: 1px solid #000;
                // width: 340px;
                .pic-img {
                    width: 100%;
                    height: 100%;
                }
            }
            #uploadForm {
                padding-left: 106px;
                width: 185px;
                input {
                    cursor: pointer;
                }
            }
        }
        .input-common-style {
            line-height: 30px;
            padding-left: 10px;
            font-size: 16px;
            // width: 230px;
            outline: none;
        }
        .r-lable {
            // margin-left: 80px;
            &>input {
                width: 50px;
            }
        }
        .grounding-input {
            width: 300px;
            background-color: #E4EAF3;
            border-radius: 4px;
            padding-left: 8px;
            height: 32px;
            line-height: 32px;
            font-size: 16px;
            input {
                // padding-left: 8px;
                border: none;
                height: 28px;
                padding: 2px 8px;
                line-height: 20px;
                font-size: 14px;
            }
        }
    }
    .registration-form {
        .form-group {
            margin-bottom: 15px;
            .sr-only {
                position: absolute;
                width: 1px;
                height: 1px;
                padding: 0;
                margin: -1px;
                overflow: hidden;
                clip: rect(0,0,0,0);
                border: 0;
            }
            label {
                display: inline-block;
                max-width: 100%;
                margin-bottom: 5px;
                font-weight: 700;
            }
            .form-control {
                display: block;
                width: 100%;
                height: 46px;
                box-sizing: border-box;
                padding: 6px 12px;
                font-size: 16px;
                line-height: 1.42857143;
                color: #000;
                font-weight: unset;
                background-color: #fff;
                background-image: none;
                border: 1px solid #ccc;
                border-radius: 4px;
                box-shadow: inset 0 1px 1px rgba(0,0,0,.075);
                transition: border-color ease-in-out .15s,box-shadow ease-in-out .15s;
            }
        }
        input[type="text"], textarea, textarea.form-control {
            height: 50px;
            margin: 0;
            padding: 0 20px;
            vertical-align: middle;
            background: #f8f8f8;
            border: 1px solid #ddd;
            font-family: 'Roboto', sans-serif;
            font-size: 16px;
            font-weight: 300;
            line-height: 50px;
            color: #888;
            border-radius: 4px;
            box-shadow: none;
            transition: all .3s;
            &.error {
                border-color: #fd625e; 
            }
            &#desc-input {
                height: 71px;
            }
        }
        input[type="text"]:focus, textarea:focus, textarea.form-control:focus {
            outline: 0;
            background: #fff;
            border: 3px solid #ccc;
            box-shadow: none;
        }
        .error {
            color: #fd625e;
            font-size: 14px;
            height: 24px;
            line-height: 24px;
            margin-bottom: 10px;
            position: relative;
            i {
                width: 32px;
                height: 32px;
                padding: 4px;
                border: 1px solid transparent;
                border-radius: 3px;
                transition: all .3s;
                display: block;
                position: absolute;
                right: 35px;
                top: -20px;
                background: url(../../../assets/clear.png) no-repeat center center;
                cursor: pointer;
                &:hover {
                    border-color: #eee;
                    box-shadow: #000 0 0 3px 0;
                    transition: all .3s; 
                }
            }
        }
    }
</style>


