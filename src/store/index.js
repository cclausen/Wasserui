import axios from 'axios'
import Vuex from 'vuex'
import Vue from 'vue'
import { API_URL } from '@/common/config'
import { auth } from './auth.module'
import { person } from './person.module'
import router from '@/routes/router'

//load Vuex
Vue.use(Vuex)

//to handle state
const state = {
  persons: [],
  login: false
}

//to handle state
const getters = {
  allPersons: (store) => store.persons
}

//to handle actions
const actions = {
  getPersons ({ commit }) {
    axios.get(API_URL + '/persons')
      .then(response => {
        commit('SET_PERSONS', response.data)
      })
  },
  addPerson ({ commit }) {
    axios.post(API_URL + '/persons')
      .then(response => {
        commit('ADD_PERSON', response.data)
      })
  },
  login ({ commit }, { username, password }) {
    commit('loginRequest', { username })

    UserService.login(username, password)
      .then(
        user => {
          commit('loginSuccess', user)
          router.push('/')
        },
        error => {
          commit('loginFailure', error)
          // dispatch('alert/error', error, { root: true })
        }
      )
  },
  logout ({ commit }) {
    UserService.logout()
    commit('logout')
  }
}

//to handle mutations
const mutations = {
  SET_PERSONS (store, persons) {
    store.persons = persons
  },
  ADD_PERSON (store, person) {
    store.persons = store.persons.concat([person])
  },
  loginRequest (store, user) {
    store.status = { loggingIn: true }
    store.user = user
  },
  loginSuccess (store, user) {
    store.status = { loggedIn: true }
    store.user = user
  },
  loginFailure (store) {
    store.status = {}
    store.user = null
  },
  logout (store) {
    store.status = {}
    store.user = null
  }
}

//export store module
export default new Vuex.Store({
  modules: {
    auth,
    person,
    state,
    getters,
    actions,
    mutations
  }
})
