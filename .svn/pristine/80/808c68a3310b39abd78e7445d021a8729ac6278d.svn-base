<template>
    <div id="login-page" class="login-wrapper">
        <img class="lg-backgroud" src="../../../assets/images/loginBac.jpeg" width="100%" height="100%"/>
        <el-card class="box-card-login">
            <el-form :model="form" :rules="rules" ref="loginForm">
                <el-form-item>
                    <!--<img class="login-logo" src="../../../assets/images/schoolLogo.jpg" height="68" width="106"/>-->
                    <div class="login-title">基于实测数据的绿色建筑地源热泵 </div>
                    <div class="login-title"> 运行效果后评估研究</div>
                </el-form-item>
                <el-form-item prop="name">
                    <el-input v-model.trim="form.name" placeholder="请输入用户名"></el-input>
                </el-form-item>

                <el-form-item prop="password">
                    <el-input type="password" v-model="form.password" auto-complete="off" placeholder="请输入密码"
                              @keyup.enter.native="onSubmit('loginForm')"></el-input>
                </el-form-item>
                <el-form-item style="margin-bottom: 8px">
                    <el-button class="login-button" type="primary" @click="onSubmit('loginForm')">登录</el-button>
                </el-form-item>
            </el-form>
        </el-card>
    </div>
</template>
<script>

    export default{
        data(){
            return {
                form: {
                    name: '',
                    password: '',
                    rememberme: false
                },
                rules: {
                    name: [
                        {required: true, message: '请输入用户名', trigger: 'blur'},
                    ],
                    password: [
                        {required: true, message: '请输入密码', trigger: 'blur'},
                    ]
                },
            }
        },
        methods: {
            onSubmit(formName) {
                let self = this;
                self.$refs[formName].validate((isPass) => {
                    if (isPass) {
                        let model = {
                            username: self.form.name,
                            password: self.form.password,
                            rememberme: false //self.form.rememberme
                        };
                        let url = GSHP_SERVER_ENDPOINT + '/login';
                        self.$http.post(url, model).then((response) => {
                            self.$store.dispatch('logIn', model);
                            self.$router.push((self.$route.query && self.$route.query.redirect) ? self.$route.query.redirect : '/Home');
                        }, (err) => {
                            console.log(err);
                            self.$alert('用户名或密码错误，请重新输入', '提示', {
                                confirmButtonText: '确定',
                            });
                        });

                    } else {
                        console.log('validate error');
                        return false;
                    }
                });
            }

        }

    }
</script>
<style>
    .login-wrapper {
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        text-align: center;
    }

    .lg-backgroud {
        position: absolute;
        top: 0;
        left: 0;
    }

    .box-card-login {
        border-radius: 20px;
        height: 350px;
        width: 380px;
    }

    .login-button {
        width: 100%;
    }

    .login-title {
        font-size: 22px;
    }
</style>
