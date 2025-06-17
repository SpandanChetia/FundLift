const User = require('../models/User');
const cache = require('../services/cacheService');
const { log } = require('../services/actionLogService');

exports.getAll = async (req, res, next) => {
  try {
    const key = 'users:all';
    let data = await cache.get(key);
    if (!data) {
      data = await User.findAll();
      await cache.set(key, data);
    }
    res.json(data);
  } catch (e) { next(e) }
};

exports.getById = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    await log({ type: 'UserFetch', id: user.id, userId: req.user?.id });
    res.json(user);
  } catch (e) { next(e) }
};

exports.search = async (req, res, next) => {
  try {
    const users = await User.findAll({
      name: req.query.name ? { contains: req.query.name } : undefined,
      email: req.query.email ? { contains: req.query.email } : undefined,
    });
    res.json(users);
  } catch (e) { next(e) }
};

exports.create = async (req, res, next) => {
  const { name, email } = req.body;

  let user = null;

  try {
    User.schema.parse({ name, email });

    user = await prisma.$transaction(async (tx) => {
      return tx.user.create({
        data: { name, email },
      });
    });

    res.status(201).json(user);
  } catch (err) {
    next(err);
  } finally {
    await log({
      type: 'UserCreate',
      id: user?.id || null,
      status: user ? 'success' : 'failure',
    });
  }
};
