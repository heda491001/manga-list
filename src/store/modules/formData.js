const state = () => ({
  selectRow: null,
  showEdit: false,
  formData: null
})

// getters
// const getters = {}

// mutations
const mutations = {
  setSelectRow (state, selectRow) {
    state.selectRow = selectRow
  },
  setShowEdit (state, showEdit) {
    state.showEdit = showEdit
  },
  setFormData (state, formData) {
    state.formData = formData
  }
}

export default {
  namespaced: true,
  state,
  // getters,
  mutations
}
