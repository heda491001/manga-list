import Api from '@/api/api'

export default {
  getRecordsList (cb, data) {
    const url = '/RecordsList?title=' + data.title + '&author=' + data.author
    Api.instance().get(url, data).then(Response => (cb(Response.data.body)))
  },
  putRecordList (cb, data) {
    Api.instance().put('/RecordsList', data).then(Response => (cb(Response.data.body)))
  },
  deleteRecord (cb, data) {
    Api.instance().delete('/RecordsList ', {'data': data}).then(Response => (cb(Response.data.body)))
  }
}
