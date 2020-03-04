"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fields_1 = require("@keystonejs/fields");
exports.default = (keystone, { imageFileAdapter }) => {
    console.log('Image');
    keystone.createList('Image', {
        schemaDoc: 'Image for Article',
        labelResolver: item => item.file.originalFilename,
        fields: {
            file: { type: fields_1.File, adapter: imageFileAdapter }
        }
    });
};
//# sourceMappingURL=Image.js.map