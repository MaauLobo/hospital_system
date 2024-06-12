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
}

module.exports = UserModel;
