"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fields_1 = require("@keystonejs/fields");
exports.default = (keystone, { iframelyAdapter }) => {
    console.log('YouTube');
    keystone.createList('YouTube', {
        schemaDoc: 'YouTube embeds',
        labelResolver: item => {
            console.log(item);
            return item.youtube.title;
        },
        fields: {
            youtube: { type: fields_1.OEmbed, adapter: iframelyAdapter }
        }
    });
};
//# sourceMappingURL=YouTube.js.map