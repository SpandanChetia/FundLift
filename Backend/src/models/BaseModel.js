const prisma = require('../utils/prismaClient');
const { z } = require('zod');

class BaseModel {
  constructor(attrs = {}) {
    this.attributes = { ...attrs };
  }

  static get schema() {
    return z.object({});
  }

  static get model() {
    throw new Error('Model getter must be overridden');
  }

  validate() {
    this.attributes = this.constructor.schema.parse(this.attributes);
    return this.attributes;
  }

  async save() {
    this.validate();
    const data = this.attributes;
    if (data.id) {
      return prisma[this.constructor.model].update({
        where: { id: data.id },
        data
      });
    } else {
      const record = await prisma[this.constructor.model].create({ data });
      this.attributes = { ...record };
      return record;
    }
  }

  async saveOrThrow() {
    return this.save();
  }

  async destroy() {
    if (!this.attributes.id) throw new Error('ID missing');
    return prisma[this.constructor.model].delete({ where: { id: this.attributes.id } });
  }

  static async findById(id) {
    return prisma[this.model].findUnique({ where: { id } });
  }

  static async findAll(filter = {}) {
    return prisma[this.model].findMany({ where: filter });
  }
}

module.exports = BaseModel;
