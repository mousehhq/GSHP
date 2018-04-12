<template>
    <div id="projects">
        <head-top></head-top>
        <top-nav></top-nav>
        <div class="main-container">
            <project-list></project-list>
            <div class="nav-right view row-container">
                <div class="page-title">
                   后评估
                </div>
                <charts></charts>
            </div>
        </div>
    </div>
</template>

<script>
    import headTop from '../../Header.vue'
    import topNav from '../../TopNav.vue'
    import projectList from './ProjectList.vue'
    import charts from './Charts.vue'
    export default {
        data() {
            return {
            }
        },
        components: {
            headTop,
            topNav,
            projectList,
            charts
        },
    }
</script>
<style>

</style>