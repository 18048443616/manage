<template>
    <div class="manage">
        <el-dialog
        title="提示"
        :visible.sync="dialogVisible"
        :before-close="handleClose"
        width="50%">
        <el-form ref="form" :rules="rules" :model="form" label-width="80px" :inline="true">
            <el-form-item label="姓名" prop="name">
                <el-input v-model="form.name" placeholder="请输入姓名"></el-input>
            </el-form-item>
            <el-form-item label="年龄" prop="age">
                <el-input v-model="form.age" placeholder="请输入年龄"></el-input>
            </el-form-item>
            <el-form-item label="性别" prop="sex">
                <el-select v-model="form.sex" placeholder="请选择活动区域">
                    <el-option label="男" :value="1"></el-option>
                    <el-option label="女" :value="0"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="出生日期" prop="birth">
                <el-date-picker
                v-model="form.birth"
                type="date"
                value-format="yyyy-MM-dd"
                placeholder="选择日期">
                </el-date-picker>
            </el-form-item>
            <el-form-item label="住址" prop="addr">
                <el-input v-model="form.addr" placeholder="请输入地址"></el-input>
            </el-form-item>
        </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="cancle">取 消</el-button>
                <el-button type="primary" @click="submit">确 定</el-button>
            </span>
        </el-dialog>
        <div class="manage-header">
            <el-button type="primary" @click="handleAdd">
                + 新增
            </el-button>
            <!-- 搜索按钮 -->
            <el-form :model="userForm" :inline="true">
                <el-form-item>
                    <el-input v-model="userForm.name" placeholder="请输入姓名"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="checkByname">查询</el-button>
                </el-form-item>
            </el-form>
        </div>
        <div class="common-table">
            <el-table
            :data="userData"
            style="width: 100%"
            :stripe="true"
            height="92%">
                <el-table-column
                    prop="name"
                    label="姓名">
                </el-table-column>
                <el-table-column
                    prop="age"
                    label="年龄">
                </el-table-column>
                <el-table-column
                    prop="sex"
                    label="性别">
                    <template slot-scope="scope">
                        <span>{{ scope.row.sex==0?"女":"男" }}</span>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="birth"
                    label="出生日期">
                </el-table-column>
                <el-table-column
                    prop="addr"
                    label="地址">
                </el-table-column>
                <el-table-column
                    prop=""
                    label="操作">
                    <template slot-scope="scope">
                        <el-button size="mini" @click="handleEdit(scope.row)">编辑</el-button>
                        <el-button size="mini" type="danger" @click="handleDelete(scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="pager">
                <el-pagination
                layout="prev, pager, next"
                :total="total"
                @current-change="handlePage">
            </el-pagination>
            </div>
        </div>
    </div>
</template>

<script>
import {getUser,addUser,editUser,delUser} from '@/api/index'
export default{
    data() {
        return{
            dialogVisible:false,
            form:{
                name:"",
                age:"",
                sex:"",
                birth:"",
                addr:""

            },
            rules: {
                name: [
                    { required: true, message: '请输入姓名', trigger: 'blur' },
                ],
                age: [
                    { required: true, message: '请输入年龄', trigger: 'blur' },
                ],
                sex: [
                    { required: true, message: '请选择性别', trigger: 'blur' },
                ],
                birth: [
                    { required: true, message: '请选择出生日期', trigger: 'blur' },
                ],
                addr: [
                    { required: true, message: '请输入地址', trigger: 'blur' },
                ],
            },
            userData:[],
            modalType:0, //0新增，1更新
            total:0,
            pageData:{
                page:1,
                limit:10            
            },
            userForm:{
                name:''
            }
        }
    },
    mounted(){
        this.getList()
    },
    methods:{
        handleEdit(row){
            this.modalType = 1
            // 不能直接给，需要对当前行数据进行深拷贝
            this.form = JSON.parse(JSON.stringify(row))
            this.dialogVisible = true
        },
        handleDelete(row){
            this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
                }).then(() => {
                    delUser({id:row.id}).then(()=>{
                        this.$message({
                        type: 'success',
                        message: '删除成功!'
                        });
                        this.getList()
                    })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });          
                });
        },
        handleAdd(){
            this.modalType = 0
            this.dialogVisible = true
        },
        getList(){
            getUser({params:{...this.userForm,...this.pageData}}).then(res=>{
                this.userData = res.data.list
                this.total = res.data.count || 0
            })
        },
        submit(){
            this.$refs.form.validate(valid=>{
                if(valid){
                    if(this.modalType === 0){
                        addUser(this.form).then(()=>{
                            this.getList()
                        })
                    }else{
                        editUser(this.form).then(()=>{
                            this.getList()
                        })
                    }
                    // 校验通过则提交数据并清空model,关闭弹窗
                    this.handleClose()
                }
            })
        },
        handleClose(){
            this.$refs.form.resetFields()
            console.log(this.form);
            this.dialogVisible = false
        },
        cancle(){
            this.handleClose()
        },
        handlePage(val){
            console.log(val);
            this.pageData.page = val
            this.getList()
        },
        checkByname(){
            this.getList()
        }
    }
}
</script>

<style lang="less">
.manage{
    height: 90%;
    .manage-header{
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    .common-table{
        position: relative;
        height: calc(100% - 62px);
        .pager{
            position: absolute;
            bottom: 0;
            right: 20px;
        }
    }
}
</style>
