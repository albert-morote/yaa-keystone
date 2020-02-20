 const { MySelect, MongoSelectInterface, KnexSelectInterface } = require( './Implementation')

 const { importView } = require( '@keystonejs/build-field-types');

module.exports = {
  type: 'Select',
  implementation: MySelect,
  views: {
    Controller: importView('./views/Controller'),
    Field: importView('./views/Field'),
    Filter: importView('./views/Filter'),
    Cell: importView('./views/Cell'),
  },
  adapters: {
    mongoose: MongoSelectInterface,
    knex: KnexSelectInterface,
  },
};
