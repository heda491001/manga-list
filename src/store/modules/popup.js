const state = () => ({
  showEdit: false
})

// getters
// const getters = {}

// mutations
const mutations = {
  setShowEdit (state, showEdit) {
    state.showEdit = showEdit
  }
}

export default {
  namespaced: true,
  state,
  // getters,
  mutations
}
