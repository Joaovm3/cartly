import axios from 'axios'

export const api = axios.create({
  baseURL: 'http://192.168.240.1:3332',
})