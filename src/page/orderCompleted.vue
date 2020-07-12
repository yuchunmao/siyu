<template>
    <div class="fillcontain">
        <head-top></head-top>
        <div class="increase">
            <div style="float: left;">
                <el-input v-model="login1" style="width: 210px;margin-right: 15px;"
                          @keyup.enter.native='gosearch()'
                          placeholder="请输入订单编号进行搜索"></el-input>
                <el-input v-model="login1" style="width: 210px;margin-right: 15px;"
                          @keyup.enter.native='gosearch()'
                          placeholder="请输入收货人进行搜索"></el-input>
                <el-input v-model="login1" style="width: 210px;margin-right: 15px;"
                          @keyup.enter.native='gosearch()'
                          placeholder="请输入联系方式进行搜索"></el-input>
                <el-button type="primary" @click="gosearch()">查询</el-button>
            </div>
        </div>
        <div class="table_container">
            <el-table
                :header-cell-style="{background:'#eef1f6',color:'#606266'}"
                :data="orderList"
                border
                height="550"
                style="width: 100%">
                <el-table-column
                    width="180"
                    label="订单编号"
                    prop="sn"
                    show-overflow-tooltip
                    align="center">
                </el-table-column>
                <el-table-column
                    label="收货人"
                    width="120"
                    prop="name"
                    show-overflow-tooltip
                    align="center">
                </el-table-column>
                <el-table-column
                    label="收货人手机"
                    width="140"
                    prop="tel"
                    show-overflow-tooltip
                    align="center">
                </el-table-column>
                <el-table-column
                    label="送货地址"
                    prop="address"
                    show-overflow-tooltip
                    align="center">
                </el-table-column>
                <el-table-column
                    label="订单总额"
                    width="150"
                    prop="allPrice"
                    show-overflow-tooltip
                    align="center">
                </el-table-column>
                <el-table-column
                    label="备注"
                    width="180"
                    prop="orderTime"
                    show-overflow-tooltip
                    align="center">
                </el-table-column>
                <el-table-column label="操作" width="110" align="center">
                    <template slot-scope="scope">
                        <el-button
                            size="mini"
                            @click="orderDetails(scope.$index)">订单详情
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
                orderList: [
                    {
                        sn: '123456',
                        name: '小白',
                        tel: '123456789',
                        address: '人民路156号',
                        allPrice: '158',
                        orderTime: '2019-06-08',
                    }, {
                        sn: '123456',
                        name: '小红',
                        tel: '123456789',
                        address: '山水公园',
                        allPrice: '1558',
                        orderTime: '2019-06-08',
                    }, {
                        sn: '123456',
                        name: '小绿',
                        tel: '123456789',
                        address: '第一城',
                        allPrice: '208',
                        orderTime: '2019-06-08',
                    }, {
                        sn: '123456',
                        name: '小黄',
                        tel: '123456789',
                        address: '宿松二中',
                        allPrice: '788',
                        orderTime: '2019-06-08',
                    },
                ],
                tableData: [],
                currentRow: null,
                login1: "",
                login2: "",
                login3: "",
                id: "",
                offset: 0,
                limit: 20,
                count: 0,
                currentPage: 1,
                restaurant_id: null,
                expendRow: [],
                dialogVisible: false,
                form: {
                    name: '',
                    numbers: ""
                },
            }
        },
        components: {
            headTop,
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
        methods: {

            orderDetails() {
                this.$router.push('orderDetails')
            }
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
