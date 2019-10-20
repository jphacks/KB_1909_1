import getPosts from './posts/getPosts'
import createPost from './posts/createPost'
import createUser from './users/createUser'

const ApiV2 = {
  posts: {
    getPosts,
    createPost
  },
  users: {
    createUser
  }
}

export default ApiV2
