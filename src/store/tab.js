export default{
    state: {
      isCollapse: false,
      tabsList:[
        {
          path: '/',
          name: 'home',
          label: '首页',
          icon: 's-home',
          url: 'Home/Home'
        }
      ]
    },
    getters: {
    },
    mutations: {
      changeCollapse(state){
        state.isCollapse = !state.isCollapse
      },
      addMenu(state,val){
        if(val.name !== 'home'){
          let index = state.tabsList.findIndex(item=>item.path == val.path)
          if(index==-1){
            state.tabsList.push(val)
          }
        }
      },
      deleteMenu(state,val){
        const index = state.tabsList.findIndex(item=>item.name==val.name)
        state.tabsList.splice(index,1)
      }
    },
    actions: {
    },
    modules: {
    }
  }