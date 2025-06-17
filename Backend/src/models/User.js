const BaseModel = require('./BaseModel');
const { z } = require('zod');

class User extends BaseModel {
  static get model() { return 'user'; }
  static get schema() {
    return z.object({
      id: z.string().uuid().optional(),
      name: z.string().min(1),
      email: z.string().email(),
      photo: z.string().url().optional(),
      metadata: z.record(z.any()),
    });
  }

  async loadCampaigns() {
    const user = await prisma.user.findUnique({
      where: { id: this.attributes.id },
      include: { campaigns: true }
    });
    return user.campaigns;
  }
}

module.exports = User;
