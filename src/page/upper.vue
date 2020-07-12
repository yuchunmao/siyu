<template>
    <div class="fillcontain">
        <head-top></head-top>
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="120px" class="demo-ruleForm"
                 style="overflow: hidden;margin-top: 40px">
            <el-form-item label="商品编号" prop="number">
                <el-input v-model="ruleForm.number"></el-input>
            </el-form-item>
            <el-form-item label="商品名称" prop="name">
                <el-input v-model="ruleForm.name"></el-input>
            </el-form-item>
            <el-form-item label="商品分类" prop="class">
                <el-select v-model="ruleForm.class">
                    <el-option label="鲜花" value="1"></el-option>
                    <el-option label="盆景" value="2"></el-option>
                    <el-option label="绿植" value="3"></el-option>
                    <el-option label="其他" value="4"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="上下架" prop="region">
                <el-select v-model="ruleForm.region">
                    <el-option label="上架" value="1"></el-option>
                    <el-option label="下架" value="0"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="排序" prop="sorts">
                <el-input v-model="ruleForm.sorts"></el-input>
            </el-form-item>
            <el-form-item label="售价" prop="price">
                <el-input v-model="ruleForm.price"></el-input>
            </el-form-item>
            <el-form-item label="上传商品图片" prop="avatar" label-width="120px" style="margin-left: 20px;">
                <el-upload
                    class="avatar-uploader"
                    action="http://39.100.113.191:6300/product/uploadImg"
                    :show-file-list="false"
                    :on-success="uploadImg"
                >
                    <img v-if="ruleForm.avatar" :src="ruleForm.avatar" class="avatar">
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>

            </el-form-item>
            <el-form-item style="margin-top: 120px;">
                <el-button type="primary" @click="submitForm('ruleForm')">保存</el-button>
                <el-button @click="resetForm('ruleForm')">重置</el-button>
            </el-form-item>
        </el-form>
        <el-tabs v-model="activeName" type="card"
                 style="margin: 0 0 30px 30px;min-height:300px;">
            <el-tab-pane label="商品详情" name="first">
                <div class="editor-text">
                    <quill-editor ref="myTextEditor"
                                  v-model="account.content"
                                  :options="editorOption">
                    </quill-editor>
                </div>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>


<script>
    import headTop from '../components/headTop'
    //    import ueditor from '../ueditor/ueditor.js'
    //    import all from '../ueditor/all.min.js'
    // import zhcn from '../ueditor/zh-cn.js'

    // import tinymce from 'tinymce/tinymce'
    // import 'tinymce/themes/silver/theme'
    // import Editor from '@tinymce/tinymce-vue'

    export default {

        data() {
            return {
                activeName: 'first',
                fileList: [],
                drawings: [],
                tinymceHtml: "请输入内容",
                account: {
                    title: "",
                    content: "",
                    author: "",
                    createTime: "",
                    state: ""
                },
                editorOption: {
                    modules: {
                        toolbar: [
                            ['bold', 'italic', 'underline', 'strike'],
                            ['blockquote', 'code-block'],
                            [{'header': 1}, {'header': 2}],
                            [{'list': 'ordered'}, {'list': 'bullet'}],
                            [{'script': 'sub'}, {'script': 'super'}],
                            [{'indent': '-1'}, {'indent': '+1'}],
                            [{'direction': 'rtl'}],
                            [{'size': ['small', false, 'large', 'huge']}],
                            [{'font': []}],
                            [{'color': []}, {'background': []}],
                            [{'align': []}],
                            ['clean'],
                            ['link', 'image']
                        ]
                    }
                },
                ruleForm: {
                    number: "",
                    name: '',
                    class: '',
                    region: '',
                    sorts: '',
                    market: '',
                    avatar: '',
                    specs:[
                        {
                            name:'',
                            price:''
                        }
                    ]
                },
                rules: {
                    name: [
                        {required: true, message: '请输入商品名称', trigger: 'blur'},
                    ],
                    number: [
                        {required: true, message: '请输入商品编号', trigger: 'blur'},
                    ],
                    region: [
                        {required: true, message: '请选择商品上下架', trigger: 'change'}
                    ],
                    sorts: [
                        {required: true, message: '请输入商品排序', trigger: 'blur'},
                    ],
                    price: [
                        {required: true, message: '请输入商品售价', trigger: 'blur'},
                    ],
                    avatar: [
                        {required: true, message: '请上传商品主图', trigger: 'blur'},
                    ],
                    class: [
                        {required: true, message: '请选择商品分类', trigger: 'blur'},
                    ],

                }
            }
        },
        components: {
            headTop,
            // Editor
        },

        computed: {},
        mounted() {
            this.$nextTick(() => {
                let bold = document.getElementsByClassName('ql-bold')[0]
                bold.setAttribute('title', '加粗')

                let italic = document.getElementsByClassName('ql-italic')[0]
                italic.setAttribute('title', '倾斜')

                let underline = document.getElementsByClassName('ql-underline')[0]
                underline.setAttribute('title', '下划线')

                let strike = document.getElementsByClassName('ql-strike')[0]
                strike.setAttribute('title', '删除线')

                let blockquote = document.getElementsByClassName('ql-blockquote')[0]
                blockquote.setAttribute('title', '引用')

                let codeBlock = document.getElementsByClassName('ql-code-block')[0]
                codeBlock.setAttribute('title', '内联代码')

                let size = document.getElementsByClassName('ql-size')[0]
                size.setAttribute('title', '字号')

                let font = document.getElementsByClassName('ql-font')[0]
                font.setAttribute('title', '字体')

                let color = document.getElementsByClassName('ql-color')[0]
                color.setAttribute('title', '字体颜色')

                let bott = document.getElementsByClassName('ql-image')[0]
                bott.setAttribute('title', '插入图片')

                bott.onclick = function () {
                    console.log(222)
                }
            })


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
            uploadImg(res, file) {
                // this.ruleForm.avatar =  URL.createObjectURL(file.raw);
                this.ruleForm.avatar = res.return_data
                console.log(this.ruleForm.avatar)
            },

            resetForm(formName) {
                this.$refs[formName].resetFields();
            },
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        alert('submit!');
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },


        },
    }
</script>

<style lang="less">
    @import '../style/mixin';

    .top-head {
        margin-left: 20px;
        margin-bottom: 30px;

        button {
            padding: 6px 20px;
            margin: 15px 0;
        }
    }

    .el-form-item {
        float: left;

        .el-input {
            width: 220px;

        }
    }

    .ql-container {
        min-height: 300px;
    }

    .avatar-uploader .el-upload {
        border: 1px dashed #d9d9d9;
        margin-top: 10px;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
    }

    .avatar-uploader .el-upload:hover {
        border-color: #20a0ff;
    }

    .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 160px;
        height: 160px;
        line-height: 160px;
        text-align: center;
    }

    .avatar {
        width: 120px;
        height: 120px;
        display: block;
    }

    .demo-text {
        margin: 50px 0 0 40px;
        width: 30%;
        float: left;

    }

    .form {
        width: 60px;

        .el-select {
            margin-top: 30px;
            margin-bottom: 40px;
            width: 60px;

        }
    }

</style>
