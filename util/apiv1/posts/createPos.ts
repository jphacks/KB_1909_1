import { instance } from '../common'

const createPosts = async (
  body: CreatePostsRequest
): Promise<CreatePostsResponse | void> => {
  const res = await instance.post('/posts', body)

  if (res.status == 200) {
    return res.data as CreatePostsResponse
  } else {
    // TODO: エラーハンドリング
    console.log(res.data)
  }
}

interface CreatePostsRequest {
  longitude: number
  latitude: number
  url: string
  body: string
}

interface CreatePostsResponse {
  body: string
  url: string
  // eslint-disable-next-line camelcase
  created_at: number
}

export default createPosts
