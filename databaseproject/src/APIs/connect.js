import mysql from 'mysql2/promise';
const createConnection =  async() => {
    try {
      const connection =  await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'databaselab_project_admin',
        database: 'shopping_platform_test',
      });
      //console.log('Connected to MySQL');
      return connection;
    } catch (err) {
      console.error('Error connecting to MySQL:', err);
      throw err;
    }
  };
  
  export default createConnection;