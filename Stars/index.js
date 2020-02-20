const {
  Stars,
  MongoInterface,
  KnexInterface,
} = require('./Implementation')

// We're going to extend the integer field to store a number between 1-5 and represent this as a rating
const { Select } = require('@keystonejs/fields')

module.exports = {
  type: 'Stars',
  implementation: Stars,
  views: {
    Controller: Select.views.Controller,
    Field:  Select.views.Field,
    Filter: Select.views.Filter,
    Cell:Select.views.Cell,
  },
  adapters: {
    mongoose: MongoInterface,
    knex: KnexInterface,
  },
}
