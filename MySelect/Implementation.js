const inflection = require('inflection');
const {MongooseFieldAdapter} = require('@keystonejs/adapter-mongoose');
const {KnexFieldAdapter} = require('@keystonejs/adapter-knex');
const { Select } = require('@keystonejs/fields');

function initOptions(options) {
    console.log('initOptions ', options)
    let optionsArray = options;
    if (typeof options === 'string') optionsArray = options.split(/\,\s*/);
    if (!Array.isArray(optionsArray)) return null;
    return optionsArray.map(i => {
        return typeof i === 'string' ? {value: i, label: inflection.humanize(i)} : i;
    });
}

class MySelect   extends Select.implementation {
    constructor(path, {options}) {
        super(...arguments);
        this.options = initOptions(options);
        this.isOrderable = true;
    }

    gqlOutputFields() {
        return [`${this.path}: ${this.getTypeName()}`];
    }

    gqlOutputFieldResolvers() {
        return {[`${this.path}`]: item => item[this.path]};
    }

    getTypeName() {
        return `${this.listKey}${inflection.classify(this.path)}Type`;
    }

    getGqlAuxTypes() {
        // TODO: I'm really not sure it's safe to generate GraphQL Enums from
        // whatever options people provide, this could easily break with spaces and
        // special characters in values so may not be worth it...
        return [
            `
      enum ${this.getTypeName()} {
        ${this.options.map(i => i.value).join('\n        ')}
      }
    `,
        ];
    }

    extendAdminMeta(meta) {
        return {...meta, options: this.options};
    }

    gqlQueryInputFields() {
        return [
            ...this.equalityInputFields(this.getTypeName()),
            ...this.inInputFields(this.getTypeName()),
        ];
    }

    get gqlUpdateInputFields() {
        return [`${this.path}: ${this.getTypeName()}`];
    }

    get gqlCreateInputFields() {
        return [`${this.path}: ${this.getTypeName()}`];
    }
}

const CommonSelectInterface = superclass =>
    class extends superclass {
        getQueryConditions(dbPath) {
            return {
                ...this.equalityConditions(dbPath),
                ...this.inConditions(dbPath),
            };
        }
    };

class MongoSelectInterface extends CommonSelectInterface(MongooseFieldAdapter) {
    addToMongooseSchema(schema) {
        schema.add({[this.path]: this.mergeSchemaOptions({type: String}, this.config)});
    }
}

class KnexSelectInterface extends CommonSelectInterface(KnexFieldAdapter) {
    constructor() {
        super(...arguments);
        this.isUnique = !!this.config.isUnique;
        this.isIndexed = !!this.config.isIndexed && !this.config.isUnique;
    }

    addToTableSchema(table) {
        const column = table.enu(
            this.path,
            this.field.options.map(({value}) => value)
        );
        if (this.isUnique) column.unique();
        else if (this.isIndexed) column.index();
        if (this.isNotNullable) column.notNullable();
        if (typeof this.defaultTo !== 'undefined') column.defaultTo(this.defaultTo);
    }
}

module.exports = {
    MySelect,
    MongoSelectInterface,
    KnexSelectInterface
}