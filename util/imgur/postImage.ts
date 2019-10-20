import { imgurInstance } from './common'

const uploadImage = async (
  base64Url: string
): Promise<ImgurResponse | void> => {
  const res = await imgurInstance.post('/image', {
    image: base64Url.replace(new RegExp('data.*base64,'), '')
  })

  console.log(res.status)

  if (res.status === 200) {
    return res.data
  } else {
    console.log(res.data)
  }
}

export interface ImgurResponse {
  data: {
    link: string
  }
}

export default uploadImage
