import axios from 'axios'
import authHeader from './auth-header'
import API_URL from '@/common/config'

const URL = API_URL + '/users/'

class UserService {
  getAllUsers () {
    return axios.get(URL, { headers: authHeader() })
  }
}

export default new UserService()
