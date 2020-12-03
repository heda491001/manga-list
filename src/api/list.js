import Api from '@/api/api'

export default {
  getRecordsList (cb) {
    Api.instance().get('/RecordsList', '{}').then(Response => (cb(Response.data.body)))
  },
  putRecordList (cb, data) {
    Api.instance().put('/RecordsList', data).then(Response => (cb(Response.data.body)))
  },
  deleteRecord (cb, data) {
    Api.instance().delete('/RecordsList ', {'data': data}).then(Response => (cb(Response.data.body)))
  }
}
