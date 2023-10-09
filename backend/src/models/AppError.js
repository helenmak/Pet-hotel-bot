export class AppError extends Error {
  constructor({ code, message, originalError }) {
    super()
  
    if (!code) throw new Error('"code" field is missing in Error object')
    if (!message) throw new Error('"message" field is missing in Error object')
    
    this.message = message
    this.code = code
    this.originalError = originalError
  
    console.error(this.code)
    console.error(this.message)
    console.error(this.originalError)
  }
}


export default AppError
