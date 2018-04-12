/**
 * Created by haoqianhuang on 2018/3/22.
 */

const state = {
    allDataObj: {},
};

const mutations = {
    initDataState(state, data){
        state.allDataObj = data;
        console.dir(state)
    },

    addProject(state, data){

    },
    editProject(state, data){

    },
};

const actions = {
    initDataState({commit}, data){
        commit('initDataState', data);
    },
    addProject({commit}, data){
        commit('addProject', data);
    },
    editProject({commit}, data){
        commit('editProject', data);
    }
};

export default {
    // JSON.parse方法将一个字符串解析成一个JSON对象
    state,
    mutations,
    actions
};