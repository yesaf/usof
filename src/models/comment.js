const Model = require('./index');

class Comment extends Model {
  constructor() {
    super();
  }

  async findById({ id }) {
    try {
      const rows = await this.DB.query(
        'SELECT * FROM comments WHERE comment_id = ?',
        id
      );

      return rows[0];
    } catch (e) {
      console.log(e);
    }
  }

  async getAllLikes({ comment_id }) {
    try {
      const rows = await this.DB.query(
        `SELECT * FROM likes WHERE entity_type='comment' AND entity_id=?`,
        comment_id
      );

      return rows[0];
    } catch (e) {
      console.log(e);
    }
  }

  async createNewLike({ author_id, comment_id, type }) {
    try {
      const result = await this.DB.query(
        `INSERT INTO likes (author_id, entity_type, entity_id, type)
                 VALUES (?, 'comment', ?, ?)`,
        [author_id, comment_id, type]
      );
      console.log(result);
      return { status: 'ok' };
    } catch (e) {
      console.log(e);
      return { status: 'error', msg: e.sqlMessage };
    }
  }

  async update({ comment_id, new_content }) {
    try {
      let result = await this.DB.query(
        `UPDATE comments 
                SET  content=? WHERE comment_id=?;`,
        [new_content, comment_id]
      );
      console.log(result);
      return { status: 'ok' };
    } catch (e) {
      console.log(e);
      return { status: 'error', msg: e.sqlMessage };
    }
  }

  async deleteLike({ comment_id, author_id }) {
    try {
      const result = await this.DB.query(
        `DELETE FROM likes WHERE entity_type='comment' AND entity_id=? AND author_id=?`,
        [comment_id, author_id]
      );
      console.log(result);
      return { status: 'ok' };
    } catch (e) {
      console.log(e);
      return { status: 'error', msg: e.sqlMessage };
    }
  }
}

module.exports = new Comment();
