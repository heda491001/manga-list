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
      console.log('commit set Records')
    })
  },
  putRecords ({ commit }, record) {
    console.log('action put')
    list.putRecordList(msg => {
      commit('insertRecords', record)
      window.alert(msg)
    }, record)
  }
}

// mutations
const mutations = {
  setRecords (state, records) {
    state.all = records
  },
  insertRecords (state, record) {
    state.all.put(record)
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
