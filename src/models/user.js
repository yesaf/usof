const Model = require('./index');
const bcrypt = require('bcrypt');

class User extends Model {
  constructor() {
    super();
  }

  async findUserById(id) {
    try {
      const rows = await this.DB.query(
        'SELECT * FROM users WHERE account_id = ?',
        id
      );

      return rows[0];
    } catch (e) {
      console.log(e);
    }
  }

  async getAllUsers() {
    try {
      const rows = await this.DB.query('SELECT * FROM users');

      return rows[0];
    } catch (e) {
      console.log(e);
    }
  }

  async createNewUser({ full_name, email, login, role, password }, creator_id) {
    if (!(await this.isAdmin(creator_id))) {
      console.log(`Creator user is not admin! Permission denied!`);
    } else {
      const isEmailExist = await this.checkExistEmail(email);
      if (isEmailExist) {
        console.log(
          `This email "${email}" has already exist. Please choose an other email`
        );
      } else {
        const salt = bcrypt.genSaltSync(10);
        const user = [
          full_name,
          email,
          login,
          role,
          bcrypt.hashSync(password, salt),
        ];

        try {
          const result = await this.DB.query(
            'INSERT INTO users (full_name, email, login, role, password) VALUES (?, ?, ?, ?, ?)',
            user
          );
          console.log(result);
        } catch (e) {
          console.log(e);
        }
      }
    }
  }

  async uploadAvatar(id, avatar) {
    try {
      const rows = await this.DB.query(
        'UPDATE users SET profile_picture=? WHERE account_id = ?',
        [avatar, id]
      );

      console.log(rows);
    } catch (e) {
      console.log(e);
    }
  }

  async updateUser(id, { full_name, email, login }) {
    try {
      const rows = await this.DB.query(
        'UPDATE users SET full_name=?, email=?, login=? WHERE account_id = ?',
        [full_name, email, login, id]
      );

      console.log(rows);
    } catch (e) {
      console.log(e);
    }
  }

  async deleteUser(id) {
    try {
      const rows = await this.DB.query(
        'DELETE FROM users WHERE account_id = ?',
        id
      );

      console.log(rows);
    } catch (e) {
      console.log(e);
    }
  }

  async checkExistEmail(email) {
    try {
      const rows = await this.DB.query(
        'SELECT * FROM users WHERE email = ?',
        email
      );

      return !!rows[0].length;
    } catch (e) {
      console.log(e);
    }
  }

  async isAdmin(id) {
    try {
      const rows = await this.DB.query(
        'SELECT * FROM users WHERE account_id = ?',
        id
      );

      return rows[0][0].role === 'admin';
    } catch (e) {
      console.log(e);
    }
  }
}

module.exports = new User();
