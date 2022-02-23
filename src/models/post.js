const Model = require('./index');
const Category = require('./category');
const Comment = require('./category');

class Post extends Model {
  constructor() {
    super();
  }

  async findById({ id }) {
    try {
      const rows = await this.DB.query(
        'SELECT * FROM posts WHERE post_id = ?',
        [id]
      );

      return rows[0];
    } catch (e) {
      console.log(e);
    }
  }

  async getAll(/*{ offset = 0, limit = 50 }*/) {
    try {
      const rows = await this.DB.query('SELECT * FROM posts');

      return rows[0];
    } catch (e) {
      console.log(e);
    }
  }

  async getAllComments({ post_id }) {
    try {
      const rows = await this.DB.query(
        'SELECT * FROM comments WHERE post_id=?',
        [post_id]
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

  async getAllCategories({ post_id }) {
    try {
      const rows = await this.DB.query(
        `SELECT category_id, title, description
                 FROM categories
                 JOIN usof.categories_posts USING (category_id)
                 WHERE post_id=?`,
        [post_id]
      );

      return rows[0];
    } catch (e) {
      console.log(e);
    }
  }

  async getAllLikes({ post_id }) {
    try {
      const likes = (
        await this.DB.query(
          `SELECT COUNT(*) AS likes FROM likes WHERE entity_type='post' AND type='like' AND entity_id=?`,
          [post_id]
        )
      )[0][0].likes;
      const dislikes = (
        await this.DB.query(
          `SELECT COUNT(*) AS dislikes FROM likes WHERE entity_type='post' AND type='dislike' AND entity_id=?`,
          [post_id]
        )
      )[0][0].dislikes;
      return { like: likes, dislike: dislikes };
    } catch (e) {
      console.log(e);
    }
  }

  async addCategories({ post_id, categories }) {
    try {
      let result;
      for (const category_title of categories) {
        result = await Category.findByTitle({ title: category_title });
        console.log('Here --------');
        console.log(result);
        let categoryId;
        if (result.length >= 1) {
          categoryId = result[0]['category_id'];
        } else {
          result = await Category.createNew({ title: category_title });
          categoryId = result.insertId;
        }
        result = await this.DB.query(
          `INSERT INTO categories_posts (post_id, category_id)
                     VALUES (?, ?)`,
          [post_id, categoryId]
        );
      }
      return { status: 'ok' };
    } catch (e) {
      console.log(e);
      return { status: 'error', msg: e.sqlMessage };
    }
  }

  async createNew({ author_id, title, content, categories = [] }) {
    try {
      let result = await this.DB.query(
        `INSERT INTO posts (author_id, title, content, status)
                 VALUES (?, ?, ?, 'active')`,
        [author_id, title, content]
      );
      const post_id = result[0].insertId;
      result = await this.addCategories({
        post_id: post_id,
        categories: categories,
      });
      if (result.status === 'error') return result;
      return { status: 'ok', insertId: post_id };
    } catch (e) {
      console.log(e);
      return { status: 'error', msg: e.sqlMessage };
    }
  }

  async createNewLike({ author_id, post_id, type }) {
    try {
      let result = await this.DB.query(
        `DELETE
           FROM likes
           WHERE author_id = ?
             AND entity_id = ?
             AND entity_type = 'post'`,
        [author_id, post_id]
      );
      console.log(result);
      result = await this.DB.query(
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

  async update({ post_id, new_title, new_content, new_categories = [] }) {
    try {
      let result = await this.DB.query(
        `UPDATE posts 
                SET title=?, content=? WHERE post_id=?`,
        [new_title, new_content, post_id, post_id]
      );
      console.log(result);
      result = await this.DB.query(
        `DELETE FROM categories_posts WHERE post_id=?`,
        [post_id]
      );
      console.log(result);
      result = await this.addCategories({
        post_id: post_id,
        categories: new_categories,
      });
      if (result.status === 'error') return result;
      return { status: 'ok' };
    } catch (e) {
      console.log(e);
      return { status: 'error', msg: e.sqlMessage };
    }
  }

  async delete({ id }) {
    try {
      let result = await this.DB.query(
        `SELECT * FROM usof.comments WHERE post_id=?`,
        [id]
      );
      for (const comment of result[0]) {
        await Comment.delete({ id: comment.comment_id });
      }
      result = await this.DB.query(`DELETE FROM posts WHERE post_id=?`, [id]);
      console.log(result);
      return { status: 'ok' };
    } catch (e) {
      console.log(e);
      return { status: 'error', msg: e.sqlMessage };
    }
  }

  async deleteLike({ post_id, author_id }) {
    try {
      const result = await this.DB.query(
        `DELETE FROM likes WHERE entity_type='post' AND entity_id=? AND author_id=?`,
        [post_id, author_id]
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
