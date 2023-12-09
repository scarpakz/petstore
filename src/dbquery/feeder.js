class Feeder {
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
     * Get a feeder status.
     * @returns rows
     */
    async getFeeder() {
        const conn = await this.createConnection()
        const [rows] = await conn.execute('SELECT * FROM `feeder_schedule`')
        return rows
    }

    /**
     * add a feeder schedule.
     * @returns rows
     */
    async saveFeederData(datetime) {
        const conn = await this.createConnection()
        const [rows] = await conn.execute('INSERT INTO `feeder_schedule` (`date`, `name`, `status`) VALUES (?, ?, ?)', [datetime, 'Feeder Tank', 'open']);
        return rows
    }

    /**
     * Delete a feeder schedule.
     * @returns rows
     */
    async deleteSchedule(scheduleId) {
        const conn = await this.createConnection()
        const [rows] = await conn.execute('DELETE FROM `feeder_schedule` WHERE `id` = ?', [scheduleId]);
        return rows
    }

    /**
     * Update feeder status
     * @returns rows
     */
    async updateFeeder({status}) { // open, close
        const conn = await this.createConnection()        
        const updateQuery = 'UPDATE feeder_status SET status = ?';
        const [rows] = await conn.execute(updateQuery, [status]);
        return rows
    }


    /**
     * Get Status
     * @returns 
     */
    async getStatus() {
        const conn = await this.createConnection()
        const [rows] = await conn.execute('SELECT * FROM `feeder_status`')
        return rows
    }

}

module.exports = new Feeder()