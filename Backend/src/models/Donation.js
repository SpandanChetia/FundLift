const BaseModel = require('./BaseModel');
const { z } = require('zod');

class Donation extends BaseModel {
  static get model() { return 'donation'; }
  static get schema() {
    return z.object({
      id: z.string().uuid().optional(),
      amount: z.number().positive(),
      userId: z.string().uuid(),
      campaignId: z.string().uuid(),
      metadata: z.record(z.any()),
    });
  }
}

module.exports = Donation;
