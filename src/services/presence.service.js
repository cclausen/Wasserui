import axios from 'axios'
import { API_URL } from '@/common/config'
import { authHeader } from '@/common/auth-header'
import qs from 'qs'


class PresenceService {
  start (personId, placeId) {
    const URL = API_URL + 'presences'
    return axios
      .post(URL + '/start', qs.stringify({ personId: personId, placeId: placeId }), { headers: authHeader() })
      .then(response => {
        return response.data
      })
  }

  stopById (presenceId) {
    return axios
      .post(URL + '/stopById', { presenceId }, { headers: authHeader() })
      .then(response => {
        return response.data
      })
  }

  stop (personId, placeId) {
    return axios
      .post(URL + '/stop', { personId, placeId }, { headers: authHeader() })
      .then(response => {
        return response.data
      })
  }

  allByPerson (personId) {
    return axios
      .get(URL + '/' + personId, { headers: authHeader() })
      .then(response => {
        return response.data
      })
  }
}

export default new PresenceService()
