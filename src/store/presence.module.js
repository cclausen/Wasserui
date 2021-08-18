import PresenceService from '@/services/presence.service'

const initialState = { presences: [] }

export const presence = {
  namespaced: true,
  state: initialState,
  actions: {
    start ({ commit }, { personId, placeId }) {
      return PresenceService.start(personId, placeId).then(
        response => {
          commit('addPresence', response)
          return Promise.resolve(response)
        },
        error => {
          return Promise.reject(error)
        }
      )
    }
  },
  mutations: {
    addPresence (state, presence) {
      state.presences.push(presence)
    }
  },
  getters: {
    getAllPresences (state, getters) {
      return state.presences
    }
  }
}
