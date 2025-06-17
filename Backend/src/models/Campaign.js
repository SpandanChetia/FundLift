const BaseModel = require('./BaseModel');
const { z } = require('zod');

class Campaign extends BaseModel {
  static get model() { return 'campaign'; }
  static get schema() {
    return z.object({
      id: z.string().uuid().optional(),
      description: z.string().min(5),
      goalAmount: z.number().positive(),
      upiId: z.string(),
      currentAmount: z.number().optional(),
      photo: z.string().url().optional(),
      userId: z.string().uuid(),
      metadata: z.record(z.any()),
    });
  }

  async loadDonations() {
    const camp = await prisma.campaign.findUnique({
      where: { id: this.attributes.id },
      include: { donations: true }
    });
    return camp.donations;
  }
}

module.exports = Campaign;
