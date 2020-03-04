"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fields_1 = require("@keystonejs/fields");
const fields_wysiwyg_tinymce_1 = require("@keystonejs/fields-wysiwyg-tinymce");
const emptyObject_1 = __importDefault(require("../util/emptyObject"));
exports.default = (keystone) => {
    console.log('Article');
    keystone.createList('Article', {
        schemaDoc: 'Published Articles',
        labelField: 'title',
        access: {
            create: ({ authentication }) => (!emptyObject_1.default(authentication) && authentication.item && authentication.item.isAdmin),
            update: ({ authentication }) => !emptyObject_1.default(authentication) && authentication.item && authentication.item.isAdmin,
            delete: ({ authentication }) => !emptyObject_1.default(authentication) && authentication.item && authentication.item.isAdmin
        },
        fields: {
            title: { type: fields_1.Text, schemaDoc: 'Title for published article' },
            status: { type: fields_1.Select, options: 'Visible,Hidden', defaultValue: 'Hidden' },
            language: { type: fields_1.Select, options: ['English', 'Francais', 'Deutsch'], defaultValue: 'English' },
            translations: { type: fields_1.Relationship, ref: 'Article', many: true },
            text: { type: fields_wysiwyg_tinymce_1.Wysiwyg },
            images: { type: fields_1.Relationship, ref: 'Image', many: true },
            video: { type: fields_1.Relationship, ref: 'YouTube', many: true },
            podcast: { type: fields_1.Relationship, ref: 'Podcast', many: true },
            proposal: {
                isUnique: false,
                type: fields_1.Relationship,
                ref: 'Proposal',
                access: {
                    create: true,
                    read: false,
                    update: false
                }
            }
        }
    });
};
//# sourceMappingURL=Article.js.map