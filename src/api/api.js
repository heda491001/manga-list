// import store from '@/store'
import axios from 'axios'

export default {
  instance () {
    var api = axios.create({
      baseURL: 'https://w6iy4rqrfk.execute-api.ap-northeast-1.amazonaws.com/dev',
      // withCredentials: true,
      // 'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token'
      headers: {
        'Accept': '*/*',
        'Content-Type': 'application/json'
      },
      timeout: 60000
    })
    return api
  }
}
