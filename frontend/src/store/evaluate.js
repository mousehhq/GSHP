/**
 * Created by haoqianhuang on 2018/1/10.
 */
const state = {
    allEigenList: [],
    allDeltaEERList: [],
};

const mutations = {
    initEvaluateState(state, data){
        state.allEigenList = data.allEigenList;
        state.allDeltaEERList = data.allDeltaEERList;
    },
    /*initAllEigenList(state, data){
        state.allEigenList = data;
    },*/

    addProject(state, data){

    },
    editProject(state, data){

    },
};

const actions = {
    initEvaluateState({commit}, data){
        commit('initEvaluateState', data);
    },
    /*initAllEigenList({commit}, data){
        commit('initAllEigenList', data);
    },
    initEigenBarObj({commit}, data){
        commit('initEigenBarObj', data);
    },*/
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