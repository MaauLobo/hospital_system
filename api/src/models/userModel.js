// models/UserModel.js

const { db } = require('./db');

class UserModel {
  getAllUsers(callback) {
    const getAllUsersQuery = `
      SELECT * FROM Users
    `;

    db.query(getAllUsersQuery, (err, result) => {
      if (err) {
        return callback(err, null);
      }

      return callback(null, result);
    });
  }
    getMaqueiros(callback) {
      const query = "SELECT * FROM Users WHERE role = 'Maqueiro' AND perms = 'User'";
      db.query(query, (err, results) => {
        if (err) {
          console.error('Erro ao consultar maqueiros:', err);
          return callback(err, null);
        }
        return callback(null, results);
      });
    }
}

module.exports = UserModel;
