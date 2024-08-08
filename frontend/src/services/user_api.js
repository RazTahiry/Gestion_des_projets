import axios from 'axios'

const API_BASE_URL = import.meta.env.VITE_API_URL
const TOKEN = localStorage.getItem('authToken')

export const createUser = async (formData) => {
  if (!TOKEN) {
    throw new Error('No token found')
  }

  try {
    const data = JSON.stringify(formData)
    const response = await axios.post(`${API_BASE_URL}/users`, data, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${TOKEN}`
      }
    })

    return response
  } catch (err) {
    console.error('Eror : ', err)
    throw err
  }
}

export const getUsers = async () => {
  if (!TOKEN) {
    throw new Error('No token found')
  }

  try {
    const response = await axios.get(`${API_BASE_URL}/users`, {
      headers: {
        Authorization: `Bearer ${TOKEN}`
      }
    })

    if (response.status === 200) {
      return response.data
    }
  } catch (error) {
    console.log('Error: ', error)
    throw error
  }
}

export const getUser = async (userId) => {
  if (!TOKEN) {
    throw new Error('No token found')
  }

  try {
    const response = await axios.get(`${API_BASE_URL}/users/${userId}`, {
      headers: {
        Authorization: `Bearer ${TOKEN}`
      }
    })

    if (response.status === 200) {
      return response.data
    }
  } catch (error) {
    console.log('Error: ', error)
    throw error
  }
}

export const updateUser = async (userId, formData) => {
  if (!TOKEN) {
    throw new Error('No token found')
  }

  try {
    const data = JSON.stringify(formData)
    const response = await axios.patch(`${API_BASE_URL}/users/${userId}`, data, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${TOKEN}`
      }
    })

    return response
  } catch (err) {
    console.error('Eror : ', err)
    throw err
  }
}

export const deleteUser = async (userId) => {
  if (!TOKEN) {
    throw new Error('No token found')
  }

  try {
    const response = await axios.delete(`${API_BASE_URL}/users/${userId}`, {
      headers: {
        Authorization: `Bearer ${TOKEN}`
      }
    })

    return response
  } catch (err) {
    console.error('Eror : ', err)
    throw err
  }
}
