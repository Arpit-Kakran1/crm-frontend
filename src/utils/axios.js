import axios from 'axios'
import { serverUrl } from './serverUrl.js'

export const api = axios.create({
  baseURL: serverUrl,
  timeout: 15000,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
})
