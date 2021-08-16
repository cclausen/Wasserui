import axios from 'axios'
import { API_URL } from '@/common/config'
import { authHeader } from '@/common/auth-header'


class PersonService {
  getAll () {
    return axios
      .get(API_URL + 'persons', { headers: authHeader() })
      .then(response => {
        return response.data
      })
  }
}

export default new PersonService()
