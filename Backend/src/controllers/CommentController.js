const Comment = require('../models/Comment');
const { prisma } = require('../prisma');
const { log } = require('../services/actionLogService');

exports.create = async (req, res, next) => {
  const { userId, postId, content } = req.body;
  let comment = null;

  try {
    Comment.schema.parse({ userId, postId, content });

    comment = await prisma.$transaction(async (tx) => {
      return tx.comment.create({
        data: { userId, postId, content },
      });
    });

    res.status(201).json(comment);
  } catch (e) {
    next(e);
  } finally {
    await log({
      type: 'CommentAdd',
      id: comment?.id || null,
      userId,
      status: comment ? 'success' : 'failure',
    });
  }
};
