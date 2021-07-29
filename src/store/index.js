import axios from 'axios'
import Vuex from 'vuex'
import Vue from 'vue'

//load Vuex
Vue.use(Vuex);

//to handle state
const state = {
  persons: []
}

//to handle state
const getters = {
  allPersons: (state) => state.persons
}

//to handle actions
const actions = {
  getPersons({commit}) {
    axios.get('http://localhost:8081/persons')
      .then(response => {
        commit('SET_PERSONS', response.data)
      })
  },
  addPerson({commit}) {
    axios.post('http://localhost:8081/persons')
      .then(response => {
        commit('ADD_PERSON', response.data)
      })
  }
}

//to handle mutations
const mutations = {
  SET_PERSONS(state, persons) {
    state.persons = persons
  },
  ADD_PERSON(state, person) {
    state.persons = state.persons.concat([person])
  }
}

//export store module
export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations
})
