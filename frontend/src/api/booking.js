import axios from 'axios'

import config from '../config'


const baseURL = config.api_endpoint

const api = axios.create({
  baseURL,
  headers: {
    post: {
      'Content-Type': 'application/json'
    }
  }
})


export default {
  createBooking: (data) => api.post(`/booking/create`, data).then(response => response.data),
  deleteBooking: (data) => api.post(`/booking/delete`, data).then(response => response.data),
  listBookings: (userId) => api.get(`/booking/list`, { params: { user_id: userId } }).then(response => {
    return response.data
  })
}
