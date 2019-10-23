import Me from '../models/Me'

interface State {
  me?: Me
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
  setMyUserInfo: (state: State, userInfo: Me) => {
    state.me = userInfo
  }
}

export const actions = {
  fetchMyUserInfo({ commit }) {
    try {
      // TODO: APIからとってくる
      const res: Me = {
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
