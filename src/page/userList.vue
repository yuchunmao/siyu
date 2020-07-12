<template>
    <div class="fillcontain">
        <head-top></head-top>
        <div class="increase">
            <el-input v-model="login1"
                      @keyup.enter.native='gosearch()'
                      style="width: 210px;" placeholder="请输入用户昵进行搜索"></el-input>
            <el-input v-model="login2"
                      @keyup.enter.native='gosearch()'
                      style="width: 210px;" placeholder="请输入备注进行搜索"></el-input>
            <el-input v-model="login3"
                      @keyup.enter.native='gosearch()'
                      style="width: 210px;" placeholder="请输入用户性别进行搜索"></el-input>
            <el-button type="primary" @click="gosearch()">查询</el-button>
        </div>
        <div class="table_container">
            <el-table
                :header-cell-style="{background:'#eef1f6',color:'#606266'}"
                :data="tableData"
                border
                highlight-current-row
                style="width: 100%">
                <el-table-column type="expand">
                    <template slot-scope="props">
                        <el-table
                            :data="props.row.shippingAddress"
                            border
                            highlight-current-row
                        >
                            <el-table-column label="序号" type="index" align="center" show-overflow-tooltip width="80">
                            </el-table-column>
                            <el-table-column
                                property="nickname"
                                show-overflow-tooltip
                                align="center"
                                label="收货人"
                                prop="name"
                            >
                            </el-table-column>
                            <el-table-column
                                property="nickname"
                                show-overflow-tooltip
                                align="center"
                                label="联系方式"
                                prop="tel"
                            >
                            </el-table-column>
                            <el-table-column
                                property="nickname"
                                show-overflow-tooltip
                                align="center"
                                label="收货地址"
                                prop="address"
                            >
                            </el-table-column>
                            <el-table-column
                                property="nickname"
                                show-overflow-tooltip
                                align="center"
                                label="是否默认"
                                prop="status"
                                :formatter="statusFormat"
                            >
                            </el-table-column>
                        </el-table>
                    </template>
                </el-table-column>
                <el-table-column
                    label="用户头像"
                    width="120"
                >
                    <template slot-scope="scope">
                        <!--  <img src="http://prvxx35vk.bkt.clouddn.com/O1CN01PvNBXw1l4PmXTpDsu_%21%21917264765.jpg"
                         style="width: 110px ;height:100px; padding: 15px 0 10px 15px"/> -->
                        <div style="width: 55px;height: 50px;margin: 20px auto;" @click="godialog(scope.row.headImg)">
                            <img :src='scope.row.headImg' style="width: 100%;height: 100%;"></img>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column
                    property="nickname"
                    show-overflow-tooltip
                    align="center"
                    width="110"
                    label="用户昵称"
                    prop="username"
                >
                </el-table-column>
                <el-table-column
                    property="phoneNumber"
                    show-overflow-tooltip
                    align="center"
                    label="备注"
                    prop="username"
                >
                </el-table-column>
                <el-table-column
                    property="phoneNumber"
                    show-overflow-tooltip
                    align="center"
                    label="手机号码"
                    prop="registe_time"
                >
                </el-table-column>
                <el-table-column
                    property="gender"
                    show-overflow-tooltip
                    align="center"
                    label="性别"
                    width="110"
                    prop="registe_time"
                >
                </el-table-column>
                <el-table-column
                    property="createTime"
                    show-overflow-tooltip
                    align="center"
                    label="注册时间"
                    prop="registe_time"
                >
                </el-table-column>
                <el-table-column
                    property="modifyTime"
                    show-overflow-tooltip
                    align="center"
                    label="修改时间"
                    prop="registe_time"
                >
                </el-table-column>
                <el-table-column
                    property="loginTime"
                    show-overflow-tooltip
                    align="center"
                    label="最近登录时间"
                    prop="registe_time"
                >
                </el-table-column>
                <el-table-column label="操作" align="center">
                    <template slot-scope="scope">
                        <el-button
                            size="mini"
                            @click="addNote(scope.$index, scope.row)">添加备注
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-dialog
                title=""
                :visible.sync="dialogVisible"
                width="30%">
                <img :src="imgs" style="width: 100%;"/>
            </el-dialog>
            <el-dialog
                title="编辑备注"
                :visible.sync="noteDialog"
                width="30%"
                center>
                <el-form :model="userNote" ref="userNote" label-width="100px" class="demo-ruleForm">
                    <el-form-item
                        label="备注"
                        prop="note"
                    >
                        <el-input type="age" v-model="userNote.note"></el-input>
                    </el-form-item>
                </el-form>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="noteDialog = false">取 消</el-button>
                    <el-button type="primary" @click="noteDialog = false">保 存</el-button>
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
                noteDialog: false,
                userNote: {
                    note: ''
                },
                imgs: "",
                tableData: [{
                    registe_time: '2016-05-02',
                    username: '王小虎',
                    city: '上海市普陀区金沙江路 1518 弄',
                    shippingAddress:[
                        {
                            name:'虞春茂',
                            tel:'13270169698',
                            address:'杭州市萧山区',
                            status:'1'
                        },
                        {
                            name:'虞春茂',
                            tel:'13270169698',
                            address:'宿松县人民路',
                            status:'0'
                        },{
                            name:'虞春茂',
                            tel:'13270169698',
                            address:'宿松县宿松路',
                            status:'0'
                        },
                    ]
                }, {
                    registe_time: '2016-05-04',
                    username: '王小虎',
                    city: '上海市普陀区金沙江路 1517 弄',
                    shippingAddress:[
                        {
                            name:'虞春茂',
                            tel:'13270169698',
                            address:'杭州市萧山区',
                            status:'0'
                        },
                        {
                            name:'虞春茂',
                            tel:'13270169698',
                            address:'宿松县人民路',
                            status:'0'
                        },{
                            name:'虞春茂',
                            tel:'13270169698',
                            address:'宿松县宿松路',
                            status:'1'
                        },
                    ]
                }, {
                    registe_time: '2016-05-01',
                    username: '王小虎',
                    city: '上海市普陀区金沙江路 1519 弄',
                    shippingAddress:[
                        {
                            name:'虞春茂',
                            tel:'13270169698',
                            address:'杭州市萧山区',
                            status:'0'
                        },
                        {
                            name:'虞春茂',
                            tel:'13270169698',
                            address:'宿松县人民路',
                            status:'0'
                        },{
                            name:'虞春茂',
                            tel:'13270169698',
                            address:'宿松县宿松路',
                            status:'1'
                        },
                    ]
                }, {
                    registe_time: '2016-05-03',
                    username: '王小虎',
                    city: '上海市普陀区金沙江路 1516 弄',
                    shippingAddress:[
                        {
                            name:'虞春茂',
                            tel:'13270169698',
                            address:'杭州市萧山区'
                        },
                        {
                            name:'虞春茂',
                            tel:'13270169698',
                            address:'宿松县人民路'
                        },{
                            name:'虞春茂',
                            tel:'13270169698',
                            address:'宿松县宿松路'
                        },
                    ]
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
            godialog(e) {
                console.log(e)
                this.imgs = e
                this.dialogVisible = true
            },
            addNote() {
                this.noteDialog = true
            },
            statusFormat(row, column){
                if (row.status == 0){
                    return '否'
                } else {
                    return '是'
                }
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
