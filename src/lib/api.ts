import axios from 'axios'
import { API_URL } from '@env'

const BASE_URL = API_URL || 'http://localhost:3332'

console.log({ BASE_URL })

export const api = axios.create({
  baseURL: BASE_URL,
})
