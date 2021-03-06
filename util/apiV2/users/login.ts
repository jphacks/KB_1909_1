import { instance } from '../common'

const login = async (body: LoginRequest): Promise<LoginResponse | void> => {
  const res = await instance.post('/login', body)

  if (res.status === 200) {
    return res.data as LoginResponse
  } else {
    console.log(res.data)
  }
}

export interface LoginRequest {
  email: string
  password: string
}

export interface LoginResponse {
  id: number
  name: string
  email: string
  token: string
  image: string
}

export default login
