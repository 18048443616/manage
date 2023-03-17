export default{
    state: {
      isCollapse: false
    },
    getters: {
    },
    mutations: {
      changeCollapse(state){
        state.isCollapse = !state.isCollapse
        console.log(state.isCollapse);
      }
    },
    actions: {
    },
    modules: {
    }
  }