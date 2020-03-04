import { OEmbed } from '@keystonejs/fields';


export default (keystone, { iframelyAdapter }) => {
	console.log('YouTube');

	keystone.createList('YouTube', {
		schemaDoc: 'YouTube embeds',
		labelResolver: item => {
			console.log(item);
			return item.youtube.title;
		},

		fields: {
			youtube: { type: OEmbed, adapter: iframelyAdapter }
		}

	});

}