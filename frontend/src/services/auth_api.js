import axios from 'axios'

const API_BASE_URL = 'http://localhost:3000/api/v1'

export const login = async (formData) => {
  try {
    let data = JSON.stringify(formData)
    const response = await axios.post(`${API_BASE_URL}/users/login`, data, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
    console.log(response.status, response.data)
    return response
  } catch (error) {
    console.log('Error: ', error)
    throw error
  }
}
