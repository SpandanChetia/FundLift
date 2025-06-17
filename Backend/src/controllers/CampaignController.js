const Campaign = require('../models/Campaign');
const prisma = require('../services/prismaClient');
const cache = require('../services/cacheService');

exports.getAll = async (req, res, next) => {
  try {
    const key = 'campaigns:all';
    let data = await cache.get(key);
    if (!data) {
      data = await Campaign.findAll();
      await cache.set(key, data);
    }
    res.json(data);
  } catch (e) { next(e) }
};

exports.getByType = async (req, res, next) => {
  try {
    const data = await Campaign.findAll();
    res.json(data);
  } catch (e) { next(e) }
};

exports.getDonations = async (req, res, next) => {
  try {
    const camp = new Campaign({ id: req.params.id });
    const dons = await camp.loadDonations();
    res.json(dons);
  } catch (e) { next(e) }
};

exports.create = async (req, res, next) => {
  let saved;

  try {
    await prisma.$transaction(async (tx) => {
      saved = await tx.campaign.create({
        data: req.body
      });
      await tx.log.create({
        data: {
          type: 'CampaignCreate',
          entityId: saved.id,
          userId: req.user.id
        }
      });
    });
    await cache.del('campaigns:all');

    res.status(201).json(saved);

  } catch (e) {
    next(e);
  }
};
