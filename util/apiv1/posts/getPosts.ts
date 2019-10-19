import { instance } from '../common'
import Post from '../../../models/Post'

const getPosts = async (params: GetPostsRequest): Promise<Post[] | void> => {
  const res = await instance.get('/posts', {
    params
  })
  if (res.status === 200) {
    return res.data as Post[]
  } else {
    // TODO: エラーハンドリング
    console.log(res.data)
  }
}

interface GetPostsRequest {
  longitude: number
  latitude: number
}

export default getPosts
