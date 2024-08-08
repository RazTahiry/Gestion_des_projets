import axios from 'axios'

const API_BASE_URL = import.meta.env.VITE_API_URL
const TOKEN = localStorage.getItem('authToken')

export const createTask = async (userId, formData) => {
  if (!TOKEN) {
    throw new Error('No token found')
  }

  try {
    const data = JSON.stringify(formData)
    const response = await axios.post(`${API_BASE_URL}/users/${userId}/tasks`, data, {
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

export const getTasks = async () => {
  if (!TOKEN) {
    throw new Error('No token found')
  }

  try {
    const response = await axios.get(`${API_BASE_URL}/tasks`, {
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

export const getUserTasks = async (userId) => {
  if (!TOKEN) {
    throw new Error('No token found')
  }

  try {
    const response = await axios.get(`${API_BASE_URL}/users/${userId}/tasks`, {
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

export const getUserTask = async (userId, taskId) => {
  if (!TOKEN) {
    throw new Error('No token found')
  }

  try {
    const response = await axios.get(`${API_BASE_URL}/users/${userId}/tasks/${taskId}`, {
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

export const updateTask = async (userId, taskId, formData) => {
  if (!TOKEN) {
    throw new Error('No token found')
  }

  try {
    const data = JSON.stringify(formData)
    const response = await axios.patch(`${API_BASE_URL}/users/${userId}/tasks/${taskId}`, data, {
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

export const deleteTask = async (userId, taskId) => {
  if (!TOKEN) {
    throw new Error('No token found')
  }

  try {
    const response = await axios.delete(`${API_BASE_URL}/users/${userId}/tasks/${taskId}`, {
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
