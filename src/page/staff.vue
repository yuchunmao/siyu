<template>
    <div class="fillcontain">
        <head-top></head-top>
        <div class="increase">
            <el-input v-model="login1"
                      @keyup.enter.native='gosearch()'
                      style="width: 210px;" placeholder="请输入姓名进行搜索"></el-input>
            <el-input v-model="login2"
                      @keyup.enter.native='gosearch()'
                      style="width: 210px;" placeholder="请输入手机进行搜索"></el-input>
            <el-button type="primary" @click="gosearch()">查询</el-button>
            <el-button type="primary" @click="dialogVisible = true">新增</el-button>
        </div>
        <div class="table_container">
            <el-table
                :data="tableData"
                border
                height="550"
                highlight-current-row
                :header-cell-style="{background:'#eef1f6',color:'#606266'}"
                style="width: 100%">
                <el-table-column label="序号" type="index" align="center" show-overflow-tooltip width="80">
                </el-table-column>
                <el-table-column
                    property="nickname"
                    label="姓名"
                    prop="username"
                    show-overflow-tooltip
                    align="center"
                >
                </el-table-column>
                <el-table-column
                    property="phoneNumber"
                    label="登陆手机"
                    prop="tel"
                    show-overflow-tooltip
                    align="center"
                >
                </el-table-column>
                <el-table-column width="250" label="操作" align="center">
                    <template slot-scope="scope">
                        <el-button
                            size="mini"
                            @click="handleEdit(scope.$index, scope.row)">修改
                        </el-button>
                        <el-button
                            size="mini"
                            @click="handleEdit(scope.$index, scope.row)">密码重置
                        </el-button>
                        <el-button
                            size="mini"
                            type="danger"
                            @click="handleDelete(scope.$index, scope.row)">删除
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
        <!--新增员工弹窗-->
        <el-dialog
            title="新增员工"
            :visible.sync="dialogVisible"
            width="30%">
            <el-form ref="staffForm" :model="staffData" :rules="staffRules" label-width="80px">
                <el-form-item label="姓名" prop="name">
                        <el-input v-model="staffData.name"></el-input>
                </el-form-item>
                <el-form-item label="登陆手机" prop="tel">
                        <el-input v-model="staffData.tel" prop="tel"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="save('staffForm')">保存</el-button>
            </div>
        </el-dialog>
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
                staffData: {
                    name: '',
                    tel: ''
                },
                staffRules: {
                    name: [
                        {required: true, message: '请输入姓名', trigger: 'blur'},
                    ],
                    tel: [
                        {type: 'number', required: true, message: '请输入联系电话', trigger: 'blur'},
                    ]
                },
                imgs: "",
                // head:"http://prvxx35vk.bkt.clouddn.com/O1CN01PvNBXw1l4PmXTpDsu_%21%21917264765.jpg",
                tableData: [{
                    registe_time: '2016-05-02',
                    username: '虞文青',
                    tel: '15856571314'
                }, {
                    registe_time: '2016-05-04',
                    username: '李文',
                    tel: '15874965874'
                }, {
                    registe_time: '2016-05-01',
                    username: '虞春茂',
                    tel: '13270169698'
                }, {
                    registe_time: '2016-05-03',
                    username: '虞东林',
                    tel: '18726071338'
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
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
            },
            handleCurrentChange(val) {
                this.currentPage = val;
                this.offset = (val - 1) * this.limit;
                this.getUsers()
            },
            save(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.dialogVisible = false
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });

            },
        },
    }
</script>

<style lang="less" scoped>
    @import '../style/mixin';

    .table_container {
        padding: 20px;
    }

    .el-table td, .el-table th {
        text-align: center;
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
