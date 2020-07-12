<template>
    <div class="fillcontain">
        <head-top></head-top>
        <div class="increase">
            <!--<div style="float: left;">-->
            <!--<el-input v-model="login1" style="width: 210px;margin-right: 15px;"-->
            <!--@keyup.enter.native='gosearch()'-->
            <!--placeholder="请输入订单编号进行搜索"></el-input>-->
            <!--<el-input v-model="login1" style="width: 210px;margin-right: 15px;"-->
            <!--@keyup.enter.native='gosearch()'-->
            <!--placeholder="请输入收货人进行搜索"></el-input>-->
            <!--<el-input v-model="login1" style="width: 210px;margin-right: 15px;"-->
            <!--@keyup.enter.native='gosearch()'-->
            <!--placeholder="请输入联系方式进行搜索"></el-input>-->
            <!--<el-button type="primary" @click="gosearch()">查询</el-button>-->
            <!--</div>-->
        </div>
        <div class="table_container">
            <el-table
                :header-cell-style="{background:'#eef1f6',color:'#606266'}"
                :data="goodsClass"
                border>
                <el-table-column label="序号" type="index" align="center" show-overflow-tooltip width="80">
                </el-table-column>
                <el-table-column
                    label="分类名称"
                    prop="name"
                    show-overflow-tooltip
                    align="center">
                </el-table-column>
                <el-table-column label="操作" align="center">
                    <template slot-scope="scope">
                        <el-button
                            size="mini"
                            @click="orderDetails(scope.$index)">编辑
                        </el-button>

                    </template>
                </el-table-column>
            </el-table>
            <!--<div class="Pagination" style="text-align: left;margin-top: 10px;">-->
            <!--<el-pagination-->
            <!--@size-change="handleSizeChange"-->
            <!--@current-change="handleCurrentChange"-->
            <!--:current-page="currentPage"-->
            <!--:page-size="20"-->
            <!--layout="total, prev, pager, next"-->
            <!--:total="count">-->
            <!--</el-pagination>-->
            <!--</div>-->
        </div>

    </div>
</template>

<script>
    import headTop from '../components/headTop'
    import {getOrderList, getOrderCount, getResturantDetail, getUserInfo, getAddressById} from '@/api/getData'

    export default {
        data() {
            return {
                goodsClass: [
                    {
                        name: '盆景',
                    }, {
                        name: '绿植',
                    }, {
                        name: '鲜花',
                    }, {
                        name: '其他',
                    },
                ],
            }
        },
        components: {
            headTop,
        },
        beforeCreate() {
            if (!localStorage.getItem('user')) {
                this.$router.push('/')
                this.$notify.error({
                    title: '错误',
                    message: '登陆失效，请重新登陆',
                    offset: 100
                });
            }
        },
        methods: {

        }

    }
</script>

<style lang="less">
    @import '../style/mixin';

    .table_container {
        padding: 20px;
    }

    .demo-table-expand {
        font-size: 0;
    }

    .demo-table-expand label {
        width: 90px;
        color: #99a9bf;
    }

    .demo-table-expand .el-form-item {
        margin-right: 0;
        margin-bottom: 0;
        width: 50%;
    }

    .increase {
        overflow: hidden;
        margin: 15px 20px 0 17px;

        button {
            float: right;
            padding: 7px 25px;
            font-size: 14px;
        }

        .right-buott {
            float: right;
            margin-right: 15px;
        }
    }
</style>
