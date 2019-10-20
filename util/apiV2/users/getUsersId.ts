import { instance } from '../common'

const getUsersId = async (id: string): Promise<GetUsersIdResponse | void> => {
  const res = await instance.get(`/users/${id}`)

  if (res.status === 200) {
    return res.data as GetUsersIdResponse
  } else {
    console.log(res.data)
  }
}

export interface GetUsersIdResponse {
  id: number
  name: string
  email: string
  image: string
}

export default getUsersId
