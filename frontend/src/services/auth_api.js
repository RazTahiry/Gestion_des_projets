import axios from 'axios'

const API_BASE_URL = import.meta.env.VITE_API_URL
const TOKEN = localStorage.getItem('authToken')

export const login = async (formData) => {
  try {
    let data = JSON.stringify(formData)
    console.log(API_BASE_URL)
    const response = await axios.post(`${API_BASE_URL}/users/login`, data, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
    return response
  } catch (error) {
    console.log('Error: ', error)
    throw error
  }
}

export const logout = async () => {
  try {
    const response = await axios.post(`${API_BASE_URL}/users/logout`, null, {
      headers: {
        Authorization: `Bearer ${TOKEN}`
      }
    })
    return response
  } catch (error) {
    console.log('Error: ', error)
    throw error
  }
}
