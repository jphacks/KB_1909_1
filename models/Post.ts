interface Post {
  id: number
  body: string
  url?: string
  distance: number
  // eslint-disable-next-line camelcase
  created_at: string
  latitude: string
  longitude: string
  // eslint-disable-next-line camelcase
  user_id: string
  good: number
}

export default Post
