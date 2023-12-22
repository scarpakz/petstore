class Notification {
    mysql = require('mysql2/promise')

    constructor() {
        this.databaseConfig = {
            host: 'sql.freedb.tech',
            user: 'freedb_userfeeder',
            password: 'QkRJ#K9Q&&!ZWTy',
            database: 'freedb_feeder'
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

        // Use the currentDatetime in the INSERT query
        const insertQuery = 'INSERT INTO notification (header, message) VALUES (?, ?)';
        const [result] = await conn.execute(insertQuery, [header, message]);
        return result
    }
}

module.exports = new Notification()