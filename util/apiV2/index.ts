import getPosts from './posts/getPosts'
import createPost from './posts/createPost'
import createUser from './users/createUser'
import getUser from './users/getUser'
import login from './users/login'
import getUsersId from './users/getUsersId'

const ApiV2 = {
  posts: {
    getPosts,
    createPost
  },
  users: {
    createUser,
    getUser,
    login,
    getUsersId
  }
}

export default ApiV2
