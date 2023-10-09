import AppError  from './AppError.js'


class Base {
  static schema = ''
  
  static init (db) {
    this.table = this.name.toLowerCase()
    this.db = db
  
    try {
      db.run(`CREATE TABLE IF NOT EXISTS ${this.table} (${this.schema})`)
    } catch (e) {
      throw new AppError({
        code: 'TABLE_CREATION_FAILED',
        message: e.message,
        originalError: e
      })
    }
  }
  
  static async findById (id) {
    const document = await this.db.get(`SELECT * FROM ${this.table} WHERE id = ?`, id)
    
    if (!document) {
      throw new AppError({
        code: 'NOT_FOUND',
        message : `${this.name} with id = "${id}" not found`,
      })
    }
    
    return document
  }
  
  static async findByField (field, value) {
    const documents = await this.db.all(`SELECT * FROM ${this.name} WHERE ${field} = (?)`, value)
    

    if (!documents) {
      throw new AppError({
        code: 'NOT_FOUND',
        message : `${this.name} with ${field} = "${value}" not found`,
      })
    }
    
    return documents
  }
  
  static async save (data) {
    const keys = Object.keys(data).reduce((acc, key, index) => {
      const comma = index === Object.keys(data).length - 1 ? '' : ','
      return acc + `${key}${comma} `
    }, '')
    
    const values = Object.values(data)
    const valuesPlaceholders = values.map(() => '?').join(', ')
    
    const query = `INSERT INTO ${this.table} (${keys}) VALUES (${valuesPlaceholders})`
    
    try {
      const doc = await this.db.run(query, values)
      return doc
    } catch (e) {
      throw new AppError({
        code: 'DOCUMENT_EXISTS',
        message : e.message,
        originalError  : e
      });
    }
  }
  
  static async delete (id) {
    try {
      const document = await this.findById(id)

      await this.db.run(`DELETE FROM ${this.table} WHERE id=(?)`, `${document.id}`)
      
      return document
    } catch(e) {
      throw new AppError({
        code: 'DOCUMENT_DELETE_FAILED',
        message: e.message,
        originalError: e
      })
    }
  }
}

export default Base;
