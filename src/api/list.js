import Api from '@/api/api'

export default {
  getRecordsList (cb) {
    Api.instance().get('/getRecordsList', '{}').then(Response => (cb(Response.data.body)))
  },
  putRecordList (cb, data) {
    Api.instance().put('/putRecordsList', data).then(Response => (cb(Response.data.body)))
  }
}
