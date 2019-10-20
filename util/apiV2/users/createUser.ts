import { instance } from '../common'

const createUser = async (
  body: CreateUserRequest
): Promise<CreateUserResponse | void> => {
  const res = await instance.post('/users', body)

  if (res.status === 201) {
    return res.data as CreateUserResponse
  } else {
    console.log(res.data)
  }
}

export interface CreateUserRequest {
  name: string
  email: string
  password: string
  image: string // url
}

export interface CreateUserResponse {
  id: number
  name: string
  email: string
  token: string
}

export default createUser
