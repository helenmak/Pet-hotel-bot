import axios from 'axios'


const baseURL = 'http://pethotelbot-production.up.railway.app'

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
  listBookings: (userId) => api.get(`/booking/list`, { params: { user_id: 292143114 } }).then(response => {
    console.log(response)
    return response.data
  })
}
