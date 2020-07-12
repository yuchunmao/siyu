<template>
    <div class="fillcontain">
        <head-top></head-top>
        <div class="increase">
            <h3>订单基本信息</h3>
            <div class="customerMes">
                <div class="oneItem"><span>订单编号：</span><span>{{orderDetails.sn}}</span></div>
                <div class="oneItem"><span>用户昵称：</span><span>{{orderDetails.userName}}</span></div>
                <div class="oneItem"><span>用户昵称备注：</span><span>{{orderDetails.userNameRemarks}}</span></div>
                <div class="oneItem"><span>订单总额：</span><span class="orange">{{orderDetails.totalPrice}}</span></div>
                <div class="oneItem"><span>收货人：</span><span>{{orderDetails.consignee}}</span></div>
                <div class="oneItem"><span>收货人联系方式：</span><span>{{orderDetails.consigneeTel}}</span></div>
                <div class="threeItem"><span>收货地址：</span><span>{{orderDetails.consigneeAddress}}</span></div>
                <div class="threeItem"><span>订单备注：</span><span>{{orderDetails.remarks}}</span></div>
            </div>

        </div>
        <div class="table_container">
            <h3>商品信息</h3>
            <el-table
                :data="orderDetails.goodsList"
                border
                highlight-current-row
                :header-cell-style="{background:'#eef1f6',color:'#606266'}"
                style="width: 100%">
                <el-table-column align="center" label="序号" type="index" show-overflow-tooltip width="65">
                </el-table-column>
                <el-table-column
                    property="phoneNumber"
                    label="商品名称"
                    prop="goodsName"
                    :show-overflow-tooltip="true"
                    align="center"
                >
                </el-table-column>
                <el-table-column
                    property="gender"
                    label="规格"
                    prop="goodsSpecs"
                    :show-overflow-tooltip="true"
                    align="center"
                >
                </el-table-column>
                <el-table-column
                    property="gender"
                    label="数量"
                    prop="sum"
                    :show-overflow-tooltip="true"
                    align="center"
                >
                </el-table-column>
                <el-table-column
                    property="createTime"
                    label="单价"
                    prop="price"
                    :show-overflow-tooltip="true"
                    align="center"
                >
                </el-table-column>
                <el-table-column
                    property="modifyTime"
                    label="合计"
                    :show-overflow-tooltip="true"
                    align="center"
                    :formatter="allPriceFormat"
                >
                </el-table-column>
            </el-table>
        </div>

    </div>
</template>

<script>
    import headTop from '../components/headTop'
    import {getUserList, getUserCount} from '@/api/getData'

    export default {
        data() {
            return {
                orderDetails: {
                    sn: '123456789',
                    userName: '鱼鱼鱼',
                    userNameRemarks: '熟客虞先生',
                    totalPrice: '1580',
                    consignee: '小于',
                    consigneeTel: '13270169698',
                    consigneeAddress: '人民路第一城5幢3单元',
                    remarks:'请尽快送达',
                    goodsList: [
                        {
                            goodsName: '绿萝',
                            goodsSpecs: '默认规格',
                            sum: '3',
                            price: '20'
                        }, {
                            goodsName: '多肉',
                            goodsSpecs: '带盆',
                            sum: '5',
                            price: '10'
                        }, {
                            goodsName: '袖珍叶子',
                            goodsSpecs: '带盆',
                            sum: '2',
                            price: '15'
                        }, {
                            goodsName: '君子兰',
                            goodsSpecs: '带盆',
                            sum: '1',
                            price: '60'
                        }, {
                            goodsName: '芦荟',
                            goodsSpecs: '带盆',
                            sum: '2',
                            price: '15'
                        }
                    ],


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
            allPriceFormat(row, column) {
                return row.price * row.sum
            }
        },
    }
</script>

<style lang="less" scoped>
    @import '../style/mixin';

    .table_container {
        padding: 20px;

        h3 {
            padding: 10px 0 10px 10px;
        }

        .head-h3 {
            display: flex;
            justify-content: space-between;
            margin-bottom: 10px;

            button {
                margin-right: 20px;
            }
        }
    }

    .increase {
        margin: 15px 20px 0 18px;

        h3 {
            padding: 10px 0 10px 10px;
        }

        .customerMes {
            display: flex;
            flex-wrap: wrap;
            width: 90%;
            margin: 0 auto;

            .oneItem {
                width: 33.3%;
                height: 50px;
                line-height: 50px;
            }

            .twoItem {
                width: 19.8%;
                height: 50px;
                line-height: 50px;
            }

            .threeItem {
                width: 60%;
                height: 50px;
                line-height: 50px;
            }

            .orange {
                color: #FF9D00;
            }
        }
    }
</style>
