const pool = require('../utils/pool');

class User {
  id;
  email;
  first_name;
  last_name;
  #password_hash;

  constructor(row) {
    this.id = row.id;
    this.email = row.email;
    this.first_name = row.first_name;
    this.last_name = row.last_name;
    this.#password_hash = row.password_hash;
  }

  static async insert({ first_name, last_name, email, password_hash }) {
    const { rows } = await pool.query(
      ` 
      INSERT INTO users (first_name, last_name, email, password_hash)
            VALUES ($1, $2, $3, $4)
            RETURNING *
            `,
      [first_name, last_name, email, password_hash]
    );
    return new User(rows[0]);
  }
}

module.exports = { User };
