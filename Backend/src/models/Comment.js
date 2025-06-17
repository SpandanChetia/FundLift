const BaseModel = require('./BaseModel');
const { z } = require('zod');

class Comment extends BaseModel {
  static get model() { return 'comment'; }
  static get schema() {
    return z.object({
      id: z.string().uuid().optional(),
      content: z.string(),
      userId: z.string().uuid(),
      campaignId: z.string().uuid(),
      metadata: z.record(z.any()),
    });
  }
}

module.exports = Comment;
