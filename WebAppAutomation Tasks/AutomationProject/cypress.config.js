const { defineConfig } = require("cypress");



const dev1Db = {
  dbname: 'dev1_platform_reference',
  host: 'dev1-platform-global-primary-cluster.cluster-c0sqprdjfkji.eu-central-1.rds.amazonaws.com',
  password: '9OiC6DEGJZ8pwUoX',
  user: 'admin',
}

module.exports = defineConfig({

  // 1- projectId: 'c9eedf',
  // 2- projectId:'h9a8bw'
  projectId: 'ocjy1f',

  e2e: {
    setupNodeEvents(on, config) {

      const dotenvPlugin = require("cypress-dotenv");
      const mysql = require("mysql");
      function queryTestDb(query, config) {
       
        const connection = mysql.createConnection(config.env.db);
        connection.connect();
        return new Promise((resolve, reject) => {
          connection.query(query, (error, results) => {
            if (error) reject(error)
            else {
              connection.end();
              return resolve(results);
            }
          })
        }); 
      }
      
      config = dotenvPlugin(config)
      on('task', {
        queryDb: query => {
          return queryTestDb(query, config);
        },
      });

      // implement node event listeners here
    },
    "defaultCommandTimeout": 20000,
    // "retries": 2
  },

  "env": {
    "db": {
      database: dev1Db.dbname,
      host: dev1Db.host,
      password: dev1Db.password,
      user: dev1Db.user,
      secureConnection: true,
      port: 3306,
      ssl: 'Amazon RDS',
    }
  }

});


