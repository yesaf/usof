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

  async findUserByEmail(email) {
    try {
      const rows = await this.DB.query(
        'SELECT * FROM users WHERE email = ?',
        email
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

  async createNewUser({ fullName, email, login, role = 'user', password }) {
    const salt = bcrypt.genSaltSync(10);
    const user = [
      fullName,
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
      return { status: 'ok' };
    } catch (e) {
      console.log(e);
      return { status: 'error', msg: e.sqlMessage };
    }
  }

  async uploadAvatar(id, avatar) {
    try {
      const result = await this.DB.query(
        'UPDATE users SET profile_picture=? WHERE account_id = ?',
        [avatar, id]
      );

      console.log(result);
      return { status: 'ok' };
    } catch (e) {
      console.log(e);
      return { status: 'error', msg: e.sqlMessage };
    }
  }

  async updateUser(id, { fullName, email, login }) {
    try {
      const result = await this.DB.query(
        'UPDATE users SET full_name=?, email=?, login=? WHERE account_id = ?',
        [fullName, email, login, id]
      );

      console.log(result);
      return { status: 'ok' };
    } catch (e) {
      console.log(e);
      return { status: 'error', msg: e.sqlMessage };
    }
  }

  async deleteUser(id) {
    try {
      const result = await this.DB.query(
        'DELETE FROM users WHERE account_id = ?',
        id
      );

      console.log(result);
      return { status: 'ok' };
    } catch (e) {
      console.log(e);
      return { status: 'error', msg: e.sqlMessage };
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

  async checkExistLogin(login) {
    try {
      const rows = await this.DB.query(
        'SELECT * FROM users WHERE login = ?',
        login
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
