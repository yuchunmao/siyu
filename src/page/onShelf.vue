<template>
    <div class="fillcontain">
        <head-top></head-top>
        <div class="increase">
            <el-input v-model="login1"
                      @keyup.enter.native='gosearch()'
                      style="width: 210px;" placeholder="请输入商品编号进行搜索"></el-input>
            <el-input v-model="login3"
                      @keyup.enter.native='gosearch()'
                      style="width: 210px;" placeholder="请输入商品名称进行搜索"></el-input>
            <el-select v-model="login2"  placeholder="请选择商品分类进行搜索"
                       style="width: 210px;margin-right: 15px;">
                <el-option label="分类2" value="10"></el-option>
                <el-option label="分类1" value="20"></el-option>
                <el-option label="分类3" value="30"></el-option>
                <el-option label="分类4" value="40"></el-option>
            </el-select>
            <el-button type="primary" @click="gosearch()">查询</el-button>
        </div>
        <div class="table_container">
            <el-table
                :header-cell-style="{background:'#eef1f6',color:'#606266'}"
                :data="tableData"
                border
                highlight-current-row
                style="width: 100%">
                <el-table-column
                    property="nickname"
                    show-overflow-tooltip
                    align="center"
                    width="150"
                    label="商品编号"
                    prop="username"
                >
                </el-table-column>
                <el-table-column
                    property="phoneNumber"
                    show-overflow-tooltip
                    align="center"
                    label="商品名称"
                    prop="username"
                >
                </el-table-column>
                <el-table-column
                    property="phoneNumber"
                    show-overflow-tooltip
                    align="center"
                    label="商品分类"
                    prop="registe_time"
                >
                </el-table-column>
                <el-table-column
                    property="phoneNumber"
                    show-overflow-tooltip
                    align="center"
                    label="排序"
                    width="100"
                    prop="registe_time"
                >
                </el-table-column>
                <el-table-column
                    property="gender"
                    show-overflow-tooltip
                    align="center"
                    label="价格"
                    width="110"
                    prop="registe_time"
                >
                </el-table-column>
                <el-table-column
                    property="modifyTime"
                    show-overflow-tooltip
                    align="center"
                    label="上架时间"
                    prop="registe_time"
                >
                </el-table-column>
                <el-table-column
                    align="center"
                    width="150"
                    label="操作">
                    <template slot-scope="scope">
                        <el-button
                            size="mini"
                            @click="addNote(scope.$index, scope.row)">编辑
                        </el-button>
                        <el-button
                            size="mini"
                            @click="upShelf(scope.$index, scope.row)">下架
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-dialog
                title="提示"
                :visible.sync="dialogVisible"
                width="10%"
                center>
                <span>是否确定将该商品下架？</span>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="dialogVisible = false">取 消</el-button>
                    <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
                </span>
            </el-dialog>
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
    import {getUserList, getUserCount} from '@/api/getData'

    export default {
        data() {
            return {
                login1: "",
                login2: "",
                login3: "",
                dialogVisible: false,
                userNote: {
                    note:''
                },
                imgs: "",
                tableData: [{
                    registe_time: '2016-05-02',
                    username: '王小虎',
                    city: '上海市普陀区金沙江路 1518 弄'
                }, {
                    registe_time: '2016-05-04',
                    username: '王小虎',
                    city: '上海市普陀区金沙江路 1517 弄'
                }, {
                    registe_time: '2016-05-01',
                    username: '王小虎',
                    city: '上海市普陀区金沙江路 1519 弄'
                }, {
                    registe_time: '2016-05-03',
                    username: '王小虎',
                    city: '上海市普陀区金沙江路 1516 弄'
                }],
                currentRow: null,
                offset: 0,
                limit: 20,
                count: 0,
                currentPage: 1,
                time: '1559001600000'
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
        created() {

        },

        methods: {
            upShelf() {
                this.dialogVisible = true
            }
        },
    }
</script>

<style lang="less">
    @import '../style/mixin';

    .table_container {
        padding: 20px;
    }

    .increase {
        margin: 15px 20px 0 18px;

        button {
            margin-left: 15px;
            padding: 8px 25px;
            float: none !important;
        }

        .el-input {
            margin-right: 20px;
        }
    }
</style>
