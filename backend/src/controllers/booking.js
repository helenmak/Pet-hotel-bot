import services from '../services/index.js'


async function create (req, res) {
  try {
    const data = await services.booking.create(req.body)
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json(error)
  }
}

async function list (req, res) {
  let userId = req.query.user_id
  
  try {
    const data = await services.booking.list(userId)
  
    res.set('Access-Control-Allow-Origin', '*')
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json(error)
  }
}

async function deleteBooking (req, res) {
  try {
    const data = await services.booking.delete(req.body)
    
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json(error)
  }
}



export default {
  create,
  list,
  delete: deleteBooking,
}
