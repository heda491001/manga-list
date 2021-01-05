import list from '../../api/list'

// initial state
const state = () => ({
  all: []
})

// getters
const getters = {}

// actions
const actions = {
  getAllRecords ({ commit }, params) {
    list.getRecordsList(records => {
      commit('setRecords', records)
    }, params)
  },
  putRecords ({ commit }, record) {
    console.log('action put')
    list.putRecordList(msg => {
      console.log(msg)
    }, record)
    commit('insertRecords', record)
  },
  removeRecord ({commit}, record) {
    console.log('action remove')
    list.deleteRecord(
      msg => {
        console.log(msg)
      }, record)
    commit('removeRecord', record)
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
  },
  removeRecord (state, record) {
    console.log('mutation remove')
    var index = state.all.indexOf(record)
    if (index > -1) {
      state.all.splice(index, 1)
    } else {
      console.log('data not found')
    }
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
