/**
 * Created by haoqianhuang on 2018/1/9.
 */
function makeAction(type) {
    return ({dispatch}, ...args) => dispatch(type, ...args);
}

const initData = {
    allEigenValueList: [],
    allDeltaEER: []
};

export const init = ({dispatch}) => {
    dispatch('init', initData);
};

export const editProject = makeAction('editProject');

// 添加一个note对象
export const addProject = makeAction('addProject');