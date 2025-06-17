const prisma = require('../utils/prismaClient');

exports.log = ({ type, id, userId, metadata = {} }) =>
  prisma.actionLog.create({
    data: {
      actionableType: type,
      actionableId: id,
      whodunnit: userId,
      metadata
    }
  });
