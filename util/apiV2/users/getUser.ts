import { instance } from '../common'

const getUser = async (token: string): Promise<GetUserResponse | void> => {
  const res = await instance.get('/me', {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })

  if (res.status === 200) {
    return res.data as GetUserResponse
  } else {
    console.log(res.data)
  }
}

export interface GetUserResponse {
  id: number
  name: string
  email: string
  token: string
  image: string
}

export default getUser
