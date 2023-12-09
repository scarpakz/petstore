class Notification {
    mysql = require('mysql2/promise')

    constructor() {
        this.databaseConfig = {
            host: 'localhost',
            user: 'root',
            password: 'root', // Change the password to blank if you're using WAMP
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
     * Get all notifications.
     * @returns rows
     */
    async getNotifications() {
        const conn = await this.createConnection()
        const [rows] = await conn.execute('SELECT * FROM `notification`')
        return rows
    }

    async addNotification({header, message}) {
        const currentDatetime = new Date().toISOString().slice(0, 19).replace('T', ' ');

        // Use the currentDatetime in the INSERT query
        const insertQuery = 'INSERT INTO notification (header, message, datetime) VALUES (?, ?, ?)';
        const [result] = await conn.execute(insertQuery, [header, message, currentDatetime]);
        return result
    }
}

module.exports = new Notification()