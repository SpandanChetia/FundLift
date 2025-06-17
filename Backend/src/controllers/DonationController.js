const Donation = require('../models/Donation');
const { prisma } = require('../prisma');
const redlock = require('../services/lockService');

exports.create = async (req, res, next) => {
  const { campaignId, userId, amount } = req.body;

  let lock;
  let donation = null;

  try {
    Donation.schema.parse({ campaignId, userId, amount });

    const campaign = await prisma.campaign.findUnique({
      where: { id: campaignId },
    });
    if (!campaign) {
      return res.status(404).json({ message: 'Campaign not found' });
    }

    lock = await redlock.acquire(
      [`locks:campaign:${campaignId}`],
      5000
    );

    donation = await prisma.$transaction(async (tx) => {
      const newDonation = await tx.donation.create({
        data: { campaignId, userId, amount },
      });

      await tx.campaign.update({
        where: { id: campaignId },
        data: {
          currentAmount: {
            increment: amount,
          },
        },
      });

      await tx.log.create({
        data: {
          type: 'DonationCreate',
          entityId: newDonation.id,
          userId,
          status: 'success'
        },
      });

      return newDonation;
    });

    res.status(201).json(donation);

  } catch (err) {
    next(err);
  } finally {
    if (lock) {
      try {
        await lock.release();
      } catch {}
    }
  }
};
