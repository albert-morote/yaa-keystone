import { OEmbed } from '@keystonejs/fields';


export default (keystone, { iframelyAdapter }) => {
	console.log('Podcast');

	keystone.createList('Podcast', {
		schemaDoc: 'Podcast embeds',
		labelResolver: item => {
			return item.spotify.title;
		},

		fields: {
			spotify: { type: OEmbed, adapter: iframelyAdapter }
		}

	});

}