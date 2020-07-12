<template>
    <div class="login_page fillcontain">
        <div class="left-imgss">
            <!--<img src="../assets/img/dl.png"/>-->
        </div>
        <transition name="form-fade" mode="in-out">
            <section class="form_contianer">
                <div class="manaform">
                    <div class="manatop">
                        <div class="fui-top">
                            <div class="manage_tip">
                                <p>欢迎登录</p>
                                <div class="manage">
                                </div>
                            </div>
                            <el-form :model="loginForm" :rules="rules" ref="loginForm">
                                <el-form-item prop="username">
                                    <el-input v-model="loginForm.username"
                                              placeholder="请输入手机号码"></el-input>
                                </el-form-item>

                                <el-form-item prop="password">
                                    <el-input type="password" placeholder="请输入密码"
                                              v-model="loginForm.password"></el-input>
                                </el-form-item>
                                <!--<p class="elfor">忘记密码？</p>-->
                                <el-form-item style="width:90%;margin: 0 auto;">
                                    <el-button type="primary" style="width: 100%; margin-top: 35px;"
                                               @click="submitForm('loginForm')" class="submit_btn">登录
                                    </el-button>
                                </el-form-item>
                            </el-form>
                        </div>
                    </div>
                </div>
            </section>

        </transition>
        <div class="right-texss">
            <!--<p>大樂 <span style="font-size: 18px;padding-left: 13px;">BIGHAPPY</span></p>-->
            <p>思雨花卉商城</p>
            <p style="letter-spacing:3px">后台管理系统</p>
        </div>
    </div>
</template>

<script>
    import {login, getAdminInfo} from '@/api/getData'
    import {mapActions, mapState} from 'vuex'

    export default {
        data() {
            return {
                loginForm: {
                    username: '',
                    password: '',
                },
                rules: {
                    username: [
                        {required: true, message: '请输入用户名', trigger: 'blur'},
                    ],
                    password: [
                        {required: true, message: '请输入密码', trigger: 'blur'}
                    ],
                },
            }
        },
        mounted() {

        },

        methods: {
           submitForm(formName) {
                // this.$router.push('userList')
                let that = this
                that.$refs[formName].validate(async (valid) => {
                	if (valid) {
                	    localStorage.setItem('user','登陆成功')
                        this.$router.push('userList')
                		 //  that.$axios.post(this.address +'/user/getLogin',{
                			// 	 "password": this.loginForm.password,
                			// 	 "username": this.loginForm.username,
                			// 	 }).then((res) =>{
                			// 		 console.log(res)
                			//   if (res.data.return_code == 100) {
                			// 	this.$message({
                			// 		 type: 'success',
                			// 		 message: '登录成功'
                			// 	 });
                			// 	  localStorage.setItem('data' ,res.data.return_data)
                			// 	  var data = localStorage.getItem('data')
                			// 	 console.log(data,22)
                			// 	this.$router.push('userList')
                			//  }else{
                			// 	this.$message({
                			// 		 type: 'error',
                			// 		 message: res.message
                			// 	 });
                			//  }
                		 // })
                	 } else {
                		this.$notify.error({
                			title: '错误',
                			message: '请输入正确的手机号密码',
                			offset: 100
                		});
                		return false;
                	}
                });
            },
        },
    }
</script>

<style lang="less" scoped>
    @import '../style/mixin';

    .login_page {
        background-image: url(../assets/img/bg3.jpeg);
        background-position: center;

    }

    .manage_tip {
        margin-bottom: 40px;

        p {
            text-align: center;
            font-size: 22px;
            font-family: SourceHanSansCN-Normal;
            font-weight: 400;
            color: rgba(0, 0, 0, 1);
        }
    }

    .left-imgss {
        padding: 25px 0 0 0;
    }

    .manage {
        width: 70px;
        height: 3px;
        margin: 10px auto;
        background: rgba(33, 130, 233, 1);
        border-radius: 2px;
    }

    .manaform {
        width: 380px;
        padding: 10px;
        background: rgba(246, 248, 250, 0.2);
        box-shadow: 0px 10px 30px 0px rgba(12, 36, 127, 0.6);
        border-radius: 30px;
        margin: 0 auto;
    }

    .manatop {
        border-radius: 20px;
        padding: 14% 0;
        background: #fff;
    }

    .fui-top {
        margin: 0 auto;
        width: 80%;
    }

    .form_contianer {
        padding-top: 2%;
        width: 100%;

    }

    .tip {
        font-size: 12px;
        color: red;
    }

    .form-fade-enter-active, .form-fade-leave-active {
        transition: all 1s;
    }

    .form-fade-enter, .form-fade-leave-active {
        transform: translate3d(0, -50px, 0);
        opacity: 0;
    }

    .flet {
        width: 100%;
        overflow: hidden;
        // border-bottom: 1px solid #D6E1ED;
        .el-input {
            width: 240px;
            margin-left: 10px;
            height: 20px;
            float: left;
        }

    }

    .imgs {
        width: 30px;
        height: 30px;
        float: left;
    }

    .elfor {
        color: #97A2B4;
        font-size: 14px;
        text-align: right;
    }

    .el-button {

        border-radius: 30px;
    }

    .el-form-item__error {
        padding-left: 50px !important;
    }

    .right-texss {
        position: absolute;
        bottom: 0;
        right: 0;
        padding: 0 40px 20px 0;
        font-size: 24px;
        text-align: right;
        color: #fff
    }

</style>
