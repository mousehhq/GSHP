<template>
    <div id="data-page">
        <head-top></head-top>
        <top-nav></top-nav>
        <div class="main-container">
            <project-list ref="projectlist" v-on:setFirstId="getFirstId" @editSuccess="editSuccess"></project-list>
            <div class="nav-right view row-container">
                <div class="page-title" v-show="id">
                    {{name}}
                    <el-tooltip class="item" effect="dark" content="编辑" placement="top-start">
                        <el-button type="text" icon="el-icon-edit" class="margin-left" @click="editClick"></el-button>
                    </el-tooltip>
                    <el-tooltip class="item" effect="dark" content="删除" placement="top-start">
                        <el-button type="text" icon="el-icon-delete" class="margin-left"
                                   @click="deleteClick"></el-button>
                    </el-tooltip>
                    <el-date-picker class="datePicker"
                                    @change="dateChange"
                                    v-model="year"
                                    align="right"
                                    type="year"
                                    :clearable=false
                                    value-format="yyyy"
                                    placeholder="请选择年份">
                    </el-date-picker>
                </div>
                <div class="none-item" style="padding-top: 100px" v-show="(allDataList.length==0&&id)||!id">
                    暂无项目或者您的项目在{{year}}年没有上传参数
                </div>
                <div class="chart-container" v-show="allDataList.length!=0">
                    <!--<div>{{year}}年数据折线图</div>-->
                    <div class="season-container">
                        <div class="season-title">供暖季</div>
                        <line-chart ref="hotTgioLine" :field="'tgio'" :season="'hot'"
                                    style="margin-right: 100px"></line-chart>
                        <line-chart ref="hotTuioLine" :field="'tuio'" :season="'hot'"></line-chart>
                        <line-chart ref="hotGuLine" :field="'gu'" :season="'hot'"></line-chart>
                        <line-chart ref="hotGgLine" :field="'gg'" :season="'hot'"></line-chart>
                    </div>
                    <div class="season-container">
                        <div class="season-title">供冷季</div>
                        <line-chart ref="coldTgioLine" :field="'tgio'" :season="'cold'"></line-chart>
                        <line-chart ref="coldTuioLine" :field="'tuio'" :season="'cold'"></line-chart>
                        <line-chart ref="coldGuLine" :field="'gu'" :season="'cold'"></line-chart>
                        <line-chart ref="coldGgLine" :field="'gg'" :season="'cold'"></line-chart>
                    </div>
                </div>
            </div>

        </div>
    </div>
</template>
<script>
    import headTop from '../../Header.vue'
    import topNav from '../../TopNav.vue'
    import projectList from './ProjectList.vue'
    import lineChart from './LineChart.vue'

    export default {
        data() {
            return {
                id: '',
                project: {},
                name: '',
                year: new Date().getFullYear().toString(),
                allDataList: [],
                hotObj: {},
                coldObj: {},
                loading: {}
            }
        },
        components: {
            headTop,
            topNav,
            projectList,
            lineChart
        },
        watch: {
            '$route'(to, from) {
                this.id = this.$route.query.id;
                if (this.id) {
                    this.getDatasList();
                } else {
                    this.allDataList = [];
                    this.hotObj = {};
                    this.coldObj = {};
                }
            }
        },
        created() {
            this.id = this.$route.query.id;
            if (this.id) {
                this.getDatasList();
            } else {
                this.$router.push({path: '/data'});
            }
        },
        mounted() {


        },
        methods: {
            editSuccess(name) {
                this.getDatasList();
            },

            getFirstId(firstId) {
                if (!this.$route.query.id && firstId) {
                    this.$router.push({path: '/data', query: {id: firstId}});
                    this.getDatasList();
                }
            },

            dateChange() {
                //发送请求,刷新tableData
                this.getDatasList();
            },

            getDatasList() {
                var self = this;
                this.loading = this.$loading.service({
                    lock: true,
                    text: '拼命加载中',
                    spinner: 'el-icon-loading',
                    background: 'rgba(0, 0, 0, 0.7)',
                    fullscreen: true
                });
                let url = GSHP_SERVER_ENDPOINT + '/dataProject/getProjectsParamsByIdAndYear';

                self.$http.get(url, {
                    params: {
                        id: self.$route.query.id,
                        year: self.year
                    }
                }).then((response) => {
                    if (response.status === 200) {
                        this.name = response.data.name;
                        this.allDataList = response.data.table;
                        if (this.allDataList.length === 0) {
                            self.loading.close();
                            return;
                        }
                        console.time('getDataObj');
                        this.getDataObj(self.allDataList);
                        console.timeEnd('getDataObj');
                        this.triggerChild();
                        self.loading.close();
                    }
                });
            },

            getDataObj(data) {
                /*原始数据*/
                let self = this;
                let hotArr = [];
                let coldArr = [];

                let hotData = data.filter((item) => {
                    return item.hot;
                });
                let coldData = data.filter((item) => {
                    return !item.hot;
                });
                hotArr = this.getFullData(hotData, true);
                coldArr = this.getFullData(coldData, false);
                this.hotObj = this.getDataBar(hotArr);
                this.coldObj = this.getDataBar(coldArr);
            },

            getTimeArr(data){
                var timeArr = data.map((item) => {
                    return (new Date(item.time)).getTime();
                });
                return timeArr;
            },

            getFullData(data, isHot){
                var arrFull = [];
                var fullSpan = this.getDateSpan(isHot);
                var timeArr = this.getTimeArr(data);
                for (var i = 0; i < fullSpan.length; i++) {
                    var objItem = {};
                    var index = timeArr.indexOf(fullSpan[i]);
                    if (timeArr.indexOf(fullSpan[i]) > -1) {
                        objItem = {
                            timeTicks: fullSpan[i],
                            tui: data[index].tui,
                            tuo: data[index].tuo,
                            tgi: data[index].tgi,
                            tgo: data[index].tgo,
                            gu: data[index].gu,
                            gg: data[index].gg,
                        };
                    } else {
                        objItem = {
                            timeTicks: fullSpan[i],
                            tui: '-',
                            tuo: '-',
                            tgi: '-',
                            tgo: '-',
                            gu: '-',
                            gg: '-',
                        };
                    }
                    arrFull.push(objItem);
                }
                arrFull = arrFull.sort((a, b) => {
                    return a.timeTicks - b.timeTicks;
                });
                return arrFull;
            },

            getDataBar(data){
                let timeArr = [];
                let tuiArr = [];
                let tuoArr = [];
                let tgiArr = [];
                let tgoArr = [];
                let guArr = [];
                let ggArr = [];
                for (let item of data) {
                    timeArr.push(item['timeTicks'] ? item['timeTicks'] : '');
                    tuiArr.push(item['tui'] ? item['tui'] : '');
                    tuoArr.push(item['tuo'] ? item['tuo'] : '');
                    tgiArr.push(item['tgi'] ? item['tgi'] : '');
                    tgoArr.push(item['tgo'] ? item['tgo'] : '');
                    guArr.push(item['gu'] ? item['gu'] : '');
                    ggArr.push(item['gg'] ? item['gg'] : '');
                }
                return {
                    timeTicks: timeArr,
                    tui: tuiArr,
                    tuo: tuoArr,
                    tgi: tgiArr,
                    tgo: tgoArr,
                    gu: guArr,
                    gg: ggArr
                };
            },

            //供冷季节4/15-11/15 ，供暖季节11/15-4/15，x轴这么显示
            getDateSpan(isHot) {
                let self = this;
                let timeSpan = [];
                let startDate = new Date();
                let endDate = new Date();
                startDate = isHot ? new Date(self.year + "/11/14") : new Date(self.year + "/4/15");
                endDate = isHot ? new Date((parseInt(self.year) + 1).toString() + "/4/14") : new Date(self.year + "/11/15");
                while ((endDate.getTime() - startDate.getTime()) > 0) {
                    let temp = startDate.getTime();
                    //let temp = self.dateClone(startDate);
                    startDate.setHours(startDate.getHours() + 1);
                    timeSpan.push(temp);
                }
                return timeSpan;
            },

            triggerChild() {
                let hotTgioLine = [];
                let coldTgioLine = [];
                let hotTuioLine = [];
                let coldTuioLine = [];
                let hotGuLine = [];
                let coldGuLine = [];
                let hotGgLine = [];
                let coldGgLine = [];
                let hotTime = [];
                let coldTime = [];

                if (this.hotObj && this.hotObj.timeTicks.length > 0) {
                    hotTime = this.hotObj.timeTicks;
                    hotTgioLine[0] = this.hotObj.tgi;
                    hotTgioLine[1] = this.hotObj.tgo;
                    hotTuioLine[0] = this.hotObj.tui;
                    hotTuioLine[1] = this.hotObj.tuo;
                    hotGuLine = this.hotObj.gu;
                    hotGgLine = this.hotObj.gg;
                }
                this.$refs.hotTgioLine.getLineData(hotTgioLine, hotTime);
                this.$refs.hotTuioLine.getLineData(hotTuioLine, hotTime);
                this.$refs.hotGuLine.getLineData(hotGuLine, hotTime);
                this.$refs.hotGgLine.getLineData(hotGgLine, hotTime);

                if (this.coldObj && this.coldObj.timeTicks.length > 0) {
                    coldTime = this.coldObj.timeTicks;
                    coldTgioLine[0] = this.coldObj.tgi;
                    coldTgioLine[1] = this.coldObj.tgo;
                    coldTuioLine[0] = this.coldObj.tui;
                    coldTuioLine[1] = this.coldObj.tuo;
                    coldGuLine = this.coldObj.gu;
                    coldGgLine = this.coldObj.gg;
                }
                this.$refs.coldTgioLine.getLineData(coldTgioLine, coldTime);
                this.$refs.coldTuioLine.getLineData(coldTuioLine, coldTime);
                this.$refs.coldGuLine.getLineData(coldGuLine, coldTime);
                this.$refs.coldGgLine.getLineData(coldGgLine, coldTime);

            },

            editClick() {
                this.$refs.projectlist.projectAdd(true, this.name);
            },

            deleteClick() {
                var self = this;
                this.$confirm('此操作将永久删除该项目以及该项目的所有参数信息, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    var url = GSHP_SERVER_ENDPOINT + '/dataProject/delete?id=' + self.$route.query.id;
                    self.$http.delete(url)
                        .then(function (response) {
                            if (response.status === 200) {
                                self.$message({
                                    type: 'success',
                                    message: '删除项目"' + self.name + '"成功!'
                                });
                                self.$router.push({path: '/data'});
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

            goBack() {
                this.$router.go(-1);
            }
        }
    }
</script>
<style>
    .season-container {
        display: inline-block;
        width: 48%;
        text-align: center;
    }

    .chart-container {
        margin-top: 40px;
    }

    .season-title {
        margin-bottom: 30px;
    }

    .datePicker {
        margin-left: 50px;
        /*position: absolute;
        right: 50px;
        top: 85px;*/
    }
</style>