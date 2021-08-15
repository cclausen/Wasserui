import axios from 'axios'
import { API_URL } from '@/common/config'

class PersonService {
  getAll () {
    return axios
      .get(API_URL + 'persons')
      .then(response => {
        return response.data
      })
  }
}

export default new PersonService()
