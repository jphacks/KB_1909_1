import { instance } from '../common'
import Post from '../../../models/Post'

const getPosts = async (
  params: GetPostsRequest
): Promise<GetPostsResponse | void> => {
  const res = await instance.get('/posts', {
    params
  })
  if (res.status === 200) {
    return res.data as GetPostsResponse
  } else {
    // TODO: エラーハンドリング
    console.log(res.data)
  }
}

export interface GetPostsResponse {
  posts: Post[]
}

interface GetPostsRequest {
  longitude: number
  latitude: number
}

export default getPosts
