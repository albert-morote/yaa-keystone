"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fields_1 = require("@keystonejs/fields");
exports.default = (keystone, { iframelyAdapter }) => {
    console.log('Podcast');
    keystone.createList('Podcast', {
        schemaDoc: 'Podcast embeds',
        labelResolver: item => {
            return item.spotify.title;
        },
        fields: {
            spotify: { type: fields_1.OEmbed, adapter: iframelyAdapter }
        }
    });
};
//# sourceMappingURL=Podcast.js.map