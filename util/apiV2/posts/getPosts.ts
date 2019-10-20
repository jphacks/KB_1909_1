import { instance } from '../common'
import Post from '../../../models/Post'

const getPosts = async (
  params: GetPostsRequest,
  token: string
): Promise<Post[] | void> => {
  const res = await instance.get('/posts', {
    params,
    headers: {
      Authorization: `Bearer ${token}`
    }
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
  delta: number
}

export default getPosts
