import Post from '../models/Post'

interface State {
  myPosts?: Post[]
}

export const state = () => ({
  myPosts: []
})

export const mutations = {
  addPosts: (state: State, posts: Post[]) => {
    state.myPosts.concat(posts)
  }
}

export const actions = {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  fetchMyPosts({ commit }, page) {
    try {
      // TODO: APIからとってくる
      const res: Post[] = []
      commit('addPosts', res)
    } catch (e) {
      console.error(e)
    }
  }
}
