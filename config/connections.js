"use strict";

/**
 * Connections API Configuration
 *
 * Connections are like "saved settings" for your adapters.
 * Each model must have a `connection` property (a string) which is references the name of one
 * of these connections.  If it doesn't, the default `connection` configured in `config/models.js`
 * will be applied.  Of course, a connection can (and usually is) shared by multiple models.
 *
 * NOTE: If you're using version control, you should put your passwords/api keys
 * in `config/local.js`, environment variables, or use another strategy.
 */

module.exports = {
  connections: {
    /**
     * PostgreSQL configuration
     * @type {Object}
     */
    postgresql: {
      adapter: 'sails-postgresql',
      host: '52.58.54.92',
      user: 'hope_usr',
      password: '011235f',
      database: 'hope_db',
      port: 5432,
      pool: false,
      ssl: false
    },

    /**
     * MySQL configuration
     * @type {Object}
     */
    mysql: {
      adapter: 'sails-mysql',
      host: 'localhost',
      port: 3306,
      user: 'chare',
      password: 'chare',
      database: 'chare',
      charset: 'utf8',
      collation: 'utf8_swedish_ci'
    }

  }
};
