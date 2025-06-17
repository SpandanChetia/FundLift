const BaseModel = require('./BaseModel');
const { z } = require('zod');

class ActionLog extends BaseModel {
  static get model() { return 'actionLog'; }
  static get schema() {
    return z.object({
      id: z.string().uuid().optional(),
      actionableType: z.string(),
      actionableId: z.string(),
      whodunnit: z.string(),
      metadata: z.record(z.any()).optional(),
    });
  }
}

module.exports = ActionLog;
