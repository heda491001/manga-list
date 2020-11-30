import list from '../../api/list'

// initial state
const state = () => ({
  all: []
})

// getters
const getters = {}

// actions
const actions = {
  getAllRecords ({ commit }) {
    list.getRecordsList(records => {
      commit('setRecords', records)
    })
  },
  putRecords ({ commit }, record) {
    console.log('action put')
    list.putRecordList(msg => {
      commit('insertRecords', record)
    }, record)
  }
}

// mutations
const mutations = {
  setRecords (state, records) {
    state.all = records
  },
  insertRecords (state, record) {
    state.all.push(record)
    console.log('mutations put')
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
