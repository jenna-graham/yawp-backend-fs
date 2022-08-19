const bcrypt = require('bcrypt');
const User = require('../models/User');
const jwt = require('jsonwebtoken');

module.exports = class UserService {
  static async create({ userName, email, password }) {
    if ((await User.getByEmail(email)) !== null)
      throw new Error('Email already exists');

    const passwordHash = await bcrypt.hash(
      password,
      Number(process.env.SALT_ROUNDS)
    );

    const user = await User.insert({
      userName,
      email,
      passwordHash,
    });

    try {
      const token = jwt.sign({ ...user }, process.env.JWT_SECRET, {
        expiresIn: '1 day',
      });
      return [user, token];
    } catch (error) {
      error.status = 401;
      throw error;
    }
  }

  static async signIn({ email, password = '' }) {
    console.log(email);
    try {
      const user = await User.getByEmail(email);
      if (!user) throw new Error('Invalid email');
      if (!bcrypt.compareSync(password, user.passwordHash))
        throw new Error('Invalid password');
      const token = jwt.sign({ ...user }, process.env.JWT_SECRET, {
        expiresIn: '1 day',
      });
      return token;
    } catch (error) {
      error.status = 401;
      throw error;
    }
  }
};
