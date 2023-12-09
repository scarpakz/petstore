class Blocker {
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
     * Get a blocker status.
     * @returns rows
     */
    async getBlocker() {
        const conn = await this.createConnection()
        const [rows] = await conn.execute('SELECT * FROM `blocker_schedule`')
        return rows
    }

    /**
     * Update block status
     * @returns rows
     */
    async updateBlocker({status}) { // open, close
        const conn = await this.createConnection()        
        const updateQuery = 'UPDATE blocker_status SET status = ?';
        const [rows] = await conn.execute(updateQuery, [status]);
        return rows
    }

    /**
     * Delete a feeder schedule.
     * @returns rows
     */
    async deleteSchedule(scheduleId) {
        const conn = await this.createConnection()
        const [rows] = await conn.execute('DELETE FROM `blocker_schedule` WHERE `id` = ?', [scheduleId]);
        return rows
    }

    /**
     * add a feeder schedule.
     * @returns rows
     */
    async saveBlockerData(datetime) {
        const conn = await this.createConnection()
        const [rows] = await conn.execute('INSERT INTO `blocker_schedule` (`date`, `name`, `status`) VALUES (?, ?, ?)', [datetime, 'Water Blocker', 'open']);
        return rows
    }

    /**
     * Get Status
     * @returns 
     */
    async getStatus() {
        const conn = await this.createConnection()
        const [rows] = await conn.execute('SELECT * FROM `blocker_status`')
        return rows
    }

}

module.exports = new Blocker()