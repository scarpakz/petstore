class User {
    mysql = require('mysql2/promise')

    constructor() {
        this.databaseConfig = {
            host: 'localhost',
            user: 'root',
            password: 'root',
            database: 'fws'
        }
    }

    /**
     * Establish connection.
     * @returns 
     */
    async createConnection() {
        const { host, user, password, database } = this.databaseConfig
        const conn = await this.mysql.createConnection({host: host, user: user, password: password, database: database})
        return conn
    }

    /**
     * Get all active users.
     * @returns rows
     */
    async getUsers() {
        const conn = await this.createConnection()
        const [rows] = await conn.execute('SELECT * FROM `user`')
        return rows
    }

    async updateUserPassword({ id, password }) {
        const conn = await this.createConnection()
        const updateQuery = 'UPDATE user SET password = ? WHERE id = ?';
        const [rows] = await conn.execute(updateQuery, [password, id]);
        return rows
    }
}

module.exports = new User()