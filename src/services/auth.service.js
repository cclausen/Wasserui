import axios from 'axios'
import { AUTH_URL } from '@/common/config'

class AuthService {
  login (user) {
    return axios
      .post(AUTH_URL + 'signin', {
        username: user.username,
        password: user.password
      })
      .then(response => {
        if (response.data.accessToken) {
          localStorage.setItem('user', JSON.stringify(response.data))
        }

        return response.data
      })
  }

  logout () {
    localStorage.removeItem('user')
  }

  register (user) {
    return axios.post(AUTH_URL + 'signup', {
      username: user.username,
      email: user.email,
      password: user.password
    })
  }
}

export default new AuthService()
