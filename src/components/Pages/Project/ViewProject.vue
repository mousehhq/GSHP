<template>
    <div id="view-project">
        <head-top></head-top>
        <top-nav></top-nav>
        <div class="main-container">
            <project-list ref="projectlist"  @editSuccess="editSuccess"></project-list>
            <div class="nav-right view row-container">
                <div class="page-title" v-show="id">
                    查看{{project.name}}
                    <el-tooltip class="item" effect="dark" content="编辑" placement="top-start">
                        <el-button type="text" icon="el-icon-edit" class="margin-left" @click="editClick"></el-button>
                    </el-tooltip>
                    <el-tooltip class="item" effect="dark" content="删除" placement="top-start">
                        <el-button type="text" icon="el-icon-delete" class="margin-left"
                                   @click="deleteClick"></el-button>
                    </el-tooltip>
                </div>
                <div class="margin-top" v-show="id">
                    <!--<div class="margin-bottom"><span class="ieds-dot"></span>基本信息</div>-->
                    <el-row>
                        <el-col :span="2">项目名称:</el-col>
                        <el-col :span="6">{{project.name ? project.name : '&nbsp'}}</el-col>
                        <el-col :span="2">项目地点:</el-col>
                        <el-col :span="6">{{project.location ? project.location : '&nbsp'}}</el-col>
                        <el-col :span="2">投入时间:</el-col>
                        <el-col :span="6">{{project.beginTime | dateFormatterFilter }}</el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="2">建筑面积:</el-col>
                        <el-col :span="6">{{project.area}}<span v-if="project.area">m<sup>2</sup></span></el-col>
                        <el-col :span="2">建筑类型:</el-col>
                        <el-col :span="6">{{project.type}}</el-col>
                    </el-row>

                    <div class="margin-bottom margin-top"><span class="ieds-dot"></span>参数表</div>

                    <el-table
                            :data="tableData"
                            stripe>
                        <el-table-column
                                prop="hot"
                                label="冷暖季节"
                                fixed
                                :filters="[{ text: '供暖季', value: true }, { text: '供冷季', value: false }]"
                                :filter-method="filterTag"
                                filter-placement="bottom-end">
                            <template slot-scope="scope">
                                <el-tag :type="scope.row.hot? 'primary' : 'success'"
                                        close-transition>{{scope.row.hot ? '供暖季' : '供冷季'}}
                                </el-tag>
                            </template>
                        </el-table-column>
                        <el-table-column
                                prop="tui"
                                min-width="120px"
                                label="用户侧供水温度tui">
                        </el-table-column>
                        <el-table-column
                                prop="tuo"
                                min-width="124px"
                                label="用户侧回水温度tuo">
                        </el-table-column>
                        <el-table-column
                                prop="tgi"
                                min-width="120px"
                                label="地源侧供水温差tgi">
                        </el-table-column>

                        <el-table-column
                                prop="tgo"
                                min-width="125px"
                                label="地源侧回水温度tgo">
                        </el-table-column>

                        <el-table-column
                                prop="gu"
                                min-width="110px"
                                label="用户侧流量Gu">
                        </el-table-column>

                        <el-table-column
                                prop="gg"
                                min-width="110px"
                                label="地源侧流量Gg">
                        </el-table-column>
                        <el-table-column
                                prop="p"
                                min-width="110px"
                                label="p">
                        </el-table-column>
                        <el-table-column
                                prop="pl"
                                min-width="110px"
                                label="机组总耗电P1">
                        </el-table-column>
                        <el-table-column
                                prop="pu"
                                min-width="133px"
                                label="用户侧水泵总耗电Pu">
                        </el-table-column>
                        <el-table-column
                                prop="pg"
                                min-width="135px"
                                label="地源侧水泵总耗电Pg">
                        </el-table-column>
                        <!--<el-table-column-->
                        <!--label="冷暖季节"-->
                        <!--:filters="[{ text: '供暖季', value: true }, { text: '供冷季', value: false }]"-->
                        <!--:filter-method="filterTag"-->
                        <!--filter-placement="bottom-end">-->
                        <!--<template slot-scope="scope">{{ scope.row.hot ? '供暖季' : '供冷季' }}</template>-->
                        <!--</el-table-column>-->

                        <el-table-column
                                label="时间">
                            <template slot-scope="scope">{{ scope.row.time | yearFormatterFilter }}</template>
                        </el-table-column>
                    </el-table>

                    <!-- <div class="margin-bottom"><span class="ieds-dot"></span>特征值</div>

                     <el-table
                             :data="tableData"
                             stripe
                             style="width: 100%">
                         <el-table-column
                                 prop="time"
                                 label="时间"
                                 width="180">
                         </el-table-column>
                         <el-table-column
                                 prop="tgo"
                                 :render-header="renderHeader1"
                                 width="180">
                         </el-table-column>
                         <el-table-column
                                 prop="tg"
                                 :render-header="renderHeader2">
                         </el-table-column>
                         <el-table-column
                                 prop="a"
                                 label="α">
                         </el-table-column>
                         <el-table-column
                                 prop="n"
                                 label="η">
                         </el-table-column>

                         <el-table-column
                                 prop="cop"
                                 label="COP">
                         </el-table-column>
                         <el-table-column
                                 prop="eer"
                                 label="EER">
                         </el-table-column>
                     </el-table>-->

                    <el-pagination v-if="totalCnt!=0"
                                   @size-change="handleSizeChange"
                                   @current-change="handleCurrentChange"
                                   :current-page="currentPage"
                                   :page-sizes="[2, 5,10, 50]"
                                   :page-size="pageSize"
                                   layout="total, sizes, prev, pager, next, jumper"
                                   :total="totalCnt">
                    </el-pagination>

                </div>


            </div>
        </div>
    </div>
</template>
<script>
    import headTop from '../../Header.vue'
    import footerBottom from '../../Footer.vue'
    import topNav from '../../TopNav.vue'
    import projectList from './ProjectList.vue'

    export default {
        data() {
            return {
                id: '',
                project: {},
                tableData: [],
                allEigenvalues: [],
                currentPage: 1,
                pageSize: 10,//每页多少行
                totalCnt: 0,
            }
        },
        components: {
            headTop,
            footerBottom,
            topNav,
            projectList
        },
        watch: {      
            '$route'(to, from){
                this.id = this.$route.query.id;
                if(this.id){
                    this.getItem();
                }else{
                    this.project = {};
                }      
            }
        },

        created() {
            this.id = this.$route.query.id;
            if (this.id) {
                this.getItem();
            } else {
                this.$router.push({path: '/projects'});
            }
        },
        methods: {
            editSuccess(name){
                this.getItem();
            },
            getItem(url){
                var self = this;
                var url = GSHP_SERVER_ENDPOINT + '/project/projectAllParams';
                var model = {id: this.$route.query.id};

                self.$http.get(url, {params: model})
                    .then(function (response) {
                        if (response.status === 200) {
                            self.successCallback(response.data);
                        }
                    })
                    .catch(function (error) {

                    });
            },

            successCallback(data){
                var data = data;

                var obj = {
                    id: data.id,
                    name: data.project_name,
                    location: data.position,
                    area: data.area,
                    type: data.type,
                    beginTime: data.begin_time,
                    paramvalues: data.table
                };
                this.project = obj;
                this.totalCnt = data.table.length;
                this.handleCurrentChange(1);
            },

            renderHeader1(createElement, {column, $index}) {
                return createElement(
                    'span',
                    {
                        'class': ''
                    },
                    ['t',
                        createElement('sub', {
                                attrs: {type: 'text'},

                            }, ['g,o']
                        )
                    ]
                );
            },

            renderHeader2(createElement, {column, $index}) {
                return createElement(
                    'span',
                    {
                        'class': ''
                    },
                    ['∆t',
                        createElement('sub', {
                                attrs: {type: 'text'},

                            }, ['g']
                        )
                    ]
                );
            },

            handleSizeChange(val) {
                this.pageSize = val;
                this.handleCurrentChange(1);
            },

            handleCurrentChange(val) {
                this.currentPage = val;
                this.tableData = this.project.paramvalues.slice((this.currentPage - 1) * this.pageSize, this.currentPage * this.pageSize);
            },

            editClick(){
                this.$refs.projectlist.projectAdd(true);
//                this.$router.push({path: '/projects/edit', query: {id: this.$route.query.id}});
            },

            deleteClick() {
                var self = this;
                this.$confirm('此操作将永久删除该项目以及该项目的所有信息, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    var url = GSHP_SERVER_ENDPOINT + '/projects?id=' + self.$route.query.id;
                    self.$http.delete(url)
                        .then(function (response) {
                            console.log(response);
                            if (response.status === 200) {
                                self.$message({
                                    type: 'success',
                                    message: '删除项目"' + self.project.name + '"成功!'
                                });
                                self.$router.push({path: '/projects'});
                            }
                        })
                        .catch(function (error) {
                            self.$message({
                                type: 'error',
                                message: '删除失败!'
                            });
                        });
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            },

            filterTag(value, row) {
                return row.hot === value;
            },

            seasonChange(){
            },

            goBack(){
                this.$router.go(-1);
            },
        }
    }
</script>
<style>
    .ieds-dot {
        display: inline-block;
        height: 8px;
        width: 8px;
        border-radius: 4px;
        background-color: #409EFF;
        margin-right: 15px;
    }

    #view-project .el-row {
        /*margin-left: 28px;*/
    }

    #view-project .edit-btn {
        margin-left: 20px;
    }

    /*.page-bottom-btn{
        float: right;
        margin-top: 20px;
    }*/
</style>