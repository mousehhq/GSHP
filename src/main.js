// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store/store';
import axios from 'axios'
import moment from 'moment'
import 'element-ui/lib/theme-chalk/index.css'
import './components/Pages/common.css'
import './appconfig'

import {
    Dropdown,
    DropdownMenu,
    DropdownItem,
    Menu,
    MenuItem,
    Card,
    Form,
    FormItem,
    Row,
    Col,
    Upload,
    Button,
    Table,
    Pagination,
    Radio,
    RadioGroup,
    TabPane,
    Tabs,
    Input,
    Dialog,
    TableColumn,
    DatePicker,
    Tag,
    Tooltip,
    Message,
    MessageBox,
    Loading
} from 'element-ui'

Vue.prototype.$ELEMENT = {size: 'small'};

Vue.use(Dropdown);
Vue.use(DropdownItem);
Vue.use(DropdownMenu);
Vue.use(Menu);
Vue.use(MenuItem);
Vue.use(Card);
Vue.use(Form);
Vue.use(FormItem);
Vue.use(Row);
Vue.use(Col);
Vue.use(Upload);
Vue.use(Button);
Vue.use(Table);
Vue.use(Pagination);
Vue.use(Radio);
Vue.use(RadioGroup);
Vue.use(TabPane);
Vue.use(Tabs);
Vue.use(Input);
Vue.use(Dialog);
Vue.use(TableColumn);
Vue.use(DatePicker);
Vue.use(Tag);
Vue.use(Tooltip);
Vue.use(Loading);
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$message = Message;
Vue.prototype.$alert = MessageBox.alert;
Vue.prototype.$confirm = MessageBox.confirm;
Vue.prototype.$loading = Loading;

Vue.prototype.$http = axios;
Vue.config.devtools = true;
Vue.config.productionTip = false;

axios.defaults.withCredentials = true;   //允许请求带cookie
axios.interceptors.response.use(function (response) {
    return response;
}, function (err) {
    // Do something with response error
    switch (err.response.status) {
        case 401:
            if (err.response.data.type === 'request') {
                // err.msg = '会话过期，请重新登录！';
                store.dispatch('logOut');
            }
            break;
        case 500:
            err.msg = '服务器内部错误';
            break;
        default:
    }
    if (err.msg) {
        MessageBox.alert(err.msg, '提示', {
            confirmButtonText: '确定',
        })
    }
    throw err;
});

Vue.filter('dateFormatterFilter', function (value) {

    if (value === undefined || value === '' || isNaN(value)) {
        return "";
    }
    return moment(parseInt(value)).format("YYYY-MM-DD");
});

Vue.filter('yearFormatterFilter', function (value) {

    if (value === undefined || value === '' || isNaN(value)) {
        return "";
    }
    return moment(parseInt(value)).format("YYYY");
});

router.beforeEach((to, from, next) => {
    if (sessionStorage.getItem('user')) {  // 通过vuex state获取当前的token是否存在
        if (to.path.toLowerCase() === '/login') {  // 判断该路由是否需要登录权限
            next({
                path: to.query && to.query.redirect ? to.query.redirect : '/home'
            });
        } else {
            next();
        }
    }
    else {
        if (to.path.toLowerCase() === '/login') {
            next();
        } else {
            MessageBox.alert('您没有登录或者登录已过期，请重新登录', '提示', {
                confirmButtonText: '确定',
                callback: action => {
                    next({
                        path: '/login',
                        query: {redirect: to.fullPath}  // 将跳转的路由path作为参数，登录成功后跳转到该路由
                    });
                }
            });
        }
    }
});

new Vue({
    el: '#app',
    store,
    router,
    template: '<App/>',
    render: h => h(App),
    components: {App}
});

