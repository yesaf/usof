const Model = require('./index');

class Category extends Model {
  constructor() {
    super();
  }

  async findCategoryById(id) {
    try {
      const rows = await this.DB.query(
        'SELECT * FROM usof.categories WHERE category_id = ?',
        id
      );

      return rows[0];
    } catch (e) {
      console.log(e);
    }
  }

  async getAllCategories() {
    try {
      const rows = await this.DB.query('SELECT * FROM categories');

      return rows[0];
    } catch (e) {
      console.log(e);
    }
  }

  async createNewCategory({ title, description = '' }) {
    try {
      const result = await this.DB.query(
        'INSERT INTO usof.categories (title, description ) VALUES (?, ?)',
        [title, description]
      );
      console.log(result);
      return { status: 'ok' };
    } catch (e) {
      console.log(e);
      return { status: 'error', msg: e.sqlMessage };
    }
  }

  async updateCategory({ category_id, new_title, new_description }) {
    try {
      let result = await this.DB.query(
        `UPDATE categories 
                SET title=?, description=? WHERE category_id=?;`,
        [new_title, new_description, category_id]
      );
      console.log(result);
      return { status: 'ok' };
    } catch (e) {
      console.log(e);
      return { status: 'error', msg: e.sqlMessage };
    }
  }

  async deleteCategory(id) {
    try {
      const result = await this.DB.query(
        `DELETE FROM usof.categories WHERE category_id=?`,
        id
      );
      console.log(result);
      return { status: 'ok' };
    } catch (e) {
      console.log(e);
      return { status: 'error', msg: e.sqlMessage };
    }
  }
}

module.exports = new Category();