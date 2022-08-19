const pool = require('../utils/pool');

module.exports = class Review {
  id;
  post;
  user_id;
  restaurant_id;

  constructor(row) {
    this.id = row.id;
    this.post = row.post;
    this.user_id = row.user_id;
    this.restaurant_id = row.restaurant_id;
  }

  static async insert(newReview) {
    const { rows } = await pool.query(
      `INSERT INTO reviews (post, restaurant_id, user_id)
       VALUES ($1, $2, $3)
       RETURNING *`,
      [newReview.post, newReview.restaurant_id, newReview.user_id]
    );
    return new Review(rows[0]);
  }

  static async getReviewById(id) {
    const { rows } = await pool.query(
      `SELECT reviews.* FROM reviews
      INNER JOIN yawp_users on reviews.user_id = yawp_users.id
      WHERE reviews.id = $1`,
      [id]
    );

    return new Review(rows[0]);
  }

  static async delete(id) {
    const { rows } = await pool.query(
      `DELETE from reviews
        WHERE id = $1
        RETURNING *`,
      [id]
    );
    return new Review(rows[0]);
  }
};
