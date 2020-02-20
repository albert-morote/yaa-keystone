const { Select } = require('@keystonejs/fields');

class Stars extends Select.implementation {
  extendAdminMeta(meta) {
    return { ...meta, starCount: this.config.starCount || 5 };
  }
}

module.exports = {
  Stars,
  MongoInterface: Select.adapters.mongoose,
  KnexInterface: Select.adapters.knex,
};
