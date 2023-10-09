import Booking from './Booking.js';


export default function initModels(db) {
  const models = {
    Booking,
  }
  
  Object.values(models).forEach(model => model.init(db));
  
  return {
    ...models,
  };
}
