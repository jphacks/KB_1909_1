import { imgurInstance } from './common'

const uploadImage = async (base64Url: string) => {
  const res = await imgurInstance.post('/upload', {
    image: base64Url
  })

  console.log(res.status)

  if (res.status === 201) {
    return res.data
  } else {
    console.log(res.data)
  }
}

export default uploadImage
