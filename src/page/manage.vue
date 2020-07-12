<template>
    <div class="manage_page fillcontain">
        <el-row style="height: 100%;">
            <el-col :span="4" style="min-height: 100%; background-color: #324057;">
                <el-menu
                    :default-active="defaultActive"
                    style="min-height: 100%;"
                    theme="dark"
                    router
                    background-color="#324057"
                    text-color="#fff"
                >
                    <!--<el-menu-item index="home"><i class="el-icon-s-data"></i>首页</el-menu-item>-->

                    <el-menu-item index="userList"><i class="el-icon-user-solid"></i>用户列表</el-menu-item>
                    <el-submenu index="2">
                        <template slot="title"><i class="el-icon-s-goods"></i>商品管理</template>
                        <el-menu-item index="upper">发布新品</el-menu-item>
                        <el-menu-item index="onShelf">已上架商品</el-menu-item>
                        <el-menu-item index="upShelf">已下架商品</el-menu-item>
                        <el-menu-item index="goodsClass">商品分类</el-menu-item>
                    </el-submenu>
                    <el-submenu index="3">
                        <template slot="title"><i class="el-icon-s-order"></i>订单管理</template>
                        <el-menu-item index="orderDelivering">待送货订单</el-menu-item>
                        <el-menu-item index="orderCompleted">已完成订单</el-menu-item>
                    </el-submenu>
                    <el-menu-item index="staff"><i class="el-icon-s-custom"></i>员工管理</el-menu-item>
                </el-menu>
            </el-col>
            <el-col :span="20" style="height: 100%;overflow: auto;">
                <keep-alive>
                    <router-view></router-view>
                </keep-alive>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    export default {
        data(){
          return{
              clock: '',
          }
        },
        beforeCreate(){
            if (!localStorage.getItem('user')) {
                this.$router.push('/')
                this.$notify.error({
                    title: '错误',
                    message: '登陆失效，请重新登陆',
                    offset: 100
                });
            }
        },
        mounted() {
            this.$nextTick(() => {
                setInterval(this.CurentTime, 2000);
            })
        },
        methods:{
            CurentTime() {
                // this.$notify({
                //     title: '提示',
                //     message: '这是一条不会自动关闭的消息',
                //     duration: 0
                // });
            }
        },
        computed: {
            defaultActive: function () {
                return this.$route.path.replace('/', '');
            }
        },
    }
</script>


<style lang="less">
    @import '../style/mixin';

    .manage_page {

    }

</style>
