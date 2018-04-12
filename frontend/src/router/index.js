import Vue from 'vue'
import VueRouter from 'vue-router'

const Login = () => import('@/components/Pages/Login/Login.vue')
const Home = () => import('@/components/Pages/Project/Home.vue')
const Projects = () => import('@/components/Pages/Project/Projects.vue')
const ViewProject = () => import('@/components/Pages/Project/ViewProject.vue')
const AddProject = () => import('@/components/Pages/Project/AddProject.vue')
const EvaluateProject = () => import('@/components/Pages/Project/EvaluateProject.vue')
const DataPage = () => import('@/components/Pages/Data/DataPage.vue')

// import Login from '@/components/Pages/Login/Login.vue'
// import Home from '@/components/Pages/Project/Home.vue'
// import Projects from '@/components/Pages/Project/Projects.vue'
// import ViewProject from '@/components/Pages/Project/ViewProject.vue'
// import AddProject from '@/components/Pages/Project/AddProject.vue'
// import EvaluateProject from '@/components/Pages/Project/EvaluateProject.vue'

Vue.use(VueRouter)

const router = new VueRouter({
    // mode: 'history',
    base: __dirname,
    routes: [
        {
            path: '/',
            redirect: '/login',
            // meta: { keepAlive: true }
        },
        {
            path: '/login',
            name: 'Login',
            component: Login
        },
        {
            path: '/home',
            name: 'Home',
            component: Home
        },
        {
            path: '/projects',
            name: 'Projects',
            component: Projects
        },
        {
            path: '/projects/view',
            name: 'ViewProject',
            component: ViewProject
        },
        {
            path: '/projects/add',
            name: 'AddProject',
            component: AddProject
        },
        {
            path: '/projects/evaluate',
            name: 'EvaluateProject',
            component: EvaluateProject
        },
        {
            path: '/data',
            name: 'DataPage',
            component: DataPage
        }
    ]
});

export default router
