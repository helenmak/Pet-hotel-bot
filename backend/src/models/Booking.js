import Base from './Base.js';


class Booking extends Base {
  static schema = `
    id VARCHAR NOT NULL PRIMARY KEY,
    user_id VARCHAR NOT NULL,
    hotel_name VARCHAR NOT NULL,
    total_price INTEGER NOT NULL,
    duration VARCHAR NOT NULL,
    comment VARCHAR,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
  `
}

export default Booking
