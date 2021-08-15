import PersonService from '@/services/person.service'

const initialState = { persons: [] }

export const person = {
  namespaced: true,
  state: initialState,
  actions: {
    getAllPersons ({ commit }) {
      return PersonService.getAll().then(
        response => {
          commit('allPersons', response)
          return Promise.resolve(response)
        },
        error => {
          return Promise.reject(error)
        }
      )
    }
  },
  mutations: {
    allPersons (state, persons) {
      state.persons = persons
    }
  },
  getters: {
    getAllPersons (state, getters) {
      return state.persons
    }
  }
}
