import axios from 'axios'

// const API_URL = 'http://localhost:3000'

const token = window.localStorage.getItem('token')

export const withAuth = axios.create({
  baseURL: process.env.VUE_APP_API_URL,
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  }
})

export const withoutAuth = axios.create({
  baseURL: process.env.VUE_APP_API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
})
