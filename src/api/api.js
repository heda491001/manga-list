// import store from '@/store'
import axios from 'axios'

export default {
  instance () {
    var api = axios.create({
      baseURL: 'https://c1vdx9kkf4.execute-api.ap-northeast-1.amazonaws.com/dev',
      // withCredentials: true,
      // 'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token'
      // headers: {
      //   'Access-Control-Allow-Origin': '*',
      //   'Content-Type': 'application/x-www-form-urlencoded'
      // },
      timeout: 60000
    })
    return api
  }
}
