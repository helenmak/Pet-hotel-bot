import fetch from 'node-fetch'
import EventEmitter from 'events'
import { Buffer } from 'node:buffer'


export default class TelegramBot {
  constructor(token) {
    this.token = token
  }
  
  endpoint = 'https://api.telegram.org/bot'
  
  pollingTimeoutS = 10
  pollingLimit = 100
  pollingAllowedUpdates = []
  pollingOffset = 0
  
  eventEmitter = new EventEmitter()
  
  async execute(method, data) {
    const isFileToUpload = typeof data === 'object' ? Object.values(data).some(value => value instanceof Buffer) : false
    const isDataString = typeof data === 'string'
    
    let contentType
    let body
    let httpMethod = 'POST'
    
    if (!data) {
      httpMethod = 'GET'
    }
    
    if (data && isFileToUpload) {
      const formData = new FormData()
      
      Object.entries(data).forEach(([key, value]) => {
        formData.append(key, value)
      })
      
      body = formData
      contentType = 'multipart/form-data'
    } else if (data) {
      body = JSON.stringify(data)
      contentType = 'application/json'
    }
    
    const requestObject = {
      method: httpMethod, headers: {
        'Content-Type': contentType,
      },
    }
    
    if (httpMethod === 'POST') {
      requestObject.body = body
    }
    
    try {
      const response = await fetch(`${this.endpoint}${this.token}/${method}`, requestObject)

      const json = await response.json()
      
      if (!json.ok) {
        throw json
      }
      
      return json
    } catch (e) {
      throw e
    }
  }
  
  
  async getUpdates() {
    this.runPolling()
  }
  
  // @runPolling - https://core.telegram.org/bots/api
  // long polling the Telegram server for new bot updates
  async runPolling() {
    try {
      const response = await this.execute('getUpdates', {
        offset: this.pollingOffset,
        timeout: this.pollingTimeoutS,
        limit: this.pollingLimit,
        allowed_updates: this.pollingAllowedUpdates
      })
      
      if (!response.ok) {
        throw response
      }
      
      const updates = response.result
      const isUpdates = updates.length

      const newUpdates = isUpdates ? updates.filter(updateData => updateData.update_id >= this.pollingOffset) : []
      
      
      this.pollingOffset = isUpdates ? updates[updates.length - 1]?.update_id + 1 : this.pollingOffset

      if (!newUpdates.length) return
  
      newUpdates.forEach(updateData => this.eventEmitter.emit('update', updateData))
  
      this.runPolling()
    } catch (e) {
      console.error(`ERROR: Telegram polling update failed: ${e}`)
      throw e
    }
  }
  
  on (event, cb) {
    this.eventEmitter.on(event, cb)
  }
  
  off (event, cb) {
    this.eventEmitter.off(event, cb)
  }
}
