// Import Vue
import Vue from 'vue'
import Vuex from 'vuex'
import records from './modules/records'
import formData from './modules/formData'

// Vuexの利用宣言
Vue.use(Vuex)

/*
  Store Regstration
  ストアにモジュールを登録
*/
export default new Vuex.Store({
  strict: true,
  modules: {
    records,
    formData
  }
})
