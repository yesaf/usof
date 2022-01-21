const Model = require('./index');

class Post extends Model {
  constructor() {
    super();
  }

  async findPostById(id) {
    try {
      const rows = await this.DB.query(
        'SELECT * FROM posts WHERE post_id = ?',
        id
      );

      return rows[0];
    } catch (e) {
      console.log(e);
    }
  }

  async getAllPosts() {
    try {
      const rows = await this.DB.query('SELECT * FROM posts');

      return rows[0];
    } catch (e) {
      console.log(e);
    }
  }

  async getAllComments(post_id) {
    try {
      const rows = await this.DB.query(
        'SELECT * FROM comments WHERE post_id=?',
        post_id
      );

      return rows[0];
    } catch (e) {
      console.log(e);
    }
  }

  async createNewComment({ author_id, post_id, content }) {
    try {
      const result = await this.DB.query(
        'INSERT INTO comments (author_id, post_id, content ) VALUES (?, ?, ? )',
        [author_id, post_id, content]
      );
      console.log(result);
      return { status: 'ok' };
    } catch (e) {
      console.log(e);
      return { status: 'error', msg: e.sqlMessage };
    }
  }

  async getAllCategories(post_id) {
    try {
      const rows = await this.DB.query(
        `SELECT category_id, title, description
                 FROM categories
                 JOIN usof.categories_posts USING (category_id)
                 WHERE post_id=?`,
        post_id
      );

      return rows[0];
    } catch (e) {
      console.log(e);
    }
  }

  async getAllLikes(post_id) {
    try {
      const rows = await this.DB.query(
        `SELECT * FROM likes WHERE entity_type='post' AND entity_id=?`,
        post_id
      );

      return rows[0];
    } catch (e) {
      console.log(e);
    }
  }

  async createNewPost({ author_id, title, content, categories = [] }) {
    try {
      let result = await this.DB.query(
        `INSERT INTO posts (author_id, title, content, status)
                 VALUES (?, ?, ?, 'active')`,
        [author_id, title, content]
      );
      const post_id = result[0].insertId;
      for (const category_id of categories) {
        result = await this.DB.query(
          `INSERT INTO categories_posts (post_id, category_id)
                     VALUES (?, ?)`,
          [post_id, category_id]
        );
      }
      console.log(result);
      return { status: 'ok' };
    } catch (e) {
      console.log(e);
      return { status: 'error', msg: e.sqlMessage };
    }
  }

  async createNewLike({ author_id, post_id, type }) {
    try {
      const result = await this.DB.query(
        `INSERT INTO likes (author_id, entity_type, entity_id, type)
                 VALUES (?, 'post', ?, ?)`,
        [author_id, post_id, type]
      );
      console.log(result);
      return { status: 'ok' };
    } catch (e) {
      console.log(e);
      return { status: 'error', msg: e.sqlMessage };
    }
  }

  async updatePost({ post_id, new_title, new_content, new_categories = [] }) {
    try {
      let result = await this.DB.query(
        `UPDATE posts 
                SET title=?, content=? WHERE post_id=?;
                DELETE FROM categories_posts WHERE post_id=?;`,
        [new_title, new_content, post_id, post_id]
      );
      for (const category_id of new_categories) {
        result = await this.DB.query(
          `INSERT INTO categories_posts (post_id, category_id)
                     VALUES (?, ?)`,
          [post_id, category_id]
        );
      }
      console.log(result);
      return { status: 'ok' };
    } catch (e) {
      console.log(e);
      return { status: 'error', msg: e.sqlMessage };
    }
  }

  async deletePost(id) {
    try {
      const result = await this.DB.query(
        `DELETE FROM posts WHERE post_id=?`,
        id
      );
      console.log(result);
      return { status: 'ok' };
    } catch (e) {
      console.log(e);
      return { status: 'error', msg: e.sqlMessage };
    }
  }

  async deleteLike(post_id) {
    try {
      const result = await this.DB.query(
        `DELETE FROM likes WHERE entity_type='post' AND entity_id=?`,
        post_id
      );
      console.log(result);
      return { status: 'ok' };
    } catch (e) {
      console.log(e);
      return { status: 'error', msg: e.sqlMessage };
    }
  }
}

module.exports = new Post();
