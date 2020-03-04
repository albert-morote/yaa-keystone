"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fields_1 = require("@keystonejs/fields");
const fields_wysiwyg_tinymce_1 = require("@keystonejs/fields-wysiwyg-tinymce");
const sanitize_html_1 = __importDefault(require("sanitize-html"));
const mongoose_1 = __importDefault(require("mongoose"));
exports.default = (keystone) => {
    console.log('Proposal');
    keystone.createList('Proposal', {
        schemaDoc: 'Proposed Content',
        labelField: 'title',
        fields: {
            title: { type: fields_1.Text, schemaDoc: 'Title for submitted article' },
            text: { type: fields_wysiwyg_tinymce_1.Wysiwyg },
            status: { type: fields_1.Select, options: ['Pending', 'Approved'], defaultValue: 'Pending' }
        },
        hooks: {
            // Hooks for create and update operations
            resolveInput: (params) => __awaiter(void 0, void 0, void 0, function* () {
                const resolvedData = params.resolvedData;
                const existingItem = params.existingItem;
                if (existingItem && resolvedData && resolvedData.status && resolvedData.status.toLowerCase() === 'approved') {
                    const articlesAdapter = keystone.lists.Article.adapter;
                    const id = mongoose_1.default.Types.ObjectId(existingItem.id);
                    const existing = yield articlesAdapter.findOne({ proposal: id });
                    const cleanText = sanitize_html_1.default(existingItem.text);
                    const cleanTitle = sanitize_html_1.default(existingItem.title);
                    if (!existing)
                        yield articlesAdapter.create({
                            title: cleanTitle,
                            text: cleanText,
                            status: 'Hidden',
                            proposal: id
                        });
                }
                return params.resolvedData;
            })
        }
    });
};
//# sourceMappingURL=Proposal.js.map