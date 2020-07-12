<template>
    <div class="header_container">
        <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/userList' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item v-for="(item, index) in $route.meta" :key="index">{{item}}</el-breadcrumb-item>
        </el-breadcrumb>
        <el-dropdown @command="handleCommand" menu-align='start'>
             <p style="float: left;padding: 10px 15px 0 0;">{{username}}</p>
            <img :src="baseImgPath + adminInfo.avatar" class="avator">
            <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="passWord">修改密码</el-dropdown-item>
                <el-dropdown-item command="signout">退出</el-dropdown-item>
            </el-dropdown-menu>
        </el-dropdown>
        <!--修改密码弹窗-->
        <el-dialog
            title="密码修改"
            :visible.sync="dialogVisible"
            width="50%">
            <el-form ref="Data" :model="Data" :rules="Rules" label-width="80px">
                <el-form-item label="旧密码" prop="oldPas">
                    <el-input v-model="Data.oldPas"></el-input>
                </el-form-item>
                <el-form-item label="新密码" prop="newPas">
                    <el-input v-model="Data.newPas"></el-input>
                </el-form-item>
                <el-form-item label="再次输入" prop="newPas2">
                    <el-input v-model="Data.newPas2"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="save('Data')">保存</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import {signout} from '@/api/getData'
    import {baseImgPath} from '@/config/env'
    import {mapActions, mapState} from 'vuex'

    export default {
        data(){
            return {
                baseImgPath,
                username:'yuyuyu',
                dialogVisible:false,
                Data:{
                    oldPas:'',
                    newPas:'',
                    newPas2:''
                },
                Rules:{
                    oldPas: [
                        {required: true, message: '请输入旧密码', trigger: 'blur'},
                    ],
                    newPas: [
                        {required: true, message: '请输入新密码', trigger: 'blur'},
                    ],
                    newPas2: [
                        {message: '再次输入新密码', trigger: 'blur'},
                    ],
                }
            }
        },
        created(){
            if (!this.adminInfo.id) {
                this.getAdminData()
            }
        },
        computed: {
            ...mapState(['adminInfo']),
        },
        methods: {
            ...mapActions(['getAdminData']),
            async handleCommand(command) {
                console.log(command)
                let that = this
                if (command == 'passWord') {
                    this.dialogVisible = true
                }else if(command == 'signout'){
                    that.$axios.post('http://39.100.113.191:6300/user/logout').then((res) =>{
                        console.log(res)
                        if(res.data){
                            this.$message({
                                type: 'success',
                                message: '退出成功'
                            });
                            this.$router.push('/');
                            localStorage.clear('data');
                        }


                    })

                    //    this.$message({
                    // 	type: 'success',
                    // 	message: '退出成功'
                    // });
                    // this.$router.push('/');

                    // const res = await signout()
                    //  console.log(res,82)
                    // if (res.status == 1) {
                    // 	this.$message({
                    //                     type: 'success',
                    //                     message: '退出成功'
                    //                 });
                    //                 this.$router.push('/');
                    // }else{
                    // 	this.$message({
                    //                     type: 'error',
                    //                     message: res.message
                    //                 });
                    // }
                }
            },
            saveTraveller(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        console.log(this.Data)
                        this.dialogVisible = false
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            signout(){
                this.$router.push('/');
            }
        }
    }
</script>

<style lang="less">
    @import '../style/mixin';
    .header_container{
        background-color: #EFF2F7;
        height: 60px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding-left: 20px;
    }
    .avator{
        .wh(36px, 36px);
        border-radius: 50%;
        margin-right: 37px;
    }
    .el-dropdown-menu__item{
        text-align: center;
    }
</style>
