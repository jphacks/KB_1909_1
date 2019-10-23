import User from '../models/User'

interface State {
  me?: User
}

export const state = (): State => ({
  me: null
})

export const getters = {
  isLoggedIn(state: State): boolean {
    return !!state.me
  }
}

export const mutations = {
  setMyUserInfo: (state: State, userInfo: User) => {
    state.me = userInfo
  }
}

export const actions = {
  fetchMyUserInfo({ commit }) {
    try {
      // TODO: APIからとってくる
      const res: User = {
        id: 0,
        name: 'face',
        email: 'hoge@hoge',
        imageUrl: 'image url'
      }
      commit('setMyUserInfo', res)
    } catch (e) {
      console.error(e)
      commit('setMyUserInfo', null)
    }
  }
}
