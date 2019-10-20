import axios from 'axios'

export const imgurInstance = axios.create({
  baseURL: 'https://api.imgur.com/3/',
  headers: {
    Authorization: `Client-ID ${process.env.IMGUR_CLIENT_ID}`
  }
})
